import React, { useRef, useState } from 'react'
import { Vector3, HemisphericLight, Color3, StandardMaterial, Color4, HighlightLayer, Tools, ArcRotateCamera, SceneLoader } from "@babylonjs/core";
import SceneComponent from "../SceneComponent/SceneComponent"; // uses above component in same directory
import Header from '../Header/Header';
import "./MainApp.scss";
import "@babylonjs/loaders";
import model from "./../../assets/3DModels/refinery.glb";
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.


function MainApp() {
  const [progress, setProgress] = useState<any>(0);
  const [selectedMeshes, setSelectedMeshes] = useState<any>([]);
  const sceneRef = useRef(null);

  const onSceneReady = (scene: any) => {
    try {
      const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 10, new Vector3(0, 0, 0), scene);
      camera.setTarget(Vector3.Zero());
      const canvas = scene.getEngine().getRenderingCanvas();
      camera.attachControl(canvas, true);
      var fileName = Tools.GetFilename(model);
      var filePath = Tools.GetFolderPath(model);
      scene.clearColor = Color3.Black();
      SceneLoader.ImportMeshAsync("", filePath, fileName, scene, (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          let progressPercent = percentComplete > 92 ? 92 : Math.round(percentComplete);
          setProgress(progressPercent)
          console.log(progressPercent)
        }
      }).then((result: any) => {
        console.log(result)
        scene.createDefaultCameraOrLight(true, true, true);
        scene.activeCamera.panningSensibility = 8;
        // scene.activeCamera.upperRadiusLimit = 1000;
        scene.activeCamera.wheelPrecision = 10;
        scene.activeCamera.buttons = [2, 1, 0];
        // scene.createDefaultEnvironment();
        scene.activeCamera.radius = 250;
        // const hl = new HighlightLayer("h1", scene);

        // const onPointerMove = (e: any) => {
        //   const result = scene.pick(scene.pointerX, scene.pointerY);
        //   if (result.hit && result.pickedMesh) {
        //     hl.removeAllMeshes();
        //     hl.addMesh(result.pickedMesh, Color3.Blue());
        //   } else {
        //     hl.removeAllMeshes();
        //   }
        // };

        // let originalMaterialColor;

        // let greenMat = new StandardMaterial("greenMat", scene);
        // greenMat.diffuseColor = Color3.Green();
        // let coloredMat = new StandardMaterial("coloredMat", scene);
        // coloredMat.diffuseColor = Color3.Red();

        // const onPointerClick = (event:any) => {
        //   let temp = [...selectedMeshes];
        //   const result = scene.pick(scene.pointerX, scene.pointerY);
        //   if (result.hit && result.pickedMesh) {
        //     const hasMeshName = selectedMeshes?.some((obj:any) => obj.meshName === result.pickedMesh.name);
        //     var sel_mesh = scene.getMeshByName(result.pickedMesh.name);
        //     var material = new StandardMaterial("material", scene);
        //     sel_mesh.material = material;
        //     if (hasMeshName) {
        //       const oldColor = selectedMeshes.find((item:any) => item.meshName === result.pickedMesh.name)?.color;
        //       if (oldColor) {
        //         material.diffuseColor = oldColor;
        //         temp = selectedMeshes.filter((obj:any) => obj.meshName !== result.pickedMesh.name);
        //       }
        //     } else {
        //       material.diffuseColor = Color3.Blue();
        //       temp.push({ meshName: result.pickedMesh.name, color: material.diffuseColor });
        //     }
        //   }
        //   // setSelectedMeshes(temp);
        //   // console.log('hello')
        // };



        // if ( sceneRef?.current?.canvas) {
        //   sceneRef.current.canvas.addEventListener("pointermove", onPointerMove, false);
        //   sceneRef.current.canvas.addEventListener("click", onPointerClick, false);
        // }


      }).catch((err: any) => alert(err))
      // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
      const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
      // Default intensity is 1. Let's dim the light a small amount
      light.intensity = 0.7;
      setProgress(100);
    } catch (e) {
      window.alert("Error:" + e)
    }
  };


  // const resetColors = (scene:any) => {
  //   scene.meshes.forEach((mesh:any) => {
  //     if (mesh.material && mesh.material instanceof StandardMaterial) {
  //       mesh.material.refreshColorAndTexture();
  //     }
  //   });
  // };


  const onRender = (scene: any) => { };


  return (
    <div className='container'>
      <Header />
      <div className='canvas-container'>
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} forwardedRef={sceneRef} />
      </div>
    </div>
  )
}

export default MainApp
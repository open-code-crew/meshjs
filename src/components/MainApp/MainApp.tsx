import React from 'react'
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Color3 } from "@babylonjs/core";
import SceneComponent from "../SceneComponent/SceneComponent"; // uses above component in same directory
import Header from '../Header/Header';
import "./MainApp.scss"
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

const onSceneReady = (scene: any) => {
  scene.clearColor = Color3.Black();
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  camera.attachControl(canvas, true);
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  light.intensity = 0.7;

};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: any) => {

};

function MainApp() {
  return (
    <div className='container'>
      <Header />
      <div className='canvas-container'>
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
      </div>
    </div>
  )
}

export default MainApp
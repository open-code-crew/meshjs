import { useEffect, useRef } from 'react'
import { Engine, EngineOptions, Nullable, Scene, SceneOptions } from "@babylonjs/core";
import "./SceneComponent.scss";

interface BabylonCanvasProps {
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  sceneOptions?: SceneOptions;
  onRender?: (scene: Scene) => void;
  onSceneReady: (scene: Scene) => void;
  forwardedRef?: React.RefObject<{ canvas: Nullable<HTMLCanvasElement>; scene: Scene }>;
}

function SceneComponent({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, forwardedRef, ...rest }: BabylonCanvasProps) {
  const reactCanvas = useRef(null);

  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    const scene = new Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    if (forwardedRef && forwardedRef.current) {
      forwardedRef.current.canvas = canvas;
      forwardedRef.current.scene = scene;
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);


  return (
    <canvas ref={reactCanvas}  {...rest} />
  )
}

export default SceneComponent

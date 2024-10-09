import './global.css';
import { Application } from 'pixi.js';
import { Scene } from './scenes/scene';
import debounce from './utils/debounce';

(async () => {
  const app = new Application();

  await app.init({ background: '#000000', resizeTo: window });

  document.body.appendChild(app.canvas);

  // Init the scenes
  const scene = new Scene();
  app.stage.addChild(scene);

  await scene.init(app);
  scene.updateSize(app);

  window.addEventListener(
    'resize',
    debounce(() => scene.updateSize(app), 300)
  );
})();

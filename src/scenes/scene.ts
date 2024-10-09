import {
  Application,
  Assets,
  Container,
  FillGradient,
  Sprite,
  Text,
  TextStyle,
  Texture,
} from 'pixi.js';
import { OrbitAnimation } from '../animations/orbitAnimation';

export class Scene extends Container {
  static PADDING = 200;
  static HEADER_HEIGHT = 100;
  protected _isInitialized: boolean = false;
  protected _backgroundLayer: Container;
  protected _title: Text;
  protected _logosLayer: Container;

  constructor() {
    super();

    this._backgroundLayer = new Container();

    const style = new TextStyle({
      fontFamily: 'Tahoma',
      fontSize: 40,
      fontWeight: 'bold',
    });

    this._title = new Text({
      text: 'Vite + Pixi.js + TypeScript',
      style,
      resolution: 2,
    });

    const gradientFill = new FillGradient(0, 0, this._title.width, 0);
    gradientFill.addColorStop(0, 0x007acd);
    gradientFill.addColorStop(0.5, 0xffba11);
    gradientFill.addColorStop(1, 0xe72264);
    this._title.style.fill = gradientFill;

    this._logosLayer = new Container();
  }

  public async init(app: Application) {
    if (this._isInitialized) return;
    this._isInitialized = true;

    Assets.addBundle('logos', {
      vite_logo: 'assets/images/vite_logo.png',
      pixi_logo: 'assets/images/pixi_logo.png',
      ts_logo: 'assets/images/ts_logo.png',
    });
    Assets.add({ alias: 'bgImage', src: 'assets/images/space.jpg' });
    const sheet = await Assets.load('bgImage');

    const bgImage = new Sprite(sheet);
    bgImage.anchor.set(0.5);
    this._backgroundLayer.addChild(bgImage);
    this.addChild(this._backgroundLayer);

    this._title.anchor.set(0.5);
    this.addChild(this._title);

    await Assets.loadBundle('logos');

    const viteLogo = Sprite.from(Texture.from('vite_logo'));
    const pixiLogo = Sprite.from(Texture.from('pixi_logo'));
    const tsLogo = Sprite.from(Texture.from('ts_logo'));

    viteLogo.anchor.set(0.5);
    pixiLogo.anchor.set(0.5);
    tsLogo.anchor.set(0.5);

    const orbit1 = new OrbitAnimation(viteLogo, pixiLogo.width, Math.PI / 4, 0);
    const orbit2 = new OrbitAnimation(
      tsLogo,
      pixiLogo.width,
      Math.PI / 4,
      Math.PI
    );

    app.ticker.add((ticker) => {
      orbit1.update(ticker);
      orbit2.update(ticker);
    });

    this._logosLayer.addChild(pixiLogo);
    this._logosLayer.addChild(viteLogo);
    this._logosLayer.addChild(tsLogo);

    this.addChild(this._logosLayer);
  }

  public updateSize(app: Application) {
    if (!this._title) return;

    const logoTexture = Texture.from('pixi_logo');
    const bgTexture = Texture.from('bgImage');
    const logoLayerSize = 2 * (logoTexture.width + Scene.PADDING);
    const center = { x: app.canvas.width / 2, y: app.canvas.height / 2 };
    const bgScaleByHeight = app.canvas.height / bgTexture.height;
    const bgScaleByWidth = app.canvas.width / bgTexture.width;
    const logosScaleByHeight =
      (app.canvas.height - Scene.HEADER_HEIGHT) / logoLayerSize;
    const logosScaleByWidth = app.canvas.width / logoLayerSize;

    this._backgroundLayer.position.set(center.x, center.y);
    this._backgroundLayer.scale.set(Math.max(bgScaleByHeight, bgScaleByWidth));

    this._title.x = center.x;
    this._title.y = Scene.HEADER_HEIGHT / 2;

    this._logosLayer.x = center.x;
    this._logosLayer.y =
      Scene.HEADER_HEIGHT + (app.canvas.height - Scene.HEADER_HEIGHT) / 2;
    this._logosLayer.scale.set(
      Math.min(1, logosScaleByHeight, logosScaleByWidth)
    );
  }
}

import { Sprite, Ticker } from 'pixi.js';

export class OrbitAnimation {
  private _sprite: Sprite;
  private _radius: number;
  private _speed: number;
  private _angle: number;

  constructor(
    sprite: Sprite,
    radius: number,
    speed: number,
    startAngle: number = 0
  ) {
    this._sprite = sprite;
    this._radius = radius;
    this._speed = speed;
    this._angle = startAngle;
  }

  public update(ticker: Ticker) {
    this._angle += (this._speed * ticker.deltaMS) / 1000;
    //this._sprite.rotation = this._angle;
    this._sprite.x = this._radius * Math.cos(this._angle);
    this._sprite.y = this._radius * Math.sin(this._angle);
  }
}

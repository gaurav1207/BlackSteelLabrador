/* eslint-disable prefer-const */
import { Circle } from './circle.model';
import { Line } from './line.model';
import { Point, Shape, Type } from './shape.model';

export class Rect implements Shape {
  readonly center: Point;
  readonly width: number;
  readonly height: number;
  readonly type: Type;

  constructor(x: number, y: number, width: number, height: number) {
    this.center = <Point>{ x, y };
    this.type = Type.RECT;
    this.width = width;
    this.height = height;
  }

  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.CIRCLE:
        return Circle.fromShape(other).collides(this);
      case Type.RECT:
        const _other = <Rect>(<any>other);
        let lx1 = this.center.x - this.width / 2;
        let ly1 = this.center.y - this.height / 2;
        let rx1 = this.center.x + this.width / 2;
        let ry1 = this.center.y + this.height / 2;
        let lx2 = _other.center.x - _other.width / 2;
        let ly2 = _other.center.y - _other.height / 2;
        let rx2 = _other.center.x + _other.width / 2;
        let ry2 = _other.center.y + _other.height / 2;
        return !(lx1 > rx2 || rx1 < lx2 || ly1 > ry2 || ry1 < ly2);
      case Type.LINE:
        return Line.fromShape(other).collides(this);
      default:
        throw new Error(`Invalid shape type!`);
    }
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Rect object
   */
  static fromShape(other: Shape): Rect {
    const polymorph = <any>other;
    if (!polymorph.width || !polymorph.height) {
      throw new Error('Shape is invalid! Cannot convert to a Rectangle');
    }

    return new Rect(
      polymorph.center.x,
      polymorph.center.y,
      polymorph.width,
      polymorph.height,
    );
  }
}

/* eslint-disable prettier/prettier */
import { Circle } from './circle.model';
import { Rect } from './rect.model';
import { Point, Shape, Type } from './shape.model';
import { distanceBetween } from './shape.model';

//Line has x,y and length as its properties
export class Line implements Shape {
  readonly center: Point;
  readonly type: Type;
  readonly length: number;
  readonly startPoint: Point;
    
    constructor(x: number, y: number, length: number) {
        this.startPoint = <Point>{ x, y };
        this.length = length;
        this.type = Type.LINE;
      }

      collides(other: Shape): boolean {
        switch (other.type) {
            case Type.CIRCLE:
                //check line collides with circle
                const circle: Circle = Circle.fromShape(other);
                // eslint-disable-next-line prefer-const
                let target1: Point = this.startPoint;
                // eslint-disable-next-line prefer-const
                let distance1: number = distanceBetween(circle.center, target1);
                return distance1 <= circle.radius;   
            case Type.RECT:
                //check line collides with rect
                const rect: Rect = Rect.fromShape(other);
                const target2: Point = rect.center;

                const distance2: number = distanceBetween(rect.center, target2);
                return distance2 <= rect.width / 2;
                
            case Type.LINE:
                //check line collides with line
                const line: Line = Line.fromShape(other);
                const target3: Point = line.startPoint;
                const distance3: number = distanceBetween(line.startPoint, target3);
                return distance3 <= line.length;
                

        }
      }
      static fromShape(other: Shape): Line {
        const polymorph = <any>other;
        if (!polymorph.length || !polymorph.startPoint) {
          throw new Error('Shape is invalid! Cannot convert to a Line');
        }
    
        return new Line(
          polymorph.startPoint.x,
          polymorph.startPoint.y,
          polymorph.length,
        );
      }
    

}
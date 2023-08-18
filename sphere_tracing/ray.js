class Ray{
    constructor(origin, angle){
        this.origin = origin;
        this.angle = angle;
        this.dir = p5.Vector.fromAngle(radians(angle));
    }

    show(){
        push();
        stroke('red');
        strokeWeight(3);
        line(this.origin.x, this.origin.y, this.origin.x + 10*this.dir.x, this.origin.y + 10*this.dir.y);
        pop();
    }
}
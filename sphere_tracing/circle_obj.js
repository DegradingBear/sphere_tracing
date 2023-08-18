class Circle_Obj{
    constructor(center, radius){
        this.center = center;
        this.radius = radius;
    }

    show(){
        push();
        noFill();
        ellipse(this.center.x, this.center.y, 2*this.radius);
        pop();
    }

    distance(p){
        let pointer = createVector(p.x - this.center.x, p.y-this.center.y);
        pointer.normalize();
        pointer.mult(this.radius);

        pointer.add(this.center.x, this.center.y);
        pointer.add(-p.x, -p.y);
        return pointer.mag();
    }
}
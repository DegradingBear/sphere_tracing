class Particle{
    constructor(pos){
        this.angle = 0;
        this.pos = pos;
        this.ray = new Ray(this.pos, this.angle);
    }

    show(){
        ellipse(this.pos.x, this.pos.y, 10);
        this.ray.show();
    }

    lookAt(x,y){
        this.ray.dir = createVector(x - this.pos.x, y - this.pos.y);
        this.ray.dir.normalize();
    }

    add_angle(angle){
        let new_angle = this.ray.dir.heading() + angle;
        this.ray.dir.setHeading(new_angle);
    }
}
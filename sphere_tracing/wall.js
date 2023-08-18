class Wall{
    constructor(x1,y1,x2,y2){
        this.a = createVector(x1,y1);
        this.b = createVector(x2,y2);
        this.vert = false;
        this.hor = false;
        this.m = null;
        this.n = null; // equation: ny = mx + c
        this.c = null;

        this.midpoint = createVector((x1+x2)/2, (y1+y2)/2);
        this.line_width = createVector(x1 - this.midpoint.x, y1 - this.midpoint.y).mag();

        if(x1 == x2){ //vertical line
            this.vert = true;
            this.m = 1;
            this.n = 0;
            this.c = -x1;

        }else if(y2 == y1){ //horizontal line
            this.hor = true;
            this.n = 1;
            this.m = 0;
            this.c = y1;
        } else { //not a vertical or horizontal line
            this.n = 1;
            this.m = (y2-y1)/(x2-x1);
            this.c = y1 - (this.m * x1);
        }
    }

    show(){
        push();
        stroke(255);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
        pop();
    }

    distance(point){
        let px = point.x;
        let py = point.y;
        //if neither vertical or horizontal line, use regular equation
        //let den = sqrt((this.b.x - this.a.x)**2 + (this.b.y - this.a.y)**2);
        //let dist = abs((this.b.x-this.a.x)*(this.a.y - py) - (this.a.x - px)*(this.b.y - this.a.y))/den;

        let a = this.m;
        let b =  -this.n;
        let c = this.c;

        let denom = (a**2 + b**2);
        let xpos = (b*(b*px-a*py)-a*c)/denom;
        let ypos = (a*(-b*px+a*py)-b*c)/denom;

        let pos = createVector(xpos - this.midpoint.x, ypos - this.midpoint.y);
        if(pos.mag() > this.line_width){
            pos.normalize();
            pos.mult(this.line_width);
        }
        pos.add(this.midpoint);
        pos.add(-px, -py);
        return(pos.mag()); //returns vector position of the closest point on the line

    }
}
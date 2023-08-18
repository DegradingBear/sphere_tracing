class Square{
    constructor(center, width, height, angle_offset){
        this.center = center;
        this.width = width;
        this.height = height;
        this.angle_offset = angle_offset;
        this.walls = [];

        let cnr1 = createVector(-width/2, height/2);
        let cnr2 = createVector(width/2, height/2);
        let cnr3 = createVector(width/2, -height/2);
        let cnr4 = createVector(-width/2, -height/2);

        cnr1.setHeading(cnr1.heading()+angle_offset);
        cnr2.setHeading(cnr2.heading()+angle_offset);
        cnr3.setHeading(cnr3.heading()+angle_offset);
        cnr4.setHeading(cnr4.heading()+angle_offset);

        cnr1.add(center);
        cnr2.add(center);
        cnr3.add(center);
        cnr4.add(center);

        this.walls.push(new Wall(cnr1.x, cnr1.y, cnr2.x, cnr2.y));
        this.walls.push(new Wall(cnr2.x, cnr2.y, cnr3.x, cnr3.y));
        this.walls.push(new Wall(cnr3.x, cnr3.y, cnr4.x, cnr4.y));
        this.walls.push(new Wall(cnr4.x, cnr4.y, cnr1.x, cnr1.y));
    }

    show(){
        for(let wall of this.walls){
            wall.show();
        }
    }

    distance(point){
        let record = Infinity;
        for(let wall of this.walls){
            let distance = wall.distance(point);
            if(distance < record){
                record = distance;
            }
        }

        return record;
    }
}
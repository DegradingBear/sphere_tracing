class Circle{
    constructor(center, radius){
        this.center = center;//position vector
        this.radius = radius;
    }

    intersect(ray){
        //takes a unit vector and returns the point (as vector) on the circles circumference that
        // the unit vector points to
        let vec = ray.dir.copy() //dont mutate the vector object passed in
        vec.normalize();
        vec.mult(this.radius);
        vec.add(this.center);
        return vec;
    }
}
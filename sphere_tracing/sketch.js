let canvas_width = 400;
let canvas_height = 400;
let scene = [];
let threshold = 1;
let particle;
let rendered = [];

function setup() {
  createCanvas(canvas_width, canvas_height);

  //random arrangement of objects
  let num_sq = Math.ceil(random(2,6));
  console.log(num_sq)
  for(let i=0; i<num_sq; i++){
    let center = createVector(random(0,canvas_width), random(0,canvas_height));
    scene.push(new Square(center, random(0, 200), random(0,200), random(0,360)));
  }

  let num_ci = Math.ceil(random(2,6));
  for(let i=0; i<num_ci; i++){
    let center = createVector(random(0,canvas_width), random(0,canvas_height));
    scene.push(new Circle_Obj(center, random(0, 100)));
  }

  //uncomment for predetermined arrangement of objects
  // scene.push(new Circle_Obj(createVector(100, 100), 100));
  // scene.push(new Circle_Obj(createVector(400, 400), 150));
  // scene.push(new Square(createVector(200, 100), 50, 100, 30));
  // scene.push(new Square(createVector(350, 300), 100, 200, 0));
  // scene.push(new Square(createVector(400, 0), 100, 200, 10));

  //the origin point of the sphere tracing
  particle = new Particle(createVector(100, 300));
  fill(255);
  stroke(255);
}

function draw() {
  //particle.add_angle(0.01); //uncomment to auto rotate the partical (no mouse)
  background(0);

  //point ray at mouse
  particle.lookAt(mouseX, mouseY);

  let frames_circles = [];
  let frames_lines = [];
  let draw = true;
  let curr_pos = particle.pos.copy();
  let min = Infinity;
  particle.show();

  //uncomment to render all objects
  // for(let item of scene){
  //   item.show()
  // }

  //implement sphere tracing algorithm
  while(min>0.01){

    //find the closest object (and thus the biggest possible radius of next 'sphere')
    min = Infinity;
    for(let item of scene){
      distance = item.distance(curr_pos);
      if(distance < min){
        min = distance;
      }
    }

    //push current circle to be rendered
    frames_circles.push([curr_pos.x, curr_pos.y, 2*min]);

    //find point on radius of sphere particle is 'looking' at
    ray_cast_pos = new Circle(curr_pos, min).intersect(particle.ray);
    frames_lines.push([particle.pos.x, particle.pos.y, ray_cast_pos.x, ray_cast_pos.y]);
    //move to the point on radius to keep iterating algorithm
    curr_pos = ray_cast_pos.copy();

    //dont draw if not looking at object
    if(curr_pos.x > canvas_width || curr_pos.y > canvas_height || curr_pos.x < 0 || curr_pos.y < 0){
      draw = false;
      break;
    }

  }
  //add the point we're looking at to be rendered
  if(!(curr_pos in rendered)){
    rendered.push(curr_pos);
  }

  if(draw){
    push();
    noFill();
    //draw circles
    for(let frame of frames_circles){
      ellipse(frame[0], frame[1], frame[2]);
    }
    pop();
    //draw line of sight
    for(let lin of frames_lines){
      line(lin[0], lin[1], lin[2], lin[3]);
    }
  }

  //draw points on objects that have been 'seen'
  push();
  fill('white');
  stroke('white');
  for(pixel of rendered){
    ellipse(pixel.x, pixel.y, 3);
  }
  pop();
}

let movers = [];
let stars = [];
let sun;
let m;

function setup() {
  //frameRate(1);
  distMult = createSlider(50, 150, 120, 1);
  distMult.position(75, windowHeight-50);
  g_s = createSlider(1,5,1);
  g_s.position(75,75);
  
  createCanvas(windowWidth, windowHeight);
  sunColor = color(230, 205, 50);
  sun = new Sun(windowWidth/2, windowHeight/2, 50, sunColor, 1);
  m = random(3, 7);
}

function draw() {
  background(220);
  sun.applyForceTo(movers);
  sun.show();
  
  for(mover of movers){
    mover.applyForceTo(movers);
    mover.move();
    mover.show();
    mover.showTail();
  }
  
  showNext();
  //print("distMult: " + distMult.value());
  
  showButtoms();
}

function mousePressed(){
  let mouse = createVector(mouseX, mouseY);
  d1 = p5.Vector.dist(mouse, createVector(100,150));
  d2 = p5.Vector.dist(mouse, createVector(200,150));
  if(d1 < 50){
    m = m + 2;
  }else if(d2 < 30){
    m = m - 2;
  }else if(mouseY < windowHeight-50 && mouseY > 100){
    c = color(m * 10 * 2 + 100, 100, 150);
    //mover = new Mover(mouseX, mouseY, m, c);
    movers.push(new Mover(mouseX, mouseY, m, c, g_s.value()));
    //m = random(3, 10);
  }
  
}

function showNext(){
    noStroke();
    fill(255, 100, 100, 80);
    ellipse(mouseX, mouseY, m * 4);
}

function showButtoms(){
  noFill();
  stroke(250,0,0);
  strokeWeight(3);
  ellipse(100,150,50);
  line(80,150,120,150);
  line(100,130,100,170);
  
  ellipse(200,150,50);
  line(185,150,215,150);
}
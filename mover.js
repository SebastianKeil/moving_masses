class Mover{
  
  constructor(x, y, m, c, g){
    this.pos = createVector(x, y);
    this.vel = createVector(10, 10);
    this.acc = createVector(10, 10);
    this.m = m;
    this.color = c;
    this.tail = [];  
    this.g = g;
  }
  
  
  applyForceTo(movers){
    for(let mover of movers){
      let force = p5.Vector.sub(this.pos, mover.pos);
      let dist = p5.Vector.dist(mover.pos, this.pos);
      if(dist.mag < 100 && this.m > mover.m){
        force.normalize().mult(this.m*180*g_s.value());
        mover.applyForce(force.div(dist*distMult.value()));
      }
    }
  }
  
  applyForce(force){
    this.acc.add(force.mult(1.3));
    //print("acc: " + this.acc.mag());
    this.acc.limit(30+this.m);
  }
  
  move(){
    this.vel.add(this.acc);
    this.vel.limit(map(this.m,3,20,4,(13)));
    this.pos.add(this.vel);
    
    var p = createVector(this.pos.x, this.pos.y);
    this.tail.push(p);
    if(this.tail.length > 200){
      this.tail.shift();
    }
  }
  
  show(){
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.m*4);
  }
  
  showTail(){
    stroke(150,90);
    strokeWeight(this.m);
    for(let i = 0; i <this.tail.length - 4; i = i + 3){
      //ellipse(this.tail[i].x, this.tail[i].y, this.m*2);
      line(this.tail[i].x, this.tail[i].y, this.tail[i+1].x, this.tail[i+1].y)
    }
    
  }
}

export class phyObj {
  constructor(startX, startY, startVx, startVy, mass, canvas, shape){
    // movement
    this.x = startX;
    this.y = startY;
    this.vx = startVx;
    this.vy = startVy;

    // collisions
    this.mass = mass
    this.canvas = canvas;
    this.aspect = canvas.clientWidth / canvas.clientHeight;
    this.width = 7;
    this.height = this.width/this.aspect;
    
    // shape
    this.shape = shape;
  }

  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  updatePos(deltaTime){
    this.wallDetection();
    this.x = this.x + this.vx*deltaTime;
    this.y = this.y + this.vy*deltaTime;
  }
  wallDetection(){
    
    // edges
    if (this.mass != 999){
        if (this.x >this.width-0.5){
            this.x = this.width-0.5
            this.vx*=-1;
        } else if (this.x <-this.width+0.5){
            this.x = -this.width+0.5
            this.vx*=-1;
        }
        if (this.y >this.height-0.5){
            this.y = this.height-0.5
            this.vy*=-1;
        } else if (this.y <-this.height+0.5){
            this.y = -this.height+0.5
            this.vy*=-1;
        }
    }
  }
  static checkAllCircleCollisions(custObjs,radius = 0.5){
    for(let i = 0; i<custObjs.length;i++){
      const a = custObjs[i];
      if (a.shape !== "circle") continue;
      for(let j = i+1; j<custObjs.length;j++){
        const b = custObjs[j];
        if (b.shape !== "circle") continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx*dx+dy*dy;
        const minDist=2*radius;
        if(distSq<minDist*minDist){
          [a.vx,b.vx]=[b.vx,a.vx];
          [a.vy,b.vy]=[b.vy,a.vy];
        }
      }
    }
  }
}
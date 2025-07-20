
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
    this.collisionDetection();
    this.x = this.x + this.vx*deltaTime;
    this.y = this.y + this.vy*deltaTime;
  }
  collisionDetection(){
    
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
}
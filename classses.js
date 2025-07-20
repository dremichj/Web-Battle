
export class phyObj {
  constructor(startX, startY, startVx, startVy, canvas){
    this.x = startX;
    this.y = startY;
    this.vx = startVx;
    this.vy = startVy;
    this.canvas = canvas;
    this.aspect = canvas.clientWidth / canvas.clientHeight;
    this.width = 7;
    this.height = this.width/this.aspect;
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
    
    /*if (this.x >=this.width-0.5 || this.x <=-this.width+0.5){
        
        this.vx*=-1;
    }
    if (this.y >=this.height-0.5 || this.y <=-this.height+0.5){
        this.vy*=-1;
    }*/
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
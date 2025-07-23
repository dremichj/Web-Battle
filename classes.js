
export class phyObj {
  static colGrid = [];
  static gridWidth;
  static gridHeight;
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
    this.collide= false;
    
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

  // collision grid
  static initGrid(width=10,height=10){
    this.gridWidth = width;
    this.gridHeight = height;
    this.colGrid=[];
    for(let i =0; i<height;i++){
      let a = [];
      for(let j =0; j<width;j++){
          a.push([]);
      }
      this.colGrid.push(a);
    };
  }
  // add objs to colgrid
  static toGrid(custObjs,cwidth,cheight){
    this.initGrid(this.gridWidth,this.gridHeight);
    for(const obj of custObjs){
      // sets relx and rely to the place they should be in the array
      // sets value between 0 and 2cwidth, divides by 2cwidth to be from 0 to 1,
      // then multiplies by how many items fit in the width/height
      let relx = Math.floor(((obj.x+cwidth)/(2*cwidth))*this.gridWidth);
      let rely = this.gridHeight-Math.floor(((obj.y+cheight)/(2*cheight))*this.gridHeight)-1;
      this.colGrid[rely][relx].push(obj);
    }
  }
  

  static checkAllCircleCollisions(custObjs,radius = 0.5){
    for (const obj of custObjs){
      obj.collide=false;
    }
    for (let r =0; r<this.gridHeight;r++){
      for (let c = 0; c<this.gridWidth;c++){
        if (this.colGrid[r][c].length>1){
          this.colGrid[r][c][0].collide = true;
          this.colGrid[r][c][1].collide = true;
        }
      }
    }
      
  }


}
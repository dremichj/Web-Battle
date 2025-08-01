import { distOf } from "./helpers.js";


export class phyObj {
  static colGrid = [];
  static gridWidth;
  static gridHeight;
  constructor(startX, startY, startVx, startVy, mass, canvas, shape,corners){
    // movement
    this.x = startX;
    this.y = startY;
    this.vx = startVx;
    this.vy = startVy;
    this.ay = 0; // gravity

    // collisions
    
    this.mass = mass;
    if (mass ===""){
      this.mass =1;
    }
    this.canvas = canvas;
    this.aspect = canvas.clientWidth / canvas.clientHeight;
    this.width = 7;
    this.height = this.width/this.aspect;
    this.collide= false;
    
    // shape
    this.shape = shape;
    this.corners = corners;
  }

  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  updatePos(deltaTime){
    this.wallDetection();
    this.vy = this.vy - this.ay*deltaTime;
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
  static toGrid(custObjs){
    this.initGrid(this.gridWidth,this.gridHeight);
    for(const obj of custObjs){
      
      let [relx,rely]=this.toCoord(obj.x,obj.y);
      this.colGrid[rely][relx].push(obj);
    }
  }
  

  static checkAllCircleCollisions(custObjs,radius = 0.5){
    for (const obj of custObjs){
      obj.collide=false;
    }
    const handledPairs = new Set();
    
    for (let r =0; r<this.gridHeight;r++){
      for (let c = 0; c<this.gridWidth;c++){
        let curObjs = [];  // stores the objects in the current space
        let surObjs = [];  // stores the objects in current space and surrounding
        // adds each object from the current coord to the list
        for(const obj of this.colGrid[r][c]){
          curObjs.push(obj);
          surObjs.push(obj);
        }
        // adds objects from the surrounding coords to the surrounding list
        for(let i = -1; i<2; i++){    //  1 2 3
          for(let j = -1; j<2; j++){  //  4 x 6
            // checks if in bound         7 8 9
            if (!((i === -1 && r === 0)||(i === 1 && r === this.gridHeight-1))){
              if(!((j === -1 && c === 0)||(j === 1 && c === this.gridWidth-1))){
                if(!(i ===0 && j === 0)){
                  for(const obj of this.colGrid[r+i][c+j]){
                    surObjs.push(obj);
                  }
                }
              }
            }
          }
        }
        // actually check for collisions now (yay)
        for(const obj of curObjs){ // PROCESS: Go through each object in curObjs, compare its distance to each object in surobjs (excluding itself), handle collisions after that
          for(const othObj of surObjs){
            if (obj !== othObj){

              let curD = distOf(obj.x,obj.y,othObj.x,othObj.y);
              if(curD <= (radius*2)*(radius*2)){
                this.handleCollision(obj,othObj);
                obj.collide = true;
                othObj.collide = true;
              }
            }
          }
        }
      }
    }
      
  }

  static toCoord(x,y){
    // sets relx and rely to the place they should be in the array
    // sets value between 0 and 2cwidth, divides by 2cwidth to be from 0 to 1,
    // then multiplies by how many items fit in the width/height
    let relx = Math.floor(((x+this.gridWidth/2)/(this.gridWidth))*this.gridWidth);
    let rely = this.gridHeight-Math.floor(((y+this.gridHeight/2)/(this.gridHeight))*this.gridHeight)-1;
    if (relx <0){
      relx = 0
    } else if (relx >=this.gridWidth){
      relx = this.gridWidth-1;
    }
    if (rely <0){
      rely = 0
    } else if (rely >=this.gridHeight){
      rely = this.gridHeight-1;
    }
    return [relx,rely];
  }

  static handleCollision(obj, othObj){
    if (!obj.collide || true){
      obj.collide = true;
      othObj.collide = true;
      // mass
      const m1 = obj.mass;
      const m2 = othObj.mass;
      // position
      const x1 = obj.x, y1 = obj.y;
      const x2 = othObj.x, y2 = othObj.y;
      // velocity
      const v1x = obj.vx, v1y = obj.vy;
      const v2x = othObj.vx, v2y = othObj.vy;

      // finds normal vectors from othObj to obj
      const nx = x1-x2;
      const ny = y1-y2;
      const dist = Math.sqrt(nx*nx+ny*ny);
      if(dist === 0) return;

      // normalize
      const unx = nx/dist;
      const uny = ny/dist;

      // find tangent vector
      const utx = -uny;
      const uty = unx;
      
      this.separateOverlap(obj, othObj, 0.5, 0.5, unx, uny, dist);
      
      // project velocities onto normal and tangent
      const v1n = v1x*unx+v1y*uny;
      const v1t = v1x*utx+v1y*uty;
      const v2n = v2x*unx+v2y*uny;
      const v2t = v2x*utx+v2y*uty;
      
      const v1nFinal = (v1n*(m1-m2)+2*m2*v2n)/(m1+m2);
      const v2nFinal = (v2n*(m2-m1)+2*m1*v1n)/(m1+m2);

      
      // final velocities
      
      //obj.vx = v1nFinal * unx +v1t*utx;
      //obj.vy = v1nFinal * uny +v1t*uty;
      //othObj.vx = v2nFinal * unx +v2t*utx;
      //othObj.vy = v2nFinal * uny +v2t*uty;
    }
  }

  static separateOverlap(obj, othObj, radA, radB,unx,uny, dist){
    const m1 = obj.mass;
    const m2 = othObj.mass;
    const radiusSum = radA + radB; // Assuming radius = 0.5 for both objects
      const overlap = radiusSum - dist;
      if (overlap > 0) {
          // Move objects apart based on their masses
          const totalMass = m1 + m2;
          const objMove = (overlap * (m2 / totalMass)); // Proportional to othObj's mass
          const othObjMove = (overlap * (m1 / totalMass)); // Proportional to obj's mass

          // Move obj
          obj.x += overlap/2 * unx;
          obj.y += overlap/2 * uny;

          // Move othObj
          othObj.x -= overlap/2 * unx;
          othObj.y -= overlap/2 * uny;
      }
  }

  static getLaunchV(oldX, oldY, newX, newY){
    const velX = -(newX-oldX)/10;
    const velY = (newY-oldY)/10;
    return{
      Vx:velX,
      Vy:velY,
    }
  }
}
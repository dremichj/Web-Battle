export function distOf(ax,ay,bx,by){
    let dx = bx - ax;
    let dy = by - ay;
    let d = (dx*dx)+(dy*dy);
    return d;
}

export function scalar(d){
    return Math.sqrt(d);
}
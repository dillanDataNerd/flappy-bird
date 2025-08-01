class Obstacle{

    constructor(type, yPos ){
        
    this.node=document.createElement("img")
    this.node.className="obstacle"


    if (type=="top"){this.node.src="./images/obstacle_top.png"}
    else if(type=="bottom"){this.node.src="./images/obstacle_bottom.png"}
    gameBoxNode.append(this.node)

    this.x= gameBoxNode.offsetWidth
    this.y=yPos
    this.h=240
    this.w=50

    //adjust size of obstacle
    this.node.style.width=`${this.w}px`
    this.node.style.height=`${this.h}px`

    //adjust position
    this.node.style.position='absolute'
    this.node.style.left=`${this.x}px`
    this.node.style.top=`${this.y}px`   

    this.speed=2
    this.type=type // not necessary but nice to have. You knoww how how things are set up at the start
    }


    automaticMovement(){
        this.x-=this.speed
        this.node.style.left=`${this.x}px`
    }
}
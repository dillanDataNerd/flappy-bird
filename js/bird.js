class Bird {

constructor(){
    
    //we need to create an image node for the bird
    this.node=document.createElement("img")
    this.node.className="bird"
    this.node.src="./images/flappy.png" // access this as if you were accessing the image from the HTML file

    gameBoxNode.append(this.node)

    this.x= 70
    this.y=50
    this.h=40
    this.w=50
//adjust size of bird
    this.node.style.width=`${this.w}px`
    this.node.style.height=`${this.h}px`

    //adjust position
    this.node.style.position='absolute'
    this.node.style.left=`${this.x}px`
    this.node.style.top=`${this.y}px`

    this.gravitySpeed=3
    this.jumpSpeed=40
}


gravityEffect(){
// if the bird is touching the bnottom then skip this effect
if ((this.y +this.h)>gameBoxNode.offsetHeight){
    return
}
this.y += this.gravitySpeed
this.node.style.top = `${this.y}px`

}

jump(){
// when bird is above the screen, skip this function
    if(this.y<0){
        return
    }

this.y-=this.jumpSpeed
this.node.style.top = `${this.y}px`

}

}
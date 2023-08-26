



class Sprite{
    constructor({position, imageSrc,scale=1,frames,holdingFrame}){
        this.position=position
        this.height=48
        this.width=30
        this.image=new Image()
        this.image.src=imageSrc
        this.scale=scale
        this.frames=frames
        this.currentFrame=0
        this.countFrames=0
        this.holdingFrame=holdingFrame
    }
    draw(){
        c.drawImage(
            this.image,
            this.currentFrame * (this.image.width / this.frames),
            0,
            this.image.width / this.frames,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.frames) * this.scale,
            this.image.height * this.scale)
    }
    animateFrame(){
        this.countFrames++
        if(this.countFrames % this.holdingFrame==0){
            if(this.currentFrame<this.frames-1)
                this.currentFrame++
            else
              this.currentFrame=0
        }
    }
    update(){
        this.draw()
       
        
    }
    
}
///////////////////////////////////////////////////////////////////////////////////////
class Player extends Sprite{
    constructor({position,
        velocity,
        leftAttack,
        hp,
        imageSrc,
        scale=1,
        frames,
        holdingFrame,
        sprites,
        cont=0
        }) {
        super({
            position,
            imageSrc,
            scale,
            frames,
            holdingFrame
            aaa
        })
        this.velocity=velocity
        this.height=192
        this.width=120
        this.attackBox={
            position:{
                x:this.position.x,
                y:this.position.y
            },
            leftAttack,
            width:200,
            height:70
        }
        this.isAttacking=false
        this.isJumping=false
        this.hp=hp
        this.currentFrame=0
        this.countFrames=0
        this.sprites=sprites
        this.cont=cont
        this.dead=false

        for(const i in this.sprites){
            sprites[i].image=new Image()
            sprites[i].image.src=sprites[i].imageSrc
            this.frames=sprites[i].frames
        }
    }
    update(){
        this.draw()
        if(!this.dead) this.animateFrame()
       
        drawHealthbar(player1_healthbar,0,20,player1_healthbar.width,player1_healthbar.height,player1.hp,100)
        drawHealthbar(player2_healthbar,0,20,player2_healthbar.width,player2_healthbar.height,player2.hp,100)
       
        this.attackBox.position.x=this.position.x
        this.attackBox.position.y=this.position.y

        this.position.y+=this.velocity.y
        this.position.x+=this.velocity.x


        if(this.position.x + this.width >= canvas.width)
            this.velocity.x=0

        if(this.position.y + this.height + this.velocity.y >= canvas.height-50){
            this.velocity.y=0
        }else
        this.velocity.y += gravity
        


    }
    attack(){
        if (this.dead) {
            return; // Si el personaje está muerto, no realizar el ataque
          }
        this.isAttacking=true
        setTimeout(()=>{
            this.isAttacking=false
        },200)
    }
    takeHit(){
        
        this.hp-=10
        if(this.hp<=0){
            loseAudio.play();
            this.switchSprite('dead')
        }else{
            this.switchSprite('takeHit')
            hitAudio.play();
        }
    }

    jump(){
        if (this.dead) {
            return; // Si el personaje está muerto o ya está saltando, no realizar el salto
          }
        if(this.velocity.y<=1.5 && this.velocity.y>=0 && this.isJumping==false){
            this.velocity.y=-15
            
        }
        this.isJumping=true
        setTimeout(()=>{
            this.isJumping=false
        },800)
    }
    switchSprite(sprite,cont){
        //sobreescribiendo cuando un jugador muere
         //sobreescribiendo cuando un jugador recibe un golpe
        //sobreescribiendo las demas animaciones con animacion de ataque
        if (this.image === this.sprites.dead.image) {
            if (this.currentFrame < this.frames - 1) {
              // Todavía hay más fotogramas en la animación "dead"
              this.currentFrame++;
            } else {
              // La animación "dead" ha terminado, ahora se considera muerto
              this.dead = true;
            }
            return;
          }


        if (
            (this.image === this.sprites.attack1.image &&
              this.currentFrame < this.sprites.attack1.frames - 1) ||
            (this.image === this.sprites.attack2.image &&
              this.currentFrame < this.sprites.attack2.frames - 1) ||
            (this.image === this.sprites.attack3.image &&
              this.currentFrame < this.sprites.attack3.frames - 1) ||
            (this.image === this.sprites.attackReverse.image &&
              this.currentFrame < this.sprites.attackReverse.frames - 1) ||
            (this.image === this.sprites.dead.image &&
              this.currentFrame < this.sprites.dead.frames - 1) ||
            (this.image === this.sprites.takeHit.image &&
              this.currentFrame < this.sprites.takeHit.frames - 1)
          ) {
            return;
          }
       
    

        switch(sprite){
            case 'idle':
                if(this.image!=this.sprites.idle.image){
                    this.image=this.sprites.idle.image
                    this.frames=this.sprites.idle.frames
                    this.currentFrame=0
                    this.holdingFrame=this.sprites.idle.holdingFrame
                    
                }
                break
            case 'run':
                if(this.image!=this.sprites.run.image){
                    this.image=this.sprites.run.image
                    this.frames=this.sprites.run.frames
                    this.currentFrame=0
                    this.holdingFrame=this.sprites.run.holdingFrame
                    
                }
                break
            case 'jump':
                if(this.image!=this.sprites.jump.image){
                    this.image=this.sprites.jump.image
                    this.frames=this.sprites.jump.frames
                    this.currentFrame=0
                    this.holdingFrame=this.sprites.jump.holdingFrame
                    
                }
                break
            case 'attack':
                    if (
                      this.image !== this.sprites.attack1.image &&
                      this.image !== this.sprites.attack2.image &&
                      this.image !== this.sprites.attack3.image
                    ) {
                      if (this.cont == 0) {
                        while (this.cont == 0) this.cont++;
                        this.image = this.sprites.attack1.image;
                        this.frames = this.sprites.attack1.frames;
                        this.holdingFrame = this.sprites.attack1.holdingFrame;
                        this.currentFrame = 0;
                      } else if (this.cont == 1) {
                        this.cont++;
                        this.image = this.sprites.attack2.image;
                        this.frames = this.sprites.attack2.frames;
                        this.holdingFrame = this.sprites.attack2.holdingFrame;
                        this.currentFrame = 0;
                      } else {
                        this.image = this.sprites.attack3.image;
                        this.frames = this.sprites.attack3.frames;
                        this.holdingFrame = this.sprites.attack3.holdingFrame;
                        this.currentFrame = 0;
                        this.cont = 0;
                      }
                    }
                break;
            case 'dead':
                if (!this.dead && this.image !== this.sprites.dead.image) {
                    this.dead = true;
                    this.image = this.sprites.dead.image;
                    this.frames = this.sprites.dead.frames;
                    this.currentFrame = 0;
                    this.holdingFrame = this.sprites.dead.holdingFrame;
                }
                break;
            case 'takeHit':
                if(this.image!=this.sprites.takeHit.image){
                    this.image=this.sprites.takeHit.image
                    this.frames=this.sprites.takeHit.frames
                    this.currentFrame=0
                    this.holdingFrame=this.sprites.takeHit.holdingFrame
                }
                break;
            case 'reverse_idle':
                if(this.image!=this.sprites.idleReverse.image){
                    this.image=this.sprites.idleReverse.image
                    this.frames=this.sprites.idleReverse.frames
                    this.currentFrame=0
                    this.holdingFrame=this.sprites.idleReverse.holdingFrame
                    
                }
                break;
            case 'reverse_run':
                if(this.image!=this.sprites.runReverse.image){
                    this.image=this.sprites.runReverse.image
                    this.frames=this.sprites.runReverse.frames
                    this.currentFrame=0
                    this.holdingFrame=this.sprites.runReverse.holdingFrame
                        
                }
                break;
            case 'reverse_jump':
                if(this.image!=this.sprites.jumpReverse.image){
                    this.image=this.sprites.jumpReverse.image
                    this.frames=this.sprites.jumpReverse.frames
                    this.currentFrame=0
                    this.holdingFrame=this.sprites.jumpReverse.holdingFrame
                        
                }
                break;
            case 'reverse_attack':
                if(this.image!=this.sprites.attackReverse.image){
                    this.image=this.sprites.attackReverse.image
                    this.frames=this.sprites.attackReverse.frames
                    this.currentFrame=0
                    this.holdingFrame=this.sprites.attackReverse.holdingFrame
                        
                }
                break;
            case 'reverse_takeHit':
                if(this.image!=this.sprites.takeHitReverse.image){
                    this.image=this.sprites.takeHitReverse.image
                    this.frames=this.sprites.takeHitReverse.frames
                    this.currentFrame=0
                    this.holdingFrame=this.sprites.takeHitReverse.holdingFrame
                }
                break;
            
    }
}
}
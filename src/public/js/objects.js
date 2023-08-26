



//objeto Sprite para el fondo de pantalla
const background=new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc:"/img/Fondo_Zona_Combate.png",
    frames:1
})


const potion = new Sprite({
    position: {
        x: 468,
        y: 135
    },
    imageSrc: "/img/icon48.png",
    frames: 1,
    scale: 2
});


//objetos para las plataformas
const platform1=new Sprite({
    position:{
        x:150,
        y:350
    },
    imageSrc:"",
    frames:1,
    scale:1
})
const platform2=new Sprite({
    position:{
        x:450,
        y:150
    },
    imageSrc:"",
    frames:1,
    scale:1
})
const platform3=new Sprite({
    position:{
        x:750,
        y:350
    },
    imageSrc:"",
    frames:1,
    scale:1
})
//////////////////////////////////

const player1=new Player({
    position:{
        x:100,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
    hp:100,
    imageSrc:"/img/Woodcutter/Woodcutter_idle.png",
    scale:5,
    frames:4,
    holdingFrame:10,
    sprites:{
        idle:{
            imageSrc:"/img/Woodcutter/Woodcutter_idle.png",
            frames:4,
            holdingFrame:10
        },
        run:{
            imageSrc:"/img/Woodcutter/Woodcutter_run.png",
            frames:6,
            holdingFrame:10
        },
        jump:{
            imageSrc:"/img/Woodcutter/Woodcutter_jump.png",
            frames:4,
            holdingFrame:10
        },
        attack1:{
            imageSrc:"/img/Woodcutter/Woodcutter_attack1.png",
            frames:6,
            holdingFrame:6
        },
        attack2:{
            imageSrc:"/img/Woodcutter/Woodcutter_attack2.png",
            frames:6,
            holdingFrame:6
        },
        attack3:{
            imageSrc:"/img/Woodcutter/Woodcutter_attack3.png",
            frames:6,
            holdingFrame:6
        },
        dead:{
            imageSrc:"/img/Woodcutter/Woodcutter_death.png",
            frames:6,
            holdingFrame:10
        },
        takeHit:{
            imageSrc:"/img/Woodcutter/Woodcutter_hurt.png",
            frames:3,
            holdingFrame:10
        },
        idleReverse:{
            imageSrc:"/img/Woodcutter/Woodcutter_idle_reverse.png",
            frames:4,
            holdingFrame:10
        },
        runReverse:{
            imageSrc:"/img/Woodcutter/Woodcutter_run_reverse.png",
            frames:6,
            holdingFrame:10
        },
        jumpReverse:{
            imageSrc:"/img/Woodcutter/Woodcutter_jump_reverse.png",
            frames:4,
            holdingFrame:10
        },
        attackReverse:{
            imageSrc:"/img/Woodcutter/Woodcutter_attack1_reverse.png",
            frames:6,
            holdingFrame:6
        },
        takeHitReverse:{
            imageSrc:"/img/Woodcutter/Woodcutter_hurt_reverse.png",
            frames:3,
            holdingFrame:10
        }

    }
})


const player2=new Player({
    position:{
        x:800,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
    hp:100,
    imageSrc:"/img/GraveRobber/GraveRobber_idle.png",
    scale:5,
    frames:4,
    holdingFrame:10,
    sprites:{
        idle:{
            imageSrc:"/img/GraveRobber/GraveRobber_idle.png",
            frames:4,
            holdingFrame:10
        },
        run:{
            imageSrc:"/img/GraveRobber/GraveRobber_run.png",
            frames:6,
            holdingFrame:10
        },
        jump:{
            imageSrc:"/img/GraveRobber/GraveRobber_jump.png",
            frames:4,
            holdingFrame:10
        },
        attack1:{
            imageSrc:"/img/GraveRobber/GraveRobber_attack1.png",
            frames:6,
            holdingFrame:6
        },
        attack2:{
            imageSrc:"/img/GraveRobber/GraveRobber_attack2.png",
            frames:6,
            holdingFrame:6
        },
        attack3:{
            imageSrc:"/img/GraveRobber/GraveRobber_attack3.png",
            frames:6,
            holdingFrame:6
        },
        dead:{
            imageSrc:"/img/GraveRobber/GraveRobber_death.png",
            frames:6,
            holdingFrame:10
        },
        takeHit:{
            imageSrc:"/img/GraveRobber/GraveRobber_hurt.png",
            frames:3,
            holdingFrame:10
        },
        idleReverse:{
            imageSrc:"/img/GraveRobber/GraveRobber_idle_reverse.png",
            frames:4,
            holdingFrame:10
        },
        runReverse:{
            imageSrc:"/img/GraveRobber/GraveRobber_run_reverse.png",
            frames:6,
            holdingFrame:10
        },
        jumpReverse:{
            imageSrc:"/img/GraveRobber/GraveRobber_jump_reverse.png",
            frames:4,
            holdingFrame:10
        },
        attackReverse:{
            imageSrc:"/img/GraveRobber/GraveRobber_attack1_reverse.png",
            frames:6,
            holdingFrame:6
        }

    }
})
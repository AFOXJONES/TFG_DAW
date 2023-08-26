

// Cuando el jugador 1 gane
function jugador1Gana() {
    fetch('/jugador1gana')
        .then(response => response.text())
        .then(data => {
            // Aquí puedes procesar la respuesta del servidor si es necesario
            console.log(data);
        })
        .catch(error => {
            // Maneja el error si ocurre
            console.error(error);
        });
}

// Cuando el jugador 2 gane
function jugador2Gana() {
    fetch('/jugador2gana')
        .then(response => response.text())
        .then(data => {
            // Aquí puedes procesar la respuesta del servidor si es necesario
            console.log(data);
        })
        .catch(error => {
            // Maneja el error si ocurre
            console.error(error);
        });
}

// Cuando se reinicie la partida
function meterLogros() {
    fetch('/meterLogros')
        .then(response => response.text())
        .then(data => {
            // Aquí puedes procesar la respuesta del servidor si es necesario
            console.log(data);
        })
        .catch(error => {
            // Maneja el error si ocurre
            console.error(error);
        });
}




//crea un contexto en 2 dimensiones para la barra de salud del jugador 1
const player1_healthbar = document.getElementById("healthbar").getContext("2d")
player1_healthbar.width = 300
player1_healthbar.height = 100
//-----------------------------------------------------------------------//

//crea un contexto en 2 dimensiones para la barra de salud del jugador 2
const player2_healthbar = document.getElementById("healthbar2").getContext("2d")
player2_healthbar.width = 300
player2_healthbar.height = 100
//----------------------------------------------------------------------//

//Función que dibuja (segun el canvas de jugador que se le pase) un rectangulo que representa la vida del jugador
// y que al ir descendiendo, va haciendose mas pequeño y cambiando dde color del verde al rojo gradualmente
function drawHealthbar(canvas, x, y, width, height, health, max_health) {
    if (health >= max_health)
        health = max_health
    if (health <= 0)
        health = 0
    canvas.fillStyle = "#000000"
    canvas.fillRect(x, y, width, height)
    var colorNumber = Math.round((1 - (health / max_health)) * 0xff) * 0x10000 + Math.round((health / max_health) * 0xff) * 0x100
    var colorString = colorNumber.toString(16)
    if (colorNumber >= 0x100000)
        canvas.fillStyle = "#" + colorString
    else if (colorNumber < 0x100000 && colorNumber >= 0x10000)
        canvas.fillStyle = "#0" + colorString
    else if (colorNumber < 0x10000)
        canvas.fillStyle = "#00" + colorString

    canvas.fillRect(x + 1, y + 1, (health / max_health) * (width - 2), height - 2)
}
//----------------------------------------------------------------------------------------------------------------//


let timer = document.getElementById("timer").innerHTML

//Función que llama a un tiemout que va restando 1 al temporizador cada segundo hasta llegar a 0
//en el momento que llega a 0 determina quien ha ganado segun la vida que tenga cada jugador
function time() {
    if (timer > 0) {
        timeout = setTimeout(time, 1000)
        timer = timer - 1
        document.getElementById("timer").innerHTML = timer
        if (player2.hp == 0) {
            clearTimeout(timeout)
            document.getElementById("win").innerHTML = "PLAYER 1 WINS!!"
         //   document.getElementById("reiniciarPartida").innerHTML = "REINICIAR PARTIDA"
            jugador1Gana();
            meterLogros();
        }
        else if (player1.hp == 0) {
            clearTimeout(timeout)
            document.getElementById("win").innerHTML = "PLAYER 2 WINS!!"
          //  document.getElementById("reiniciarPartida").innerHTML = "REINICIAR PARTIDA"
            jugador2Gana();
            meterLogros()
        }


    }
    else {
        if (player1.hp > player2.hp) {
            document.getElementById("win").innerHTML = "PLAYER 1 WINS!!"
            jugador1Gana();
            meterLogros()
        }
        else if (player1.hp < player2.hp) {
            document.getElementById("win").innerHTML = "PLAYER 2 WINS!!"
            jugador2Gana();
            meterLogros()
        }
        else {
            document.getElementById("win").innerHTML = "TIE"
        }
      //  document.getElementById("reiniciarPartida").innerHTML = "REINICIAR PARTIDA"
    }


}
//---------------------------------------------------------------------------------------------//

time();


/* Aqui se crea el area de "juego" con un canvas, esta va a ser la pantalla donde se desarrolle el videojuego
   const canvas=document.querySelector("canvas")*/
const canvas = document.getElementById("game")
const c = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 576
c.fillRect(0, 0, canvas.width, canvas.height)
//---------------------------------------------------------------------------------------------------------//


const gravity = 0.5


//Objeto que agrupa todas las teclas que necesito, guardando un bollean "pressed" para cambiarlo segun este presionada o no la tecla
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}
//----------------------------------------------------------------------------------------------------------------------------------//

let lastkeypressed
let lastkeypressed2

/* Funcion que detecta la "colision" entre dos resctangulos o cuadrados dentro del canvas
   (dependiendo si la ultima tecla presionada fue la derecha o la izquierda, movera el rectangulo de 
   "attackBox" de posicion para atacar a la izquierda o derecha segun hacia que lado este mirando el jugador)*/
function isColliding(rect1, rect2, lastkey) {
    if (lastkey == "a" || lastkey == "ArrowLeft")
        return (rect1.attackBox.position.x - 50 <= rect2.position.x + rect2.width &&
            rect1.attackBox.position.x - 50 + rect1.attackBox.width >= rect2.position.x &&
            rect1.attackBox.position.y <= rect2.position.y + rect2.height &&
            rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y)
    else
        return (rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
            rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
            rect1.attackBox.position.y <= rect2.position.y + rect2.height &&
            rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y)
}
//----------------------------------------------------------------------------------------------------------//




//colisiones con la plataforma
function platformColliding(rect1, rect2) {
    return (rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.y + rect1.height <= rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height >= rect2.position.y)
}

function potionColliding(rect1, rect2) {
    return (
        rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y + rect1.height >= rect2.position.y &&
        rect1.position.y <= rect2.position.y + rect2.height
    );

}

//funcion que decide si jugador se queda encima o debajo de la plataforma
function onPlatform(player, platform) {
    let distance = (player.velocity.y + player.height) - platform.y;

    if (distance <= Math.abs(player.velocity.y)) {
        player.position.y = platform.position.y - player.height;
        player.velocity.y = 0;
    } else {
        player.position.y -= player.velocity.y;
        player.velocity.y = 0;
    }
}


//En esta funcion se "anima" todo el contenido del canvas:game (la pantalla del juego)
function animate() {
    window.requestAnimationFrame(animate)// informa al navegador que quieres realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update();

    platform1.update();
    platform2.update();
    platform3.update();

    player1.update()
    player2.update()

    potion.update();




    player1.velocity.x = 0
    if (player1.hp <= 0) {
        player1.switchSprite('dead')
    } else if (keys.a.pressed && lastkeypressed == "a" && player1.position.x >= 0) {
        player1.velocity.x = -7
        player1.switchSprite('reverse_run')
    } else if (keys.d.pressed && lastkeypressed == "d" && player1.position.x + player2.width <= canvas.width) {
        player1.velocity.x = 7
        player1.switchSprite('run')
    } else if (player1.velocity.y < 0) {
        if (lastkeypressed == "d")
            player1.switchSprite('jump')
        else
            player1.switchSprite('reverse_jump')
    } else if (player1.isAttacking) {
        if (lastkeypressed == "d")
            player1.switchSprite('attack')
        else
            player1.switchSprite('reverse_attack')
    } else {
        if (lastkeypressed == "a")
            player1.switchSprite('reverse_idle')
        else
            player1.switchSprite('idle')
    }

    player2.velocity.x = 0

    if (player2.hp <= 0) {
        player2.switchSprite('dead')
    } else if (keys.ArrowLeft.pressed && lastkeypressed2 == "ArrowLeft" && player2.position.x >= 0) {
        player2.velocity.x = -7
        player2.switchSprite('reverse_run')
    } else if (keys.ArrowRight.pressed && lastkeypressed2 == "ArrowRight" && player2.position.x + player2.width <= canvas.width) {
        player2.velocity.x = 7
        player2.switchSprite('run')
    } else if (player2.velocity.y < 0) {
        if (lastkeypressed2 == "ArrowRight")
            player2.switchSprite('jump')
        else
            player2.switchSprite('reverse_jump')
    } else if (player2.isAttacking) {
        if (lastkeypressed2 == "ArrowRight")
            player2.switchSprite('attack')
        else
            player2.switchSprite('reverse_attack')
    } else {
        if (lastkeypressed2 == "ArrowRight")
            player2.switchSprite('idle')
        else
            player2.switchSprite('reverse_idle')
    }

    if (isColliding(player1, player2, lastkeypressed) && player1.isAttacking) {
        player1.isAttacking = false
        //  player2.hp=player2.hp - 10
        player2.takeHit()

        /*if(lastkeypressed=="d")
        player2.position.x=0
        else
        player2.position.x=0*/
        /*  if(player2.hp<=0){
              player2.switchSprite('dead')
              document.getElementById("winner").innerHTML="PLAYER 1 WINS!!"
              clearTimeout(timeout)
          }else{
             // player2.switchSprite('takehit')
          }*/

        console.log("go")
    }
    if (isColliding(player2, player1, lastkeypressed2) && player2.isAttacking) {
        player2.isAttacking = false
        player1.takeHit()
        /* player1.hp=player1.hp - 10
         if(player1.hp==0){
             player1.switchSprite('dead')
             document.getElementById("winner").innerHTML="PLAYER 2 WINS!!"
             clearTimeout(timeout)
         }*/

        console.log("go")
    }

    // Define los límites del área donde se puede recoger la poción
    const minX = potion.width;
    const maxX = canvas.width - potion.width;
    const minY = potion.height;
    const maxY = canvas.height - potion.height;

    if (potionColliding(player1, potion)) {
        player1.hp += 50; // Aumenta la salud del jugador 1 en 20 puntos
        if (player1.hp > 100) {
            player1.hp = 100; // Limita la salud máxima del jugador 1 a 100 puntos
        }
        healingAudio.play();

        // Genera nuevas coordenadas aleatorias para la posición de la poción dentro de los límites establecidos
        potion.position.x = -1000;
        potion.position.y = .1000;
        setTimeout(function () {
            potion.position.x = Math.random() * (maxX - minX) + minX;
            potion.position.y = Math.random() * (maxY - minY) + minY;
        }, 10000);
    }

    if (potionColliding(player2, potion)) {
        player2.hp += 50; // Aumenta la salud del jugador 2 en 20 puntos
        if (player2.hp > 100) {
            player2.hp = 100; // Limita la salud máxima del jugador 2 a 100 puntos
        }
        healingAudio.play();

        // Genera nuevas coordenadas aleatorias para la posición de la poción dentro de los límites establecidos
        potion.position.x = -1000;
        potion.position.y = .1000;
        setTimeout(function () {
            potion.position.x = Math.random() * (maxX - minX) + minX;
            potion.position.y = Math.random() * (maxY - minY) + minY;
        }, 10000);
    }


    if (platformColliding(player1, platform1))
        onPlatform(player1, platform1)

    if (platformColliding(player1, platform2))
        onPlatform(player1, platform2)

    if (platformColliding(player1, platform3))
        onPlatform(player1, platform3)

    if (platformColliding(player2, platform1))
        onPlatform(player2, platform1)

    if (platformColliding(player2, platform2))
        onPlatform(player2, platform2)

    if (platformColliding(player2, platform3))
        onPlatform(player2, platform3)

}
//-----------------------------------------------------------------------------------------------------//

animate()

var down = false
var down2 = false

// Evento add.EventListener para recoger las teclas que se pulsan mediante el evento key, segun la tecla q se pulse,
// se modifica el objeto keys para cambiar la variable boleana "pressed" de dicha tecla, para asi saber si esta pulsada o se ha pulsado
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastkeypressed = "d"
            break
        case 'a':
            keys.a.pressed = true
            lastkeypressed = "a"
            break
        case 'w':
            player1.jump()
            break
        case 's':
            if (down)
                return
            player1.attack()
            down = true
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            lastkeypressed2 = "ArrowRight"
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            lastkeypressed2 = "ArrowLeft"
            break
        case 'ArrowUp':
            if (player2.velocity.y <= 1.5 && player2.velocity.y >= 0 && player2.isJumping == false) {
                player2.velocity.y = -15
                player2.jump()
            }
            break
        case 'ArrowDown':
            if (down2)
                return
            player2.attack()
            down2 = true
            break
    }
})
//-----------------------------------------------------------------------------------------------//

// Evento add.EventListener para recoger las teclas que se sueltan mediante el evento key, segun la tecla q se suelte (debe estar presionada antes),
// se modifica el objeto keys para cambiar la variable boleana "pressed" de dicha tecla, para asi saber si se ha dejado de pulsar o no
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
        case 's':
            down = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowDown':
            down2 = false
            break
    }
})
//-------------------------------------------------------------------------------------------------------------------------//
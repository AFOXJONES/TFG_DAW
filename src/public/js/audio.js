let themeAudio = new Audio("sounds/Chronos.mp3");
let menuAudio = new Audio("sounds/honor.mp3");
let AchievAudio = new Audio("../sounds/dragons.mp3");

let hitAudio = new Audio("sounds/hit.wav");
let loseAudio = new Audio("sounds/lose.wav");
let healingAudio = new Audio("sounds/healing.wav");

let isMusicPlaying = true; // Estado inicial de la música activada

function toggleMusic() {
  if (isMusicPlaying) {
    pauseMusic();
    document.getElementById("musicIcon").src = "./img/altavoz2.png";
  } else {
    musica();
    document.getElementById("musicIcon").src = "./img/altavoz.png";
  }
  
  isMusicPlaying = !isMusicPlaying; // Invierte el estado de reproducción de la música
}


function toggleMusicMenu() {
  if (isMusicPlaying) {
    pauseMusic();
    document.getElementById("musicIcon").src = "./img/altavoz2.png";
  } else {
    musicaMenu();
    document.getElementById("musicIcon").src = "./img/altavoz.png";
  }
  
  isMusicPlaying = !isMusicPlaying; // Invierte el estado de reproducción de la música
}

function toggleMusicAch() {
  if (isMusicPlaying) {
    pauseMusic();
    document.getElementById("musicIcon").src = "../img/altavoz2.png";
  } else {
    musicaAch();
    document.getElementById("musicIcon").src = "../img/altavoz.png";
  }
  
  isMusicPlaying = !isMusicPlaying; // Invierte el estado de reproducción de la música
}




function musica() {
  themeAudio.volume = 0.4; // Establece el volumen al 40%
  themeAudio.addEventListener("ended", function() {
    // Cuando termine, ejecuta de nuevo la canción
    themeAudio.currentTime = 0; // Reinicia el tiempo de reproducción al inicio
    themeAudio.play(); // Reproduce el audio nuevamente
  });

  themeAudio.play(); // Inicia la reproducción del audio
}


function musicaMenu() {
  menuAudio.volume = 0.4; // Establece el volumen al 40%
  menuAudio.addEventListener("ended", function() {
    // Cuando termine, ejecuta de nuevo la canción
    menuAudio.currentTime = 0; // Reinicia el tiempo de reproducción al inicio
    menuAudio.play(); // Reproduce el audio nuevamente
  });

  menuAudio.play(); // Inicia la reproducción del audio
}



function musicaAch() {
  AchievAudio.volume = 0.4; // Establece el volumen al 40%
  AchievAudio.addEventListener("ended", function() {
    // Cuando termine, ejecuta de nuevo la canción
    AchievAudio.currentTime = 0; // Reinicia el tiempo de reproducción al inicio
    AchievAudio.play(); // Reproduce el audio nuevamente
  });

  AchievAudio.play(); // Inicia la reproducción del audio
}

function pauseMusic() {
  menuAudio.pause();
  themeAudio.pause();
  AchievAudio.pause();
}

function addVolume() {
  if (menuAudio.volume < 1) {
    menuAudio.volume += 0.2;
  }
  if (themeAudio.volume < 1) {
    themeAudio.volume += 0.2;
  }
  if (AchievAudio.volume < 1) {
    AchievAudio.volume += 0.2;
  }
}

function reduceVolume() {
  if (menuAudio.volume > 0) {
    menuAudio.volume -= 0.2;
  }
  if (themeAudio.volume > 0) {
    themeAudio.volume -= 0.2;
  }
  if (AchievAudio.volume < 1) {
    AchievAudio.volume -= 0.2;
  }
}

function cambiarVolumen(value) {
  menuAudio.volume = value;
  themeAudio.volume = value;
  AchievAudio.volume= value;
}
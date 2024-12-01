const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
scoreDisplay.id = 'score';
const gameDiv = document.querySelector(".game");
const body = document.body;
const isGameOver = false;
let score =0;
let button = document.createElement("button");
let disp = document.createElement("h2");
let txt = document.createTextNode("agaaa..");

//go display
disp.style.color = "red";
disp.style.position = "relative";
disp.style.bottom ='270px';
disp.style.fontSize = '35px';
disp.style.left = '40%';
disp.style.textShadow = '0 0 1px black';

//body style
body.style.fontFamily ="fantasy";
body.style.fontVariant ="small-caps";
body.style.fontSize ="15px";
body.style.letterSpacing ="2px";
body.appendChild(scoreDisplay);

//score display style
scoreDisplay.style.border = "1.3px inset grey";
scoreDisplay.style.padding = "5px";
scoreDisplay.style.borderTopLeftRadius = "5px";
scoreDisplay.style.borderTopRightRadius = "5px";


function jump(){
    if (!dino.classList.contains("jump")){
        dino.classList.add("jump");
        setTimeout(function () {
            dino.classList.remove("jump");

        }, 500);
    }
}

//Score
function display(){
scoreDisplay.textContent = "score: " + 0;
cactus.style.animation = "obstacle 2s linear infinite";
body.style.backgroundColor ="white";
body.style.transition = "background-color 1s ease";
}

//gameover
function GameOver(){
    disp.appendChild(txt);
    gameDiv.appendChild(disp);
    cactus.style.animation = "none";
    dino.style.backgroundImage = "url('images/over.png')";
    dino.style.backgroundSize = "50px 50px";
    const dead = new Audio("/game sf/game over.wav");
    dead.play();
}

//restart
function restart(){
    button.textContent = "restart";
    button.style.border = "none";
    button.style.fontVariant = "small-caps";
    button.style.fontWeight = "bold";
    button.style.fontSize = "18px";
    button.style.boxShadow = "0 0 1px black";
    button.style.borderRadius = "7px";
    button.style.backgroundColor = "gold";
    button.style.position = 'relative';
    button.style.left = '40%';
    button.style.bottom = '275px';

    button.addEventListener('click', function(){
        cactus.style.animation = "obstacle 2s linear infinite";
        gameDiv.removeChild(disp);
        gameDiv.removeChild(button);
        dino.style.backgroundImage = "url('images/walk1.png')";
        dino.style.backgroundSize = "50px 50px";
        const res = new Audio("/game sf/restart.wav");
        res.play();
    })
}

//Main function
let isAlive = setInterval(function (){
    //dino Y position
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    //cactus X position
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    
    if(cactusLeft < 20 && cactusLeft > 0 && dinoTop >= 200){
        gameDiv.style.backgroundColor ="rgb(214, 243, 255)";
        gameDiv.style.transition = "background-color 1s ease";
        score = 0;
        display();
        GameOver();
        gameDiv.appendChild(button);
        restart();
}
    else if (!isGameOver && cactusLeft <= 0 && !isCactusCounted) {
        score++;
        scoreDisplay.textContent = "score: " + score;
        isCactusCounted = true;
        const points = new Audio("/game sf/score.wav");
        points.play();
}   
    else if (cactusLeft > 0) {
        isCactusCounted = false;
}


//increment speed depending on the score
    if(score === 5){
        cactus.style.animation = "obstacle 1.5s linear infinite";
}   
    else if(score === 10){
        cactus.style.animation = "obstacle 1s linear infinite";
        gameDiv.style.backgroundColor ="rgb(255, 242, 211)";
        gameDiv.style.borderBottom = "2px solid white";
        gameDiv.style.transition = "background-color 1s ease";

}   
    else if(score === 20){
        cactus.style.animation = "obstacle .9s linear infinite";
        gameDiv.style.backgroundColor ="rgb(255, 223, 148)";
        gameDiv.style.transition = "background-color 1s ease";
        gameDiv.style.borderBottom = "2px solid black";
        scoreDisplay.style.color = 'black';

}
}, 10);
let isWalking = true;
//jump func using spacebar
document.addEventListener('keydown', function(event){
    if (event.key === ' ' || event.key === 'Spacebar') { 
    // Trigger the jump animation
    jump();
    const jumpSound = new Audio("/game sf/jump.mp3");
    jumpSound.play();
    }
});

//bg music
let bgm = new Audio("/game sf/bgmusic2.mp3");
let on = document.getElementById("play");
on.addEventListener('click', function(){
    bgm.play();
})
let off = document.getElementById("stop");
off.addEventListener('click', function(){
    bgm.pause();
})

function notStarted(){
    cactus.style.animation = "none";
}
function started(){
    cactus.style.animation = "obstacle 2s linear infinite";
}
document.addEventListener('DOMContentLoaded', function () {
    const button2 = document.createElement('button');
    button2.textContent = "start";
    button2.id = "start";   
    button2.style.position = 'relative';
    gameDiv.appendChild(button2);
    notStarted();
    button2.addEventListener('click', function () {
        started();
        button2.style.display = 'none';
    });
});

//jump button for android
let jumpBut = document.createElement('button');
jumpBut.textContent = 'jump';
jumpBut.id = 'jumpbut';
body.appendChild(jumpBut);
jumpBut.style.height = '50px';
jumpBut.style.width = '100px';
jumpBut.style.position = 'relative';
jumpBut.style.left = '35%'

//function
jumpBut.addEventListener('click', function(){
    jump();
    const jumpSound = new Audio("/game sf/jump.mp3");
    jumpSound.play();
})
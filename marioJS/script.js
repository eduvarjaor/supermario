// Declaring required variables
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const pressSpace = document.querySelector(".press-space");

const themeSong = document.querySelector(".theme-song");
const jumpSound = document.querySelector(".jump-sound");
const deathSound = document.querySelector(".death-sound");

let spaceKeyPressed = false;

let score = 0;
let scoreSet = false;

// Setting how Mario's jump works
const jump = () => {
    mario.classList.add("jump");
    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500);

    scoreSet = false;
};

// Setting space key control and game music
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
        pressSpace.style.display = "none";
        spaceKeyPressed = true;
        if (themeSong.paused) {
            themeSong.play();
        } else {
            jumpSound.play();
        }
    }
});

// Setting player score
const scoreCount = () => {
    if (!scoreSet) {
        score++;
        scoreSet = true;
    }

    document.querySelector("#score").innerHTML = `SCORE: ${score}`;
};

// Setting game mechanics
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
        .getComputedStyle(mario)
        .bottom.replace("px", "");

    if (spaceKeyPressed) {
        if (pipePosition < 0 && marioPosition >= 60) {
            scoreCount();
        }

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = "none";
            pipe.classList.remove();
            pipe.style.left = `${pipePosition}px`;
            mario.style.animation = "none";
            mario.style.bottom = `${marioPosition}px`;
            mario.src = "./marioImages/game-over.png";
            mario.style.width = "75px";
            mario.style.margin = "50px";
            clearInterval(this);

            themeSong.pause();
            themeSong.currentTime = 0;
            jumpSound.pause();
            jumpSound.currentTime = 0;

            deathSound.play();
            deathSound.addEventListener("ended", restartGame);
        }
    }
}, 10);

//Restart game function
const restartGame = () => {
    score = 0;
    document.querySelector("#score").innerHTML = `SCORE: ${score}`;
    scoreSet = false;
    spaceKeyPressed = false;
    themeSong.currentTime = 0;
    jumpSound.currentTime = 0;
    mario.src = "marioImages/mario.gif";
    mario.removeAttribute("style");
    pressSpace.style.display = "block";
    pipe.removeAttribute("style");
};

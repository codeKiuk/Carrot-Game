'use strict';

const playBtn = document.querySelector('.play');
const timer = document.querySelector('.timer');
const carrotCount = document.querySelector('.carrot_count');
const gameSection = document.querySelector('section.game');

const alertBox = document.querySelector('div.alert');
const alertMessage = document.querySelector('span.alert_message');
const replayBtn = document.querySelector('button.replay');

const backSound = new Audio('./sound/bg.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');

let bugBox;
let carrotBox;
let timeOutID;
let timeIntervalID;
let leftCarrots;

playBtn.addEventListener('click', gameStart);

replayBtn.addEventListener('click', gameStart);

gameSection.addEventListener('click', event => {
    if (event.target.alt === 'bug') {
        bugClick();
    }
    else if (event.target.alt === 'carrot') {
        carrotClick(event);
    }
});

function gameStart() 
{
    playSound(backSound);

    if (playBtn.firstElementChild.className === 'fas fa-play') {
        changeVisibleState(playBtn, 'visible');
        changeVisibleState(alertBox, 'hidden');
        playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
        setTimer();
        leftCarrots = 10;
        carrotCount.textContent = leftCarrots;
        makeGameField();

        
    } 
    else {
        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
        gameEnd('Replay?', timeOutID, timeIntervalID);
    }
}

function createBox(src, boxName, imgName) {

    const box = document.createElement('div');
    box.setAttribute('class', boxName);

    const boxItem = document.createElement('img');
    boxItem.src = src;
    boxItem.alt = imgName;

    box.appendChild(boxItem);
    gameSection.appendChild(box);

    return box;
}

function spreadBoxes(box) {
    let x = random(1, 90);
    let y = random(1, 30);

    box.style.transform = `translate(${x}vw, ${y}vh)`;
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function makeGameField() {
    for( let i=10; i>0; i-- ) {
        bugBox = createBox('./img/bug.png', 'bugImg', 'bug');        
        carrotBox = createBox('./img/carrot.png', 'carrotImg', 'carrot');

        spreadBoxes(bugBox);
        spreadBoxes(carrotBox);
    }
}

function timerText(sec) {
    const minutes = Math.floor(sec / 60);
    const second = sec % 60;
    
    return `${minutes}:${second}`;
}

function setTimer() {

    let second = 10;
    timer.textContent = timerText(second);
    second--;
    timeIntervalID = window.setInterval(() => {
        if (second === 0) {
            clearInterval(timeIntervalID);
            return;
        }
        timer.textContent = timerText(second);
        second--;
    }, 1000);

    timeOutID = window.setTimeout(() => {
        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
        gameEnd('You Lose!', timeOutID, timeIntervalID);
    }, 10*1000);
}

function bugClick() {
    playSound(bugSound);
    gameEnd('You Lose!', timeOutID, timeIntervalID);
}

function carrotClick(event) {
    playSound(carrotSound);
    event.target.parentNode.removeChild(event.target);

    leftCarrots--;
    carrotCount.textContent = leftCarrots;

    if (leftCarrots === 0) {
        playSound(winSound);
        gameEnd('You Win!', timeOutID, timeIntervalID);
    }
}

function showAlert(text) {
    playSound(alertSound);
    alertMessage.textContent = text;
    changeVisibleState(alertBox, 'visible');
}

function changeVisibleState(element, text) {
    element.style.visibility = text;
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}
function pauseSound(sound) {
    sound.pause();
}

function gameEnd(text, outId, intervalId) {
    pauseSound(backSound);
    changeVisibleState(playBtn, 'hidden');
    showAlert(text);
    clearTimeout(outId);
    clearInterval(intervalId);
    timer.textContent = timerText(0);
    playBtn.firstElementChild.className = 'fas fa-play';
    gameSection.innerHTML = '';
}
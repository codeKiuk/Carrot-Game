'use strict';

const backSound = new Audio('./sound/bg.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');

export function bug() {
    playSound(bugSound);
}

export function carrot() {
    playSound(carrotSound);
}

export function win() {
    playSound(winSound);
}

export function background() {
    playSound(backSound);
}

export function alert() {
    playSound(alertSound);
}

export function stopBackground() {
    stop(backSound);
}

export function stop(sound) {
    sound.pause();
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}
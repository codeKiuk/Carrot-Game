'use strict';
import * as sound from './sound.js';

export default class GameBuilder {

    setDuration(duration) {
        this.duration = duration;
        return this;
    }

    build() {
        return new Game(this.duration);
    }
}

class Game {
    constructor(duration) {
        this.playBtn = document.querySelector('.play');
        this.timer = document.querySelector('.timer');

        this.tmp = duration;
        this.duration = this.tmp;

        this.playBtn.addEventListener('click', () => {
            this.start();
        })
    }

    setField(gameField) {
        this.gameField = gameField;
    }

    setBanner(gameFinishBanner) {
        this.gameFinishBanner = gameFinishBanner;
    }

    start() {
        sound.background();
    
        if (this.playBtn.firstElementChild.className === 'fas fa-play') {
            this.playBtn.style.visibility = 'visible';
            this.gameFinishBanner.hide();
            this.playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
            this.setTimer();
            this.gameField.construct();
        } 
        else {
            this.playBtn.innerHTML = `<i class="fas fa-play"></i>`;
            this.finish('Replay?', this.timeOutID, this.timeIntervalID);
        }
    }
    
    timerText(sec) {
        const minutes = Math.floor(sec / 60);
        const second = sec % 60;
        
        return `${minutes}:${second}`;
    }
    
    setTimer() {
        this.duration = this.tmp;
        this.timer.textContent = this.timerText(this.duration);
        this.duration--;
    
        this.timeIntervalID = window.setInterval(() => {
            if (this.duration === 0) {
                clearInterval(this.timeIntervalID);
                return;
            }
            this.timer.textContent = this.timerText(this.duration);
            this.duration--;
        }, 1000)
    
        this.timeOutID = window.setTimeout(() => {
            this.playBtn.innerHTML = `<i class="fas fa-play"></i>`;
            this.finish('You Lose!');
        }, this.tmp*1000);
    }
    
    finish(text) {
        sound.stopBackground();
        this.playBtn.style.visibility = 'hidden';
        this.gameFinishBanner.showAlert(text);
        clearTimeout(this.timeOutID);
        clearInterval(this.timeIntervalID);
        this.timer.textContent = this.timerText(0);
        this.playBtn.firstElementChild.className = 'fas fa-play';
    }

}



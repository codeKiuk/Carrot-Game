'use strict';
import * as sound from './sound.js';

export default class GameFieldBuilder {

    setBugNum(bugNum) {
        this.bugNum = bugNum;
        return this;
    }
    
    setCarrotNum(carrotNum) {
        this.carrotNum = carrotNum;
        return this;
    }

    build() {
        return new GameField(this.bugNum, this.carrotNum);
    }
}
class GameField {
    constructor(bugNum, carrotNum) {
        this.gameSection = document.querySelector('section.game');
        this.carrotCount = document.querySelector('.carrot_count');

        this.bugNum = bugNum;
        this.carrotNum = carrotNum;

        this.gameSection.addEventListener('click', (event) => {
            this.gameSectionClick(event);
        })

        this.game;
    }

    setGamePlay(game) {
        this.game = game;
    }

    createBox(src, boxName, imgName) {

        const box = document.createElement('div');
        box.setAttribute('class', boxName);
    
        const boxItem = document.createElement('img');
        boxItem.src = src;
        boxItem.alt = imgName;
    
        box.appendChild(boxItem);
        this.gameSection.appendChild(box);
    
        return box;
    }
    
    spreadBoxes(box) {
        let x = random(1, 90);
        let y = random(1, 30);
    
        box.style.transform = `translate(${x}vw, ${y}vh)`;
    }
    
    construct() {
        this.leftCarrots = this.carrotNum;
        this.carrotCount.textContent = this.leftCarrots;
        this.gameSection.innerHTML = ``;

        for( let i=this.bugNum; i>0; i-- ) {
            this.bugBox = this.createBox('./img/bug.png', 'bugImg', 'bug');
            this.spreadBoxes(this.bugBox);
        }
        for( let i=this.carrotNum; i>0; i-- ) {     
            this.carrotBox = this.createBox('./img/carrot.png', 'carrotImg', 'carrot');
            this.spreadBoxes(this.carrotBox);
        }
    }

    gameSectionClick(event) {
        if (event.target.alt === 'bug') {
            this.bugClick();
        }
        else if (event.target.alt === 'carrot') {
            this.carrotClick(event);
        }
    }

    bugClick() {
        sound.bug();
        this.game.finish('You Lose!');
    }
    
    carrotClick(event) {
        sound.carrot();
        event.target.parentNode.removeChild(event.target);
    
        this.leftCarrots--;
        this.carrotCount.textContent = this.leftCarrots;
    
        if (this.leftCarrots === 0) {
            sound.win();
            this.game.finish('You Win!');
        }
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}
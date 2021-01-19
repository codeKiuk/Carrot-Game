'use strict';
import GameFieldBuilder from './gameField.js';
import GameBuilder from './gamePlay.js';
import PopUp from './popUp.js';

const gamePlay = new GameBuilder()
    .setDuration(10)
    .build();

const gameField = new GameFieldBuilder()
    .setBugNum(20)
    .setCarrotNum(10)
    .build();

const gameFinishBanner = new PopUp();

gamePlay.setField(gameField);
gamePlay.setBanner(gameFinishBanner);
gameField.setGamePlay(gamePlay);

gameFinishBanner.setClickListener(() => {
    gamePlay.start();
})

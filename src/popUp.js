'use strict';
import * as sound from './sound.js';

export default class PopUp {
    constructor() {
        this.alertBox = document.querySelector('div.alert');
        this.alertMessage = document.querySelector('span.alert_message');
        this.replayBtn = document.querySelector('button.replay');
        
        this.replayBtn.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        })
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    hide() {
        this.alertBox.style.visibility = 'hidden';
    }

    showAlert(text) {
        sound.alert();
        this.alertMessage.textContent = text;
        this.alertBox.style.visibility = 'visible';
    }
}
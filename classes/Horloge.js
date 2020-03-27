class Horloge {

    interval;
    currentTime = 0;
    totalTime = 0;
    isPlaying = false;

    //Sounds
    tictac;
    alarm;

    //Visual elements
    h;
    horloge;
    hand;
    buttonsCuisson;
    inputButton;
    inputTime;
    playButton;
    pauseButton;
    restartButton;

    //Listener
    buttonsCuisson;
    inputButton;
    playButton;
    pauseButton;
    restartButton;
    inputTime;

    constructor(DOMContext, baseClass) {

        this.DOMContext = DOMContext;
        this.baseClass = baseClass;

        console.log(DOMContext, baseClass);

        this.start();
    }

    start() {

        this.isPlaying = false;

        //Sounds
        this.tictac = document.querySelector(`#tictac`);
        this.alarm = document.querySelector(`#alarm`);

        console.log(`${this.baseClass} .input-button`);

        //Visual elements
        this.h = document.querySelector(`${this.baseClass} .main-container`);
        this.horloge = document.querySelector(`${this.baseClass} .horloge`);
        this.hand = document.querySelector(`${this.baseClass} .hand`);
        this.buttonsCuisson = document.querySelectorAll(`${this.baseClass} .fixed-time`);
        this.inputButton = document.querySelector(`${this.baseClass} .input-button`);
        this.inputTime = document.querySelector(`${this.baseClass} .input-time`);

        this.playButton = document.querySelector(`${this.baseClass} .play`);
        this.pauseButton = document.querySelector(`${this.baseClass} .pause`);
        this.restartButton = document.querySelector(`${this.baseClass} .restart`);

        //Listener
        this.buttonsCuisson.forEach(x => x.addEventListener("click", this.onClickButton.bind(this)));
        this.inputButton.addEventListener("click", this.onClickInput.bind(this));
        this.playButton.addEventListener("click", this.onClickPlay.bind(this));
        this.pauseButton.addEventListener("click", this.onClickPause.bind(this));
        this.restartButton.addEventListener("click", this.onClickrestart.bind(this));

        this.inputTime.addEventListener("keyup", this.onInputChange.bind(this));
    }

    onInputChange(e) {
        let val = e.target.value;

        //Chercher pour quand on rentre un point

        //converti le tout en int
        val = parseInt(val);

        e.target.value = val;
    }

    onClickPlay(e) {
        this.isPlaying = true;
        console.log("click play");

        this.tictac.play();

        clearInterval(this.interval);
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    onClickPause(e) {
        console.log("pause");
        this.isPlaying = false;
    }

    onClickrestart(e) {
        console.log("restart");
        this.setHorlogeData(this.totalTime);
    }

    onClickButton(e) {
        // 3 * 60 = 180;
        this.totalTime = e.target.dataset.time * 60;
        this.setHorlogeData(this.totalTime);
    }

    onClickInput(elements) {
        console.log("input click");
        this.totalTime = this.inputTime.value * 60;
        this.setHorlogeData(this.totalTime);
    }

    setHorlogeData(t) {
        this.currentTime = 0;
        this.isPlaying = false;

        this.showHorloge(t);
    }

    tick() {

        let actual;

        if (this.isPlaying) {

            this.currentTime++;

            actual = this.totalTime - this.currentTime;

            //180 - 0
            if (actual >= 0) {

                this.showHorloge(actual);
            }

            if (actual == 0) {
                alarm.play();
                clearInterval(this.interval);
            }
        }
        // console.log("tick", isPlaying, actual, totalTime, currentTime);
    }

    showHorloge(actual) {

        //Affichage horloge
        const rot = this.currentTime * 360 / this.totalTime;
        this.hand.style.transform = `rotate(${-rot}deg)`;

        //Changement de couleur dynamique
        this.h.style.backgroundColor = `hsl(${rot},100%,75%)`;

        //Affichage digital
        let min = this.zeroPadding(Math.floor(actual / 60));
        let s = this.zeroPadding(actual - min * 60);
        this.horloge.innerHTML = `${min}:${s}`;
    }

    zeroPadding(t) {
        if (t <= 9) {
            return `0${t}`;
        }

        return t;
    }
}
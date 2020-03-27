class Main {

    numHorloges = 0;
    containerBase;
    clocksContainer;

    constructor() {
        console.log("start");

        this.containerBase = document.querySelector(".base");
        this.clocksContainer = document.querySelector(".clocks");
        this.containerBase.parentNode.removeChild(this.containerBase);

        this.addButton = document.querySelector("#add-button");

        this.addButton.addEventListener("click", this.onClickAddButton.bind(this));

        //Create the first horloge
        this.createHorloge();
    }

    onClickAddButton(e) {
        this.createHorloge();
    }

    createHorloge() {
        console.log("click add button");

        //Create new DOM for horloge
        let clone = this.containerBase.cloneNode(true);
        clone.style.display = "flex";
        clone.classList.add(`clone-${this.numHorloges}`);
        clone.classList.remove("base");
        this.clocksContainer.append(clone);

        //Create new Horloge logic
        let horloge = new Horloge(clone, `.clone-${this.numHorloges}`);

        this.numHorloges++;
    }
}
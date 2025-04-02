let turn = "Player1";
let turnNumber = 0;
let playerHasWin = false;


const elemets = {
    "Player1": "❌",
    "Player2": "⚪"
};

const nextTurn = {
    "Player1": "Player2",
    "Player2": "Player1"

};

let identity = {

    "Player1": {
        "Row": {
            1: 0,
            2: 0,
            3: 0,
        },

        "Col": {
            1: 0,
            2: 0,
            3: 0,
        },

        "Diag": {
            1: 0,
            2: 0,

        },


    },

    "Player2": {
        "Row": {
            1: 0,
            2: 0,
            3: 0,
        },

        "Col": {
            1: 0,
            2: 0,
            3: 0,
        },

        "Diag": {
            1: 0,
            2: 0,

        },
    },




};



PlayerAction = function(event) {

    let elem = event.target;

    if (elem.tagName == "TD") {

        if (elem.innerText == "" && !playerHasWin) {
            elem.appendChild(document.createTextNode(elemets[turn]));

            incrementTurnNumber();

            checkResult(elem.getAttribute("x"), elem.getAttribute("y"));

            if (!playerHasWin && turnNumber < 9) {
                goToNext();
            }


        }

    }

}


checkResult = function(x, y) {
    console.log(turn);
    ++identity[turn]["Row"][x] == 3 ? win("Row", x) : 0;
    ++identity[turn]["Col"][y] == 3 ? win("Col", y) : 0;

    if (x == y) {
        ++identity[turn]["Diag"][1] == 3 ? win("Diag", 1) : 0;
        if (x == 2) {
            ++identity[turn]["Diag"][2] == 3 ? win("Diag", 2) : 0;
        }
    } else {
        if ((x == 3 && y == 1) || (x == 1 && y == 3)) {
            ++identity[turn]["Diag"][2] == 3 ? win("Diag", 2) : 0;
        }
    }

    checkDraw();

}

win = function(tipo, num) {
    playerHasWin = true;
    let p = document.querySelector(`p[id*="currentMove"]`);
    p.innerHTML = `Player ${elemets[turn]} wins! Reload the page to play again!`;

    if (tipo == "Row") {
        coloraRiga(num);

    } else if (tipo == "Col") {
        coloraColonna(num);

    } else {
        if (num == 1) {
            coloraDiagonaleBackSlash();
        } else {
            coloraDiagonaleSlash();
        }

    }

}

function coloraDiagonaleSlash() {
    let elem;
    for (let i = 1; i <= 3; i++) {
        elem = document.querySelector(`td[y*="${3-(i-1)}"][x*="${i}"]`);
        elem.setAttribute("style", "background-color: green;");
    }
}

function coloraDiagonaleBackSlash() {
    let elem;
    for (let i = 1; i <= 3; i++) {
        elem = document.querySelector(`td[y*="${i}"][x*="${i}"]`);
        elem.setAttribute("style", "background-color: green;");
    }
}

function coloraColonna(num) {
    let elem;
    for (let i = 1; i <= 3; i++) {
        elem = document.querySelector(`td[y*="${num}"][x*="${i}"]`);
        elem.setAttribute("style", "background-color: green;");
    }

}

function coloraRiga(num) {
    let elem;
    for (let i = 1; i <= 3; i++) {
        elem = document.querySelector(`td[x*="${num}"][y*="${i}"]`);
        elem.setAttribute("style", "background-color: green;");
    }
}

function checkDraw() {
    if (turnNumber == 9 && !playerHasWin) {
        let p = document.querySelector(`p[id*="currentMove"]`);
        p.innerHTML = "It's a draw! Reload the page to play again!";
    }
}

function incrementTurnNumber() {
    turnNumber++;
}

function goToNext() {
    turn = nextTurn[turn];
    let turnText = document.getElementById("turnText");
    turnText.innerHTML = elemets[turn];
}

function setupGame(id) {

    let conteiner = document.getElementById(id);

    let p = document.createElement("p");
    p.id = "currentMove";
    p.innerHTML = "<span>Current move : </span> <span id='turnText'>❌</span>"
    conteiner.appendChild(p);

    let tavolo = document.createElement("table");
    conteiner.appendChild(tavolo);
    tavolo.id = "tavolo";

    for (let i = 1; i <= 3; i++) {
        let riga = document.createElement("tr");
        riga.setAttribute("nr", i);
        tavolo.appendChild(riga);

        for (let j = 1; j <= 3; j++) {
            let tabella = document.createElement("td");
            tabella.setAttribute("x", i);
            tabella.setAttribute("y", j);
            riga.appendChild(tabella);

        }
    }

    tavolo = document.querySelector("table[id*='tavolo']");
    tavolo.addEventListener("click", PlayerAction);

}
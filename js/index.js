let errors = 0;
let cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]

let cardSet;
let board = [];
const rows = 4;
const columns = 5;

let card1Selected;
let card2Selected;

window.onload = function(){
    shuffleCards();
    startGame();
}

function shuffleCards(){
    cardSet = cardList.concat(cardList); // Two of each card

    for (let i = 0; i < cardSet.length; i++){
        let j = Math.floor(Math.random() * cardSet.length); // get random index

        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
}

function startGame(){
    for (let r = 0; r < rows; r++){

        let row = [];

        for (let c = 0; c < columns; c++){
            let cardImg = cardSet.pop();
            row.push(cardImg);

            // <img id="0-0" src="water.jpg">
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "images/" + cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }

    setTimeout(hideCards, 2000);
}

function hideCards(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "images/back.jpg";
        }
    }
}

function selectCard(){
    if(this.src.includes("images/back.jpg")){
        if(!card1Selected){
            card1Selected = this;

            let coords = card1Selected.id.split("-") //"0-1" -> ["0", "1"];
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = "images/" + board[r][c] + ".jpg";
        } else if (!card2Selected && this != card1Selected){
            card2Selected = this;

            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = "images/" + board[r][c] + ".jpg";
            setTimeout(update, 2000);
        }
    }
}

function update(){
    //if cards arent the same, flip both back

    if(card1Selected.src != card2Selected.src){
        card1Selected.src = "images/back.jpg";
        card2Selected.src = "images/back.jpg";

        errors += 1;
        document.getElementById("errors").innerText = errors;

    }

    card1Selected = null;
    card2Selected = null;
}
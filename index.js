import { cardsOnScreen } from "./cardsOnScreen.js";

let displayedCards = cardsOnScreen;

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("new-card-btn").addEventListener("click", newCard);

let player = {
    name: "Your name",
    chips: 145
};

playerEl.textContent = player.name + ": $" + player.chips;

// shuffle cards instead and take first instead 
function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

function startGame() {
    if (player.chips < 50) {
        message = "You're out of chips, sorry!";
        messageEl.textContent = message;
        return;
    }
    
    isAlive = true;
    hasBlackJack = false; // Reset the hasBlackJack flag
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

function renderGame() {
    cardsEl.innerHTML = ""; // this resets the cards 

    for (let i = 0; i < cards.length; i++) {
        let cardIndex = cards[i] - 1; // Subtract 1 to get the correct index
        let cardImage = document.createElement("img");
        cardImage.classList.add("card-image");
        cardImage.setAttribute("src", displayedCards[cardIndex].imageUrl);
        cardsEl.appendChild(cardImage);
    }

    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        player.chips += 10; 
    } else {
        message = "You're out of the game!";
        isAlive = false;
        if (!hasBlackJack) {
            player.chips -= 10; 
        }
    }
    
    if (player.chips <= 0) {
        message = "You're out of chips, sorry!";
        isAlive = false;
    }
    
    messageEl.textContent = message;
    playerEl.textContent = player.name + ": $" + player.chips;
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        if (player.chips < 50) {
            message = "You're out of chips, sorry!";
            messageEl.textContent = message;
            return;
        }
        
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}

import { cardsOnScreen } from "./cardsOnScreen.js";

const cards = Array.from({ length: 10 }, (_, i) => i + 1);
let displayedCards = cardsOnScreen;

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
    name: "Player",
    chips: 145
};

playerEl.textContent = player.name + ": $" + player.chips;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(displayedCards);

// shuffle cards and for each shuffling take one card from the shuffled array
// see Fischer Yates shuffle algorithm and see if you can implement it here if not keep looking for a way to implement it
function getRandomCard() {
    if (displayedCards.length === 0) {
        shuffleArray(cards);
        displayedCards = [...cardsOnScreen];
    }

    const card = displayedCards.pop();
    return card.value;
}


function startGame() {
    if (player.chips < 50) {
        message = "You're out of chips, sorry!";
        messageEl.textContent = message;
        return;
    }

    isAlive = true;
    hasBlackJack = false;
    cards.length = 0;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards.push(firstCard, secondCard);
    sum = 10 + firstCard + secondCard;
    renderGame();
}


function renderGame() {
    cardsEl.innerHTML = "";

    for (let i = 0; i < cards.length; i++) {
        let cardIndex = cards[i] - 1;
        let cardImage = document.createElement("img");
        cardImage.classList.add("card-image");
        cardImage.setAttribute("src", displayedCards[cardIndex].imageUrl);
        cardsEl.appendChild(cardImage);
    }

    // Calculate the displayed sum by subtracting the initial 10 from the total sum
    let displayedSum = sum;
    sumEl.textContent = "Sum: " + displayedSum;

    if (sum < 21) {
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

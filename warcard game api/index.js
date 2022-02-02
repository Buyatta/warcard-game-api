//variable to save local data
let deckId;
//for score
let computerScore = 0;
let myScore = 0;
//to hold cards
const cardsContainer = document.getElementById("cards");
//to hold newdeck
const newDeckBtn = document.getElementById("new-deck");
//to hold draw cards
const drawCardBtn = document.getElementById("draw-cards");
//for the cards that wins
const header = document.getElementById("header");
//for the remaining cards
const remainingText = document.getElementById("remaining");

//function to click and fetch data
function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      //to display remaining cards on new deck
      remainingText.textContent = `Remaining cards: ${data.remaining}`;
      deckId = data.deck_id;
    });
}

newDeckBtn.addEventListener("click", handleClick);

//function to display and draw cards
//use async
drawCardBtn.addEventListener("click", async () => {
  const res = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
  );
  const data = await res.json();
  //to display remaining cards
  remainingText.textContent = `Remaining cards: ${data.remaining}`;
  //to display cards
  cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `;
  cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `;
  //to display the card that wins
  const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
  header.textContent = winnerText;
  //to disable draw card when it hits zero
  if (data.remaining === 0) {
    drawCardBtn.disabled = true;
    //to dipslay who won the game
    if (computerScore > myScore) {
      // display "The computer won the game!"
      header.textContent = "The computer won the game!";
    } else if (myScore > computerScore) {
      // display "You won the game!"
      header.textContent = "You won the game!";
    } else {
      // display "It's a tie game!"
      header.textContent = "It's a tie game!";
    }
  }
});
//to determine the card that wins
function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    //to display a computer score when it wins
    computerScore++;
    computerScoreEl.textContent = `Computer score: ${computerScore}`;
    return "Card 1 wins!";
  } else if (card1ValueIndex < card2ValueIndex) {
    //display my score when I win
    myScore++;
    myScoreEl.textContent = `My score: ${myScore}`;
    return "Card 2 wins!";
  } else {
    return "War!";
  }
}
//example of async function
// async function handleClick() {
//     const response = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
//     const data = await res.json()
//     remainingText.textContent = `Remaining cards: ${data.remaining}`
//     deckId = data.deck_id
//     console.log(deckId)
// }

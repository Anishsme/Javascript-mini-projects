/* 
  In blackjack
  k=10
  q=10
  a=1 or 11
  j=10

  Once you click stand you cannot click hit button again only deal button should work
  You cannot click deal before clicking hit and stand
  
*/

// Now we create an object that will hold info about the you and dealer portions of the layout
let blackjackGame = {
  you: { scoreSpan: "#bj-you", div: "#you2", score: 0 },
  dealer: { scoreSpan: "#bj-dealer", div: "#deal2", score: 0 },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    J: 10,
    Q: 10,
    A: [1, 11],
  },
  wins: 0,
  loss: 0,
  draw: 0,
  isStand: false,
  turnsOver: false,
};
const YOU = blackjackGame.you;
const DEALER = blackjackGame.dealer;

// This stores the sound file which will play when the hit button is pressed
const hitsound = new Audio("blackjack_assets/sounds/swish.m4a");
const winsound = new Audio("blackjack_assets/sounds/cash.mp3");
const lostsound = new Audio("blackjack_assets/sounds/aww.mp3");
/*The next 2 lines of code 
  Add event listeners to the hit and deal buttons respectively
  EventListener then calls the blackjackHit or blackjackDeal function when their respective button is clicked
*/
document.querySelector("#bj-hit-btn").addEventListener("click", blackjackHit);
document.querySelector("#bj-deal-btn").addEventListener("click", blackjackDeal);
document.querySelector("#bj-stand-btn").addEventListener("click", dealerLogic);

// This function is to select index for a random card and returns a CARD from the blackjackGame.cards object
function randomCards() {
  // Randomly selects a number from 0-13
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame.cards[randomIndex];
}

/*This function is called when we click the hit button
  1->It invokes the randomCards() function which gives us a random number form 0 to 13
  2->Then we invoke the showCard() function that displays the card on the YOU side of the table
*/
function blackjackHit() {
  // The below code must run only if the stand button has not been clicked ie you cannot use this button once the stand button is clicked
  if (blackjackGame.isStand === false) {
    let card = randomCards();
    showCard(YOU, card);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

/*
This function is used to provide functionality when the deal button is clicked ie. deletes all the cards from the YOU and dealer side of the board
*/
function blackjackDeal() {
  // The if statement basically says that the deal button can work only if the hit and stand buttons are clicked first
  if (blackjackGame.turnsOver === true) {
    // With the below line of code we are basically storing all the images that are in '#you2' and storing them in a node list
    let yourimages = document.querySelector("#you2").querySelectorAll("img");
    let dealimages = document.querySelector("#deal2").querySelectorAll("img");
    // Below deletes from the YOU and DEALER side
    for (i = 0; i < yourimages.length; i++) {
      yourimages[i].remove();
    }
    for (i = 0; i < dealimages.length; i++) {
      dealimages[i].remove();
    }
    YOU.score = 0;
    DEALER.score = 0;
    document.querySelector(YOU.scoreSpan).textContent = YOU.score;
    document.querySelector(YOU.scoreSpan).style.color = "white";
    document.querySelector(DEALER.scoreSpan).textContent = DEALER.score;
    document.querySelector(DEALER.scoreSpan).style.color = "white";
    document.querySelector("#play").textContent = "Let's play";
    document.querySelector("#play").style.color = "black";
    blackjackGame.isStand = false;
    blackjackGame.turnsOver = false;
  }
}

/*
    Pics a random card and displays it
*/
function showCard(activePlayer, card) {
  if (activePlayer.score <= 21) {
    // document.createElement creates a new image element(paramenter can be a <p> tag or any other tag as well)
    let cardImage = document.createElement("img");
    let c = card + ".png";
    cardImage.src = "blackjack_assets/images/" + c;
    // Appends the newly created img element to the div part of YOU or DEALER
    document.querySelector(activePlayer.div).appendChild(cardImage);
    hitsound.play();
  }
}

// Now we create a function that updates the scores
function updateScore(card, activePlayer) {
  // This code handles the case where the card is an ace
  if (card === "A") {
    if (activePlayer.score + blackjackGame.cardsMap[card][1] <= 21) {
      activePlayer.score += blackjackGame.cardsMap[card][1];
    } else {
      activePlayer.score += blackjackGame.cardsMap[card][0];
    }
  } else {
    // Here we update the score part of the YOU or DEALER object by adding up the card values using the CardMap object
    activePlayer.score += blackjackGame.cardsMap[card];
  }

  console.log(activePlayer.score);
}

let bust_sound = new Audio("blackjack_assets/sounds/aww.mp3");
// This function is to change the scores of either you or the dealer
function showScore(activePlayer) {
  if (activePlayer.score <= 21) {
    document.querySelector(activePlayer.scoreSpan).textContent =
      activePlayer.score;
  } else {
    document.querySelector(activePlayer.scoreSpan).textContent = " BUST !";
    document.querySelector(activePlayer.scoreSpan).style.color = "red";
  }
}
// Advanced stuff
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// This adds functionality to the stand button
async function dealerLogic() {
  blackjackGame.isStand = true;
  while (DEALER.score < 16 && blackjackGame.isStand === true) {
    let card = randomCards();
    showCard(DEALER, card);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  // Since the dealer is a bot we must add some logic to it
  // Generally people do not hit if they get a sum of cards equal to 15 or 16
  // So we add the logic for that here

  // Once stand button clicked you cannot click hit button
  blackjackGame.turnsOver = true;
  let winner = computeWinner();
  showResult(winner);
  /*LOOK AT THIS PART OF THE CODE*/
  YOU.score = 0;
  DEALER.score = 0;
}

// Now we create a function to compute winner and return who just won
// Updates the wins,losses and draws
function computeWinner() {
  let winner;
  // Now there are cases for who will be the winner
  if (YOU.score <= 21) {
    // CONDITION-If YOU have a higher score than the dealer or when dealer busts and you're 21 or under
    if (YOU.score > DEALER.score || DEALER.score > 21) {
      winner = YOU;
      blackjackGame.wins++;
    } else if (YOU.score < DEALER.score) {
      winner = DEALER;
      blackjackGame.loss++;
    } else if (YOU.score === DEALER.score) {
      console.log("YOU DREW");
      blackjackGame.draw++;
    }
  }
  // Condition where you bust but the dealer does not
  else if (YOU.score > 21 && DEALER.score <= 21) {
    winner = DEALER;
    blackjackGame.loss++;
  }
  // If both you and the dealer bust
  else if (YOU.score > 21 && DEALER.score > 21) {
    console.log("YOU DREW");
    blackjackGame.draw++;
  }
  // console.log("Winner is " + winner);
  return winner;
}

// Displays result
function showResult(winner) {
  let message, messageColor;
  if (blackjackGame.turnsOver === true) {
    if (winner === YOU) {
      document.querySelector("#win").textContent = blackjackGame.wins;
      message = "You win";
      messageColor = "green";
      winsound.play();
    } else if (winner === DEALER) {
      document.querySelector("#loss").textContent = blackjackGame.loss;
      message = "You lose";
      messageColor = "red";
      lostsound.play();
    } else {
      document.querySelector("#draw").textContent = blackjackGame.draw;
      message = "You drew";
      messageColor = "black";
    }
    document.querySelector("#play").textContent = message;
    document.querySelector("#play").style.color = messageColor;
  }
}

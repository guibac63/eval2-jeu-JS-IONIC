// variable declaration
const appGame = document.querySelector("ion-grid");
const playerZone = document.getElementsByClassName("elementPlayer");
const roundPatch = document.getElementsByClassName("playerTurn");
const startGame = document.getElementsByClassName("fontPlay");
const savePoints = document.getElementsByClassName("fontSave");
const currentScoreZone = document.getElementsByClassName("currentZone");
//variables in a table
const tabstyleElements = [];
tabstyleElements.push(playerZone, roundPatch, startGame,savePoints, currentScoreZone);
console.log(tabstyleElements);

//--------------------------------------------------------------------//

// adjustment when the game starts
function newgame() {
  // reinitialize scores to 0
  countertozero();
  //affiche les éléments du jeu
  appGame.classList.remove("invisible");

  //random definition of first turn player
  const starterPlayer = Math.round(Math.random());
  const secondPlayer = starterPlayer > 0 ? 0 : 1;

  //change style for the player zone who is allowed to play
  applystylenewgame(starterPlayer, secondPlayer, tabstyleElements);
}

function countertozero() {
  const score = document.querySelectorAll(".gameScore,.currentScore");
  score.forEach((elt) => {
    elt.innerHTML = "0";
  });
}

function applystylenewgame(first, second, tabElement) {
  tabElement.forEach((elt) => {
    if (elt[first].classList.contains("elementPlayer")) {
      elt[first].classList.remove("borderLine");
      elt[second].classList.remove("borderLine");
      elt[second].classList.add("borderLine");
    } else {
      elt[first].classList.remove("invisible");
      elt[second].classList.remove("invisible");
      elt[first].classList.add("invisible");
    }
  });
}

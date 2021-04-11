// variables declaration
const game = document.querySelector("ion-content")
const appGame = document.querySelector("ion-grid");
const playerZone = document.getElementsByClassName("elementPlayer");
const roundPatch = document.getElementsByClassName("playerTurn");
const startGame = document.getElementsByClassName("fontPlay");
const savePoints = document.getElementsByClassName("fontSave");
const currentScoreZone = document.getElementsByClassName("currentZone");
const currentScore = document.getElementsByClassName("currentScore");
const canvasDraw = document.getElementsByClassName("canvasDice");
const globalScore = document.getElementsByClassName("gameScore");
const gameWin = document.getElementsByClassName("gameWin");
let endGame;

//style variables in a table for the turn by turn play
const tabstyleElements = [];
tabstyleElements.push(
  playerZone,
  roundPatch,
  startGame,
  savePoints,
  currentScoreZone,
  canvasDraw,
  gameWin
);

//--------------------------------------------------------------------//

// adjustment when the game starts
function newGame() {
  //initialize beginning
  endGame = false;
  // reinitialize scores to 0
  counterToZero("start");
  //hide the game for a later progressive display
  game.style.opacity = 0
  //display game elements
  appGame.classList.remove("invisible");
  fadeIn(appGame)

  //random definition of first turn player
  const starterPlayer = Math.round(Math.random());
  const secondPlayer = starterPlayer > 0 ? 0 : 1;

  //change style for the player zone who is allowed to play
  applyStyleNewgame(starterPlayer, secondPlayer, tabstyleElements);

  //display slowly the elements of the new game
  fadeIn(game)

}

//---------------------------------------------------------------//

// on buttonclick "play" launch round for the selected player
function play(idActivePlayer) {
  //dice value
  let randomDice = 1 + Math.round(Math.random() * 5);
  //draw the dice of the active player with his value
  drawingDice(randomDice, idActivePlayer);
  //if diceplay = 1 change round
  if (randomDice === 1) {
    //reload current counter to 0
    counterToZero("play");
    if (idActivePlayer.includes("one")) {
      setTimeout(() => applyStyleNewgame(0, 1, tabstyleElements), 200);
    } else {
      setTimeout(() => applyStyleNewgame(1, 0, tabstyleElements), 200);
    }
    // else add the value of the dice in the current score of the player
  } else {
    if (idActivePlayer.includes("one")) {
      displayScore(0, randomDice, 1, currentScore);
    } else {
      displayScore(1, randomDice, 1, currentScore);
    }
  }
}

//---------------------------------------------------------//

function counterToZero(type) {
  const score =
    type === "start"
      ? document.querySelectorAll(".gameScore,.currentScore")
      : document.querySelectorAll(".currentScore");
  score.forEach((elt) => (elt.innerHTML = "0"));
}

//----------------------------------------------------------------------//

function applyStyleNewgame(first, second, tabElement) {
  if (endGame === false) {
    // display and hide different css effects for playing turn by turn
    tabElement.forEach((elt) => {
      if (elt[first].classList.contains("elementPlayer")) {
        elt[first].classList.remove("borderLine");
        elt[second].classList.remove("borderLine");
        elt[second].classList.add("borderLine");
      } else if (elt[first].classList.contains("gameWin")) {
        elt[first].classList.add("invisible");
        elt[second].classList.add("invisible");
      } else {
        elt[first].classList.remove("invisible");
        elt[second].classList.remove("invisible");
        elt[first].classList.add("invisible");
      }
    });
    // clear the dice draw for the two players
    for (let i = 0; i < canvasDraw.length; i++) {
      const ctx = canvasDraw[i].getContext("2d");
      ctx.clearRect(0, 0, 102, 102);
    }
  }
}

//----------------------------------------------------------------------//

function displayScore(activePlayer, randomScore, wayToCount, score) {
  const limitScore = randomScore;
  //if score = 100 then call the win function and end the game
  if (
    parseInt(score[activePlayer].innerText) === 100 &&
    score[activePlayer].id.includes("globalscore")
  ) {
    win(score[activePlayer].id);
    endGame = true;
    return false;
  }

  // display the selected score with a decrease or increase effect step one by one
  if (wayToCount > 0 && limitScore > 0) {
    setTimeout(() => {
      score[activePlayer].innerText =
        parseInt(score[activePlayer].innerText) + 1;
      displayScore(activePlayer, randomScore - 1, wayToCount, score);
    }, 50);
  } else if (wayToCount < 0 && randomScore > 0) {
    setTimeout(() => {
      score[activePlayer].innerText =
        parseInt(score[activePlayer].innerText) - 1;
      displayScore(activePlayer, randomScore - 1, wayToCount, score);
    }, 50);
  }
}

//-----------------------------------------------------//

function drawingDice(value, idplayer) {
  // select the canvas of the active player
  const canvas = document.querySelector(`canvas[id*=${idplayer}]`);
  const ctx = canvas.getContext("2d");
  //delete the dice
  ctx.clearRect(1, 1, 99, 99);
  ctx.strokeStyle = "black";
  ctx.strokeRect(1, 1, 99, 99);

  // coordinates of the dice points
  let x = 25;
  let y = 25;
  //space between points
  let space = 25;

  switch (value) {
    case 1:
      x = 50;
      y = 50;
      draw(x, y, ctx);
      break;

    case 2:
      y = 50;
      space = 50;
      for (let i = 0; i < value; i++) {
        draw(x, y, ctx);
        x += space;
      }
      break;

    case 3:
      for (let i = 0; i < value; i++) {
        draw(x, y, ctx);
        x += space;
        y += space;
      }
      break;

    case 4:
      space = 50;
      for (let i = 0; i < value; i++) {
        draw(x, y, ctx);
        if (i === 0) x += space;
        if (i === 1) y += space;
        if (i === 2) x -= space;
      }
      break;

    case 5:
      space = 50;
      for (let i = 0; i < value; i++) {
        draw(x, y, ctx);
        if (i === 0) x += space;
        if (i === 1) y += space;
        if (i === 2) x -= space;
        if (i === 3) x = y = space;
      }
      break;

    default:
      for (let i = 0; i < value; i++) {
        draw(x, y, ctx);
        if (i < 2) x += space;
        if (i === 2) {
          y += space * 2;
          x = 25;
        }
        if (i > 2) x += space;
      }
  }
}

//-----------------------------------//

function draw(x, y, context) {
  context.beginPath();
  context.fillStyle = "rgb(12, 128, 236)";
  context.arc(x, y, 5, 0, 2 * Math.PI);
  context.fill();
}

//-----------------------------------------//

function saveScore(idActivePlayer) {
  const allButtons = document.getElementsByTagName("button");
  let delay;
  let activePlayer;
  let nextPlayer;

  // disable all buttons click
  [...allButtons].forEach((elt) => {
    elt.disabled = "true";
  });
  // decrease the current counter score and increase the saving global score
  if (idActivePlayer.includes("one")) {
    activePlayer = 0;
    nextPlayer = 1;
    const currentScoreValue = parseInt(currentScore[0].innerText);
    displayScore(0, currentScoreValue, -1, currentScore);
    displayScore(0, currentScoreValue, 1, globalScore);
    // count the disable delay
    delay = 70 * currentScoreValue;
  } else {
    activePlayer = 1;
    nextPlayer = 0;
    const currentScoreValue = parseInt(currentScore[1].innerText);
    displayScore(1, currentScoreValue, -1, currentScore);
    displayScore(1, currentScoreValue, 1, globalScore);
    // count the disable delay
    delay = 70 * currentScoreValue;
  }

  //enable buttons click after delay
  setTimeout(() => {
    [...allButtons].forEach((elt) => {
      elt.removeAttribute("disabled");
    });
    if (endGame === false)
      applyStyleNewgame(activePlayer, nextPlayer, tabstyleElements);
  }, delay);
}

//-------------------------------------------//

//color the button when click on
function colorButton(thisElement) {
  //target the ion icon
  const icon = thisElement.childNodes[1];
  //change color
  icon.style.color = "rgb(43, 226, 141)";
  //back to the original color after delay
  setTimeout(() => {
    icon.style.color = "rgb(12, 128, 236)";
  }, 200);
}

//-------------------------------------------------//

// stop the game and give the trophy for the winner
function win(activePlayer) {
  if (activePlayer.includes("one")) {
    //target the image of the cup
    const cup = gameWin[0].childNodes[3].childNodes[0];
    console.log(cup);
    gameWin[0].classList.remove("invisible");
    cup.classList.add("animationCup");
  } else {
    //target the image of the cup
    const cup = gameWin[1].childNodes[3];
    gameWin[1].classList.remove("invisible");
    cup.classList.add("animationCup");
  }
}

//------------------------------------------------//

// function who create blur in the background and display the modal of the game rules
function gameRules(idButton) {
  const modalRules = document.querySelector(".gameModal");
  const toolbar = document.querySelector("ion-toolbar");
  const appContent = document.querySelector("ion-content");

  if (idButton === "displayRules") {
    modalRules.classList.remove("invisible");
    fadeIn(modalRules);
    toolbar.classList.add("blur");
    appContent.classList.add("blur");
  } else {
    modalRules.classList.add("invisible");
    toolbar.classList.remove("blur");
    appContent.classList.remove("blur");
  }
}

//display with a fade and slow movement the modal
function fadeIn(el){

  el.style.opacity = 0;

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (((val += 0.04) < 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

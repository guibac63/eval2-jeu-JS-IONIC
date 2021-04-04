// variable declaration
const appGame = document.querySelector("ion-grid");
const playerZone = document.getElementsByClassName("elementPlayer");
const roundPatch = document.getElementsByClassName("playerTurn");
const startGame = document.getElementsByClassName("fontPlay");
const savePoints = document.getElementsByClassName("fontSave");
const currentScoreZone = document.getElementsByClassName("currentZone");
const canvasDraw = document.getElementsByClassName("canvasDice");
//variables in a table
const tabstyleElements = [];
tabstyleElements.push(
  playerZone,
  roundPatch,
  startGame,
  savePoints,
  currentScoreZone,
  canvasDraw
);

//--------------------------------------------------------------------//

// adjustment when the game starts
function newgame() {
  // reinitialize scores to 0
  countertozero();
  //display game elements
  appGame.classList.remove("invisible");

  //random definition of first turn player
  const starterPlayer = Math.round(Math.random());
  const secondPlayer = starterPlayer > 0 ? 0 : 1;

  //change style for the player zone who is allowed to play
  applystylenewgame(starterPlayer, secondPlayer, tabstyleElements);

}

// on buttonclick "play" launch round for the selected player
function play(idActivePlayer) {
  //dice value
  let randomDice = 1 + Math.round(Math.random() * 5);
  console.log(randomDice);
  //draw the dice of the active player with his value
  drawingDice(randomDice, idActivePlayer);
  //if diceplay = 1 change round
  if(randomDice === 1){
    countertozero()
    if(idActivePlayer.includes("one")){
      setTimeout(()=>applystylenewgame(0, 1, tabstyleElements),400);
    }else{
      setTimeout(()=>applystylenewgame(1, 0, tabstyleElements),400);
    }
  }

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

  // clear the dice draw for the two players
  for(let i = 0;i< canvasDraw.length;i++){
    const ctx = canvasDraw[i].getContext("2d")
    ctx.clearRect(0, 0, 102, 102);
  }
}

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
      ctx.beginPath();
      ctx.fillStyle = "rgb(12, 128, 236)";
      ctx.arc(x * 2, y * 2, 5, 0, 2 * Math.PI);
      ctx.fill();
      break;

    case 2:
      y = 50;
      space = 50;
      for (let i = 0; i < value; i++) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(12, 128, 236)";
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        x += space;
      }
      break;

    case 3:
      for (let i = 0; i < value; i++) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(12, 128, 236)";
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        x += space;
        y += space;
      }
      break;

    case 4:
      space = 50;
      for (let i = 0; i < value; i++) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(12, 128, 236)";
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        if (i === 0) x += space;
        if (i === 1) y += space;
        if (i === 2) x -= space;
      }
      break;

    case 5:
      space = 50;
      for (let i = 0; i < value; i++) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(12, 128, 236)";
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        if (i === 0) x += space;
        if (i === 1) y += space;
        if (i === 2) x -= space;
        if (i === 3) x = y = space;
      }
      break;

    default:
      for (let i = 0; i < value; i++) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(12, 128, 236)";
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        if (i < 2) x += space;
        if (i === 2) {
          y += space *2;
          x = 25;
        }
        if (i > 2) x += space;
      }
  }
}

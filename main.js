let area = document.getElementById("area");
let cell = document.getElementsByClassName("cell");
let currentPlayer = document.getElementById("curPlayer");

let xStep = document.getElementById("xstep");
let yStep = document.getElementById("ystep");

let player = "x";
let x_step=[];
let y_step=[];

const stat = {
  x: 0,
  o: 0,
  d: 0,
};
// data 1 2 4 7
const winIndex = [
  [1, 2, 3], // winIndex[0]
  [4, 5, 6], // winIndex[1]
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

for (var i = 1; i <= 9; i++) {
  area.innerHTML += "<div class='cell' pos=" + i + "></div>";
}

for (var i = 0; i < cell.length; i++) {
  cell[i].addEventListener("click", cellClick);
}

function cellClick() {
  let data = [];

  if (!this.innerHTML) {
    this.innerHTML = player;
  } else {
    alert("Ячейка занята");
    return;
  }

  for (var i in cell) {
    if (cell[i].innerHTML == player) {
      data.push(parseInt(cell[i].getAttribute("pos")));
    }
  }

  if (player === "x"){
    x_step.push(parseInt(this.getAttribute("pos")));
  }
  else{
    y_step.push(parseInt(this.getAttribute("pos")));
  }


  if (checkWin(data)) {
    stat[player] += 1;
    console.log(x_step);
    console.log(y_step);
    xStep.innerHTML = "Шаги игрока X: " + x_step.join(" ");
    yStep.innerHTML = "Шаги игрока Y: " + y_step.join(" ");
    restart("Выграл: " + player);
  } else {
    var draw = true;
    for (var i in cell) {
      if (cell[i].innerHTML == "") draw = false;
    }
    if (draw) {
      stat.d += 1;
      restart("Ничья");
    }
  }

  player = player == "x" ? "o" : "x";
  currentPlayer.innerHTML = player.toUpperCase();
}

function checkWin(data) {
  for (var i in winIndex) {
    var win = true;
    for (var j in winIndex[i]) {
      var id = winIndex[i][j];
      var ind = data.indexOf(id);

      if (ind == -1) {
        win = false;
      }
    }

    if (win) return true;
  }
  return false;
}

function restart(text) {
  alert(text);
  x_step = [];
  y_step = [];
  for (var i = 0; i < cell.length; i++) {
    cell[i].innerHTML = "";
  }
  unstart();
}
function unstart() {
  document.getElementById("sX").innerHTML = stat["x"];
  document.getElementById("sO").innerHTML = stat['o'];
  document.getElementById("sD").innerHTML = stat.d;
}

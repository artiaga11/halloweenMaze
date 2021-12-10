const map = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "W   W     WD    WDWDW",
  "W W W WWW WWWWW W W W",
  "W WDW  DW    DW W   W",
  "W WWWWWWW W WWW W W W",
  "W         W     W W W",
  "W WWW WWWWW WWWWW W W",
  "W WD  W   W W     W W",
  "W WWWWW W W W WWW W F",
  "S     W W W W W W WWW",
  "WWWWW W W W W W W WDW",
  "W     W W W   W W W W",
  "W WWWWWWW WWWWW W W W",
  "W      DW       W   W",
  "WWWWWWWWWWWWWWWWWWWWW",
];

let playerPosition = {
  row: 9,
  col: 0,
};

let player = document.getElementById("player");

function cellId(row, col) {
  return "cell-" + row + "-" + col;
}

function createMaze(map) {
  const mazeDiv = document.querySelector("#maze");
  for (i = 0; i < map.length; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (j = 0; j < map[i].length; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      if (map[i][j] === "W") {
        cell.classList.add("wall");
      } else if (map[i][j] === " ") {
        cell.classList.add("floor");
      } else if (map[i][j] === "S") {
        cell.classList.add("start");
        cell.appendChild(player);
      } else if (map[i][j] === "F") {
        cell.classList.add("finish");
      } else if (map[i][j] === "D") {
        cell.classList.add("deadend");
      }
      cell.id = cellId(i, j);
      row.appendChild(cell);
    }
    mazeDiv.appendChild(row);
  }
  return mazeDiv;
}
createMaze(map);

function mazeMessages() {
  if (map[playerPosition.row][playerPosition.col] === "F") {
    let winMsg = document.getElementById("message");
    winMsg.innerHTML = "Whew 😅, the ghouls almost got you!";
  } else if (map[playerPosition.row][playerPosition.col] === "D") {
    let winMsg = document.getElementById("message");
    winMsg.innerHTML = "DEADEND ☠️ Quick, make a u-turn!";
  } else {
    let winMsg = document.getElementById("message");
    winMsg.innerHTML = '"Run Forest, RUN!"';
  }
}

document.addEventListener("keydown", function (evt) {
  switch (evt.key) {
    case "ArrowDown":
      if (
        map[playerPosition.row + 1][playerPosition.col] !== "W" &&
        playerPosition.row + 1 < map[0].length
      ) {
        playerPosition.row += 1;
        let playerDown = document.getElementById(
          `cell-${playerPosition.row}-${playerPosition.col}`
        );
        playerDown.appendChild(player);
      }
      break;
    case "ArrowUp":
      if (
        map[playerPosition.row - 1][playerPosition.col] !== "W" &&
        playerPosition.row - 1 < map[0].length
      ) {
        playerPosition.row -= 1;
        let playerUp = document.getElementById(
          `cell-${playerPosition.row}-${playerPosition.col}`
        );
        playerUp.appendChild(player);
      }
      break;
    case "ArrowLeft":
      if (
        map[playerPosition.row][playerPosition.col - 1] !== "W" &&
        playerPosition.col - 1 < map[0].length
      ) {
        playerPosition.col -= 1;
        let playerLeft = document.getElementById(
          `cell-${playerPosition.row}-${playerPosition.col}`
        );
        playerLeft.appendChild(player);
      }
      break;
    case "ArrowRight":
      if (
        map[playerPosition.row][playerPosition.col + 1] !== "W" &&
        playerPosition.col + 1 < map[0].length
      ) {
        playerPosition.col += 1;
        let playerRight = document.getElementById(
          `cell-${playerPosition.row}-${playerPosition.col}`
        );
        playerRight.appendChild(player);
      }
      break;
  }
  mazeMessages();
});

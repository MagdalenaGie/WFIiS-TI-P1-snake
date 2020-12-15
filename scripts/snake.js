var ctx;
var canvas;
var direction = "right";
var score;
var body;
var food;
var pos;
var play = false;

var btnPlay = "Play";
var prtScore;

var idInterval;

//inicjalizacja gry po załadowaniu strony
window.addEventListener("load", () => {
  init();
});

//inicjalizacja - tworzenie początkowego stanu gry
function init() {
  btnPlay = document.getElementById("startBtn");
  prtScore = document.getElementById("printScore");
  btnPlay.innerText = "Play";
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  direction = "right";
  score = 0;
  body = [
    { x: 40, y: 40 },
    { x: 60, y: 40 },
    { x: 80, y: 40 },
  ];

  makeFood();
}

//rozpoczęcie gry, początek animacji, wywoływane za pomocą przycisku "Play" jako event onClick
function startGame() {
  if (!play) {
    idInterval = setInterval(animate, 222);
    play = !play;
    btnPlay.innerText = "Pause";
  } else {
    play = !play;
    clearInterval(idInterval);
    btnPlay.innerText = "Resume";
  }
}

//event listener, obsługuje sterowanie wężem
document.addEventListener("keydown", function (e) {
  var key = e.keyCode;
  if (key == 37 && direction != "right") {
    direction = "left";
  } else if (key == 38 && direction != "down") {
    direction = "up";
  } else if (key == 39 && direction != "left") {
    direction = "right";
  } else if (key == 40 && direction != "up") {
    direction = "down";
  }
});

//losowanie pozycji pożywienia
function makeFood() {
  pos = {
    x: Math.floor(Math.random() * 24),
    y: Math.floor(Math.random() * 14),
  };
}

//ruch węża, obsługa jedzdenia, zdobywania punktów, "śmierci"
function animate() {
  ctx.clearRect(0, 0, 500, 300);
  body.shift();
  eat();

  ctx.fillStyle = "yellow";
  for (var i = 0; i < body.length; i++) {
    var glowa = body[body.length - 1];
    piece = body[i];
    if (piece.x > 480) {
      piece.x = 0;
    } else if (piece.x < 0) {
      piece.x = 480;
    } else if (piece.y > 280) {
      piece.y = 0;
    } else if (piece.y < 0) {
      piece.y = 280;
    }
    if (i < body.length - 2 && piece.x == glowa.x && piece.y == glowa.y) {
      alert("Game over! Your score: " + score);
      init();
    }

    var head = body[body.length - 1];
    if (head.x == pos.x * 20 && head.y == pos.y * 20) {
      score += 5;
      prtScore.innerText = "Wynik: " + score;
      eat();
      makeFood();
    }

    ctx.fillRect(piece.x, piece.y, 19, 19);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(pos.x * 20, pos.y * 20, 19, 19);
}

//obsługa dodania nowego elementu do węża po tym jak coś zje
function eat() {
  var head = body[body.length - 1]; //its actually a butt, but works like a head
  if (direction == "right") {
    body.push({ x: head.x + 20, y: head.y });
  } else if (direction == "down") {
    body.push({ x: head.x, y: head.y + 20 });
  } else if (direction == "left") {
    body.push({ x: head.x - 20, y: head.y });
  } else if (direction == "up") {
    body.push({ x: head.x, y: head.y - 20 });
  }
}

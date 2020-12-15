var worker;
var unit = "empty";

function getSelect() {
  var choice = document.getElementById("jednostka");
  unit = choice.value;

  choice.addEventListener("change", (event) => {
    unit = choice.value;
  });
}

function startWorker() {
  getSelect();

  worker = new Worker("../scripts/worker.js");
  worker.postMessage(unit);
  worker.onmessage = function (event) {
    document.getElementById("result").innerHTML = event.data;
  };
}

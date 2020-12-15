var announcementDate = new Date("1997-12-18");
var todayDate = new Date();

var uni = "dzien";

self.addEventListener(
  "message",
  function (e) {
    uni = e.data;
    calculateTime();
  },
  false
);

function calculateTime() {
  var diffTime = todayDate.getTime() - announcementDate.getTime();
  var odpowiedz = "Gra snake została ogłoszona ";
  if (uni == "dzien") {
    var diffDays = diffTime / (1000 * 3600 * 24);
    odpowiedz += Math.round(diffDays) + " dni temu";
  } else if (uni == "rok") {
    var diffDays = diffTime / (1000 * 3600 * 24 * 365);
    odpowiedz += Math.round(diffDays) + " lat temu";
  } else if (uni == "godzina") {
    var diffDays = diffTime / (1000 * 3600);
    odpowiedz += Math.round(diffDays) + " godzin temu";
  }
  postMessage(odpowiedz);
}

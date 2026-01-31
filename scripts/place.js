document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

function calculateWindChill(temp, speed) {
  return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16)
         + 0.3965 * temp * Math.pow(speed, 0.16);
}

const temp = 18;
const speed = 10;

let chill = "N/A";

if (temp <= 10 && speed > 4.8) {
  chill = calculateWindChill(temp, speed).toFixed(1);
}

document.getElementById("windchill").textContent = chill;

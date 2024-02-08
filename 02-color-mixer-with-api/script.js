/* Eine Funktion, die drei Range-Inputs verarbeitet, die Werte von 0 bis 255 ausgeben um 
Farben in RGB zu bestimmen, die so den main-background verändern. Zusätzlich soll die 
jeweils angezeigte Farbe in einen Hex-Wert umgerechnet und als String im Header angezeigt 
werden. */

const red = document.getElementById("red");
const blue = document.getElementById("blue");
const green = document.getElementById("green");
const main = document.querySelector("main");
const hex = document.getElementById("hex");
const rndHexBtn = document.getElementById("randomHex");

// Initial state
let state = {
  redRGB: 255,
  greenRGB: 105,
  blueRGB: 180,
};

// Render function
function render() {
  // Update CSS Variablen
  main.style.setProperty("--r", state.redRGB);
  main.style.setProperty("--g", state.greenRGB);
  main.style.setProperty("--b", state.blueRGB);

  // Update Input Elemente
  red.value = state.redRGB;
  green.value = state.greenRGB;
  blue.value = state.blueRGB;

  // Berechnung vom Hex-Wert
  const hexR = state.redRGB.toString(16).padStart(2, "0");
  const hexG = state.greenRGB.toString(16).padStart(2, "0");
  const hexB = state.blueRGB.toString(16).padStart(2, "0");
  const hexColor = `#${hexR}${hexG}${hexB}`;

  // Update vom text content des hex-elementes
  hex.textContent = hexColor;
}

//Action function
function hexToRgb(hex) {
  // # entfernen
  hex = hex.replace(/^#/, "");

  // Den Hexadezimal-Wert in seine Einzelteile zerlegen und auf die RGB-Werte verteilen
  const bigint = parseInt(hex, 16);
  state.redRGB = (bigint >> 16) & 255;
  state.greenRGB = (bigint >> 8) & 255;
  state.blueRGB = bigint & 255;

  // Render
  return render();
}

// Event listeners
red.addEventListener("change", function () {
  state.redRGB = parseInt(red.value);
  render();
});

green.addEventListener("change", function () {
  state.greenRGB = parseInt(green.value);
  render();
});

blue.addEventListener("change", function () {
  state.blueRGB = parseInt(blue.value);
  render();
});

rndHexBtn.addEventListener("click", function () {
  fetch("https://dummy-apis.netlify.app/api/color")
    .then((response) => response.json())
    .then((data) => {
      const hexColorRnd = data.color;
      hexToRgb(hexColorRnd);
    })
    .catch((error) => console.log(error));
  render();
});

// Initial render
render();

/* Eine Funktion, die drei Range-Inputs verarbeitet, die Werte von 0 bis 255 ausgeben um 
Farben in RGB zu bestimmen, die so den main-background verändern. Zusätzlich soll die 
jeweils angezeigte Farbe in einen Hex-Wert umgerechnet und als String im Header angezeigt 
werden. */

const red = document.getElementById("red");
const blue = document.getElementById("blue");
const green = document.getElementById("green");
const main = document.querySelector("main");
const hex = document.getElementById("hex");

// Initial state
let state = {
  redRGB: 255,
  greenRGB: 105,
  blueRGB: 180,
};

// Render function
function render() {
  // Update CSS variables
  main.style.setProperty("--r", state.redRGB);
  main.style.setProperty("--g", state.greenRGB);
  main.style.setProperty("--b", state.blueRGB);

  // Update Input Elements
  red.value = state.redRGB;
  green.value = state.greenRGB;
  blue.value = state.blueRGB;

  // Calculate and update hexColor
  const hexR = state.redRGB.toString(16).padStart(2, "0");
  const hexG = state.greenRGB.toString(16).padStart(2, "0");
  const hexB = state.blueRGB.toString(16).padStart(2, "0");
  const hexColor = `#${hexR}${hexG}${hexB}`;

  // Update the text content of the hex element
  hex.textContent = hexColor;
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

// Initial render
render();

//Quote App

//Variablen
const quoteBtn = document.getElementById("get-quote");
const quote = document.getElementById("quote");
const author = document.getElementById("author");

//Initial State
let state = {
  quote: "Dies das Ananas",
  author: "Paulo Coelho",
};

//Render function
function render() {
  quote.innerText = state.quote;
  author.innerText = `- ${state.author}`;
}

//Eventlistener
quoteBtn.addEventListener("click", function loadQuote() {
  fetch("https://dummy-apis.netlify.app/api/quote")
    .then((response) => response.json())
    .then((data) => {
      state.quote = data.quote;
      state.author = data.author;
    })
    .catch((error) => {
      console.log(error);
    });
  render();
});

//Initial render call
render();

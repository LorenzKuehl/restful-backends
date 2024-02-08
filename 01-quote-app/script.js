const quoteBtn = document.getElementById("get-quote");
const quote = document.getElementById("quote");
const author = document.getElementById("author");

quoteBtn.addEventListener("click", function loadQuote() {
  fetch("https://dummy-apis.netlify.app/api/quote")
    .then((response) => response.json())
    .then((data) => {
      quote.textContent = data.quote;
      author.textContent = `- ${data.author}`;
    });
});

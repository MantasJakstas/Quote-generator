"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];
loader.hidden = true;
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    authorText.textContent = "Unkown";
  } else authorText.textContent = quote.author;
  //Check if text lenght if long
  if (quote.text.length > 130) {
    quoteText.classList.add("long-quote");
  } else quoteText.classList.remove("long-quote");
  quoteText.textContent = quote.text;
  complete();
}
async function getQuotes() {
  loading();
  const url = "https://type.fit/api/quotes";
  try {
    const response = await fetch(url);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert("Something went wrong!");
  }
}
getQuotes();
newQuoteBtn.addEventListener("click", newQuote);
//getQuotes();

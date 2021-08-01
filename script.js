const quoteContainer = document.getElementById("quote-container-id"),
      quoteText = document.getElementById("quote"),
      authorText = document.getElementById("author"),
      twitterBtn = document.getElementById("twitter"),
      newQuoteBtn = document.getElementById("new-quote"),
      loader = document.getElementById("loader");

let apiQuotes = [];

//Show loading
function loading () {
  loader.hidden = false;
  quoteContainer.hidden = true;  
}

//Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote
function newQuote () {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   
    //Check if the Author is unknow persone
    if (!quote.author) {
        authorText.textContent = 'Unknow';
    } else {
        authorText.textContent = quote.author;
    }
    //Check quote lenght
    if (quote.text.length > 90) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //set qoute, hide
    quoteText.textContent = quote.text;
    complete();
}

//Get Quotes from API 
async function getQuotes () {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        
    } catch (error) {
        //Catch error here
    }
}

//Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On load
getQuotes();




//Show new LOCAL quote from quotes.js
// function newQuote () {
//     //Pick a random quote from apiQuotes array, max 1643
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }

// newQuote();
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [bookmarkedQuotes, setBookmarkedQuotes] = useState([]);

  useEffect(() => {
    fetch("http://api.quotable.io/random")
      .then(res => res.json())
      .then(quote => {
        setQuote(quote.content);
        setAuthor(quote.author);
      });
  }, []);

  const fetchNewQuote = () => {
    fetch("http://api.quotable.io/random")
      .then(res => res.json())
      .then(quote => {
        setQuote(quote.content);
        setAuthor(quote.author);
      });
  };

  const toggleBookmark = () => {
    const isBookmarked = bookmarkedQuotes.some(
      bookmarked => bookmarked.quote === quote
    );

    if (isBookmarked) {
      // Remove the quote from bookmarks
      setBookmarkedQuotes(bookmarkedQuotes.filter(b => b.quote !== quote));
    } else {
      // Add the quote to bookmarks
      setBookmarkedQuotes([...bookmarkedQuotes, { quote, author }]);
    }
  };

  const isBookmarked = bookmarkedQuotes.some(
    bookmarked => bookmarked.quote === quote
  );

  return (
    <div className="App">
      <div className="quote">
        <h2>{quote}</h2>
        <small>-{author}-</small>
      </div>
      <button className="btn" onClick={fetchNewQuote}>New Quote</button>
      <div className="bookmark" onClick={toggleBookmark}>
        {isBookmarked ? (
          <span role="img" aria-label="bookmark">📚</span>
        ) : (
          <span role="img" aria-label="bookmark">🔖</span>
        )}
      </div>

      <div className="bookmarks">
        <h3>Bookmarked Quotes</h3>
        <ul>
          {bookmarkedQuotes.map((bookmarkedQuote, index) => (
            <li key={index}>
              <blockquote>{bookmarkedQuote.quote}</blockquote>
              <small>-{bookmarkedQuote.author}-</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

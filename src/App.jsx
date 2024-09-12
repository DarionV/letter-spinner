import { useState } from "react";
import "./App.css";
import "./index.css";

function App({ letters }) {
  const [currentLetter, setCurrentLetter] = useState("?");

  function getRandomLetter() {
    const randomIndex = Math.floor(Math.random() * letters.length);
    setCurrentLetter(letters[randomIndex]);
  }

  return (
    <>
      <nav className="padding-medium">
        <button>Audio</button>
        <button>Settings</button>
      </nav>
      <main>
        <div className="title-container">
          <h1 className="padding-large">Letter spinner</h1>
        </div>
        <div className="letter-container padding-large flex-center">
          {currentLetter}
        </div>
        <div className="timer-container flex-center padding-large">00:00</div>
        <div className="controls-container flex-center padding-medium">
          <button onClick={getRandomLetter}>Play</button>
        </div>
      </main>
      <footer>Credits</footer>
    </>
  );
}

export default App;

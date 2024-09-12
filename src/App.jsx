import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";

function App({ letters }) {
  const NR_OF_SPINS = 5;
  const SPIN_SPEED_IN_MS = 100;

  const [currentLetter, setCurrentLetter] = useState("?");
  const [isSpinning, setSpinning] = useState(false);

  useEffect(() => {
    console.log(currentLetter);
  }, [currentLetter]);

  useEffect(() => {
    console.log(isSpinning);
  }, [isSpinning]);

  function getRandomLetter() {
    let randomIndex = Math.floor(Math.random() * letters.length);
    setCurrentLetter(letters[randomIndex]);
  }

  function spinLetters() {
    if (isSpinning) return;
    setSpinning(true);
    for (let i = 1; i <= NR_OF_SPINS; i++) {
      setTimeout(() => {
        getRandomLetter();
        if (i === NR_OF_SPINS) {
          setSpinning(false);
        }
      }, i * SPIN_SPEED_IN_MS);
    }
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
          <button onClick={spinLetters}>Play</button>
        </div>
      </main>
      <footer>Credits</footer>
    </>
  );
}

export default App;

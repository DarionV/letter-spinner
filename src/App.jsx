import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";

function App(props) {
  const NR_OF_SPINS = 40;
  const SPIN_SPEED_IN_MS = 100;

  const [currentLetter, setCurrentLetter] = useState("?");
  const [isSpinning, setSpinning] = useState(false);
  const [shouldSpin, setShouldSpin] = useState(false);
  const [letters, setLetters] = useState(props.letters);

  let controlButton = isSpinning ? (
    ""
  ) : (
    <button onClick={spinLetters}>Play</button>
  );

  useEffect(() => {
    console.log(currentLetter);
  }, [currentLetter]);

  // useEffect(() => {
  //   console.log(isSpinning);
  // }, [isSpinning]);

  useEffect(() => {
    console.log(letters);
  }, [letters]);

  function scrambleLetters() {
    let scrambledLetters = [...letters].sort(() => {
      return Math.random() - 0.5;
    });
    setLetters(scrambledLetters);
    setShouldSpin(true);
  }

  function spinLetters() {
    if (isSpinning) return;
    setSpinning(true);
    scrambleLetters();
  }

  useEffect(() => {
    if (!shouldSpin) return;

    for (let i = 0; i < NR_OF_SPINS; i++) {
      setTimeout(() => {
        if (i >= letters.length) setCurrentLetter(letters[i - letters.length]);
        else setCurrentLetter(letters[i]);
        if (i === NR_OF_SPINS - 1) {
          setSpinning(false);
          setShouldSpin(false);
        }
      }, i * SPIN_SPEED_IN_MS);
    }
  }, [shouldSpin, letters]);

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
          {controlButton}
        </div>
      </main>
      <footer>Credits</footer>
    </>
  );
}

export default App;

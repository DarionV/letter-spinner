import { useState, useEffect, useCallback, memo } from "react";
import "./App.css";
import "./index.css";
import SplitFlap from "./components/SplitFlap";
import flap_01 from "./audio/flap_02.mp3";
import { scrambleLetters } from "./utils";

const App = memo(function App(props) {
  const [isFlipping, setFlipping] = useState(false);
  const [isCountingDown, setCountingDown] = useState(false);
  // const [isPaused, setPaused] = useState(false);
  const [shouldFlip, setShouldFlip] = useState(false);
  const [letter, setLetter] = useState("?");
  const FLIP_SPEED_IN_MS = 165;
  let letters = scrambleLetters(props.letters);

  const audio_flap_01 = new Audio(flap_01);

  const NR_OF_FLIPS = 20;

  let controlButton;

  if (isCountingDown) {
    controlButton = <button onClick={reset}>Stop</button>;
  } else if (isFlipping) {
    controlButton = null;
  } else if (!isCountingDown && !isFlipping) {
    controlButton = (
      <button onClick={startFlip}>
        <img src="/images/play.svg" alt="" height={"42px"} />
      </button>
    );
  }

  function startFlip() {
    setShouldFlip(true);
    audio_flap_01.play();
  }

  useEffect(() => {
    if (!shouldFlip) return;
    letters = scrambleLetters(letters);
    setFlipping(true);

    for (let i = 0; i < NR_OF_FLIPS; i++) {
      setTimeout(() => {
        if (i >= letters.length) setLetter(letters[i - letters.length]);
        else setLetter(letters[i]);
        if (i === NR_OF_FLIPS - 1) {
          setShouldFlip(false);
          // Add small delay before showing the playbutton again
          setTimeout(() => {
            setFlipping(false);
          }, 400);
        }
      }, i * FLIP_SPEED_IN_MS);
    }
  }, [shouldFlip]);

  return (
    <>
      <div className="noise"></div>
      {/* <nav className="padding-medium">
        <button>Audio</button>
        <button>Settings</button>
      </nav> */}
      <main>
        <div className="title-container">
          <h1 className="padding-large">Letter Flipper</h1>
        </div>
        <div className="separator"></div>
        <div className="padding-xlarge flex-center">
          <SplitFlap
            character={letter}
            initialCharacter={letter}
            flipSpeed={FLIP_SPEED_IN_MS}
          />
        </div>
        <div className="separator"></div>
        <div className="controls-container flex-center padding-large">
          {controlButton}
        </div>
      </main>
      <footer>Created by Darion Valdez</footer>
    </>
  );
});

export default App;

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import "./App.css";
import "./index.css";
import Timer from "./components/Timer";
import SplitFlap from "./components/SplitFlap";
import flap_01 from "./audio/flap_01.mp3";

const App = memo(function App(props) {
  const [isFlipping, setFlipping] = useState(false);
  const [requestStart, setRequestStart] = useState(false);
  const [isCountingDown, setCountingDown] = useState(false);
  // const [time, setTime] = useState({ minutes: 2, seconds: 5 });
  const [isPaused, setPaused] = useState(false);
  const [shouldFlip, setShouldFlip] = useState(false);
  const [letter, setLetter] = useState("?");
  const [letters, setLetters] = useState(scrambleLetters(props.letters));
  const FLIP_SPEED_IN_MS = 165;
  const [speed, setSpeed] = useState(FLIP_SPEED_IN_MS);

  const time = useMemo(() => ({ minutes: 2, seconds: 5 }), []);

  const audio_flap_01 = new Audio(flap_01);

  const NR_OF_FLIPS = 20;

  let timerActive = true;
  let controlButton = "";

  if (isPaused) {
    controlButton = <button onClick={togglePause}>Continue</button>;
  } else if (isCountingDown) {
    controlButton = <button onClick={togglePause}>Pause</button>;
  } else if (!isCountingDown && !isFlipping) {
    controlButton = (
      <button onClick={startFlip}>
        <img src="/images/play.svg" alt="" height={"42px"} />
      </button>
    );
  } else {
    controlButton = "";
  }

  function startFlip() {
    setSpeed(FLIP_SPEED_IN_MS);
    setShouldFlip(true);
    audio_flap_01.play();
  }

  const toggleCountingDown = useCallback(() => {
    setCountingDown(!isCountingDown);
  }, []);

  function togglePause() {
    setPaused(!isPaused);
  }

  function scrambleLetters(array) {
    let scrambledLetters = [...array].sort(() => {
      return Math.random() - 0.5;
    });
    return scrambledLetters;
  }

  useEffect(() => {
    if (!shouldFlip) return;
    setLetters(scrambleLetters(letters));
    setFlipping(true);
    setSpeed(FLIP_SPEED_IN_MS);
    const speedDecreaseFactor = 1;

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
        // Decrease speed exponentially
        // setSpeed(speed + Math.pow(i, speedDecreaseFactor));
        // }, i * (speed + Math.pow(i, speedDecreaseFactor)));
      }, i * speed);
    }
  }, [shouldFlip]);

  return (
    <>
      <div className="noise"></div>
      <nav className="padding-medium">
        <button>Audio</button>
        <button>Settings</button>
      </nav>
      <main>
        <div className="title-container">
          <h1 className="padding-small">Letter Flipper</h1>
          {/* isPaused: {isPaused.toString()}
          CountingDown: {isCountingDown.toString()} */}
          isFlipping: {isFlipping.toString()}
        </div>
        <div className="separator"></div>
        <div className="padding-large flex-center">
          <SplitFlap
            character={letter}
            initialCharacter={letter}
            flipSpeed={speed}
          />
        </div>
        <div className="separator"></div>

        <div className="flex-center padding-large">
          <Timer
            // requestStart={requestStart}
            isFlipping={isFlipping}
            toggleCountingDown={toggleCountingDown}
            initialTime={time}
            isPaused={isPaused}
          />
        </div>
        <div className="controls-container flex-center padding-small">
          {controlButton}
        </div>
      </main>
      <footer>Credits</footer>
    </>
  );
});

export default App;

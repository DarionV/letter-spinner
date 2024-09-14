import { useState } from "react";
import "./App.css";
import "./index.css";
import Timer from "./components/Timer";
import Letter from "./components/Letter";

function App(props) {
  const [isFlipping, setFlipping] = useState(false);
  const [requestFlip, setRequestFlip] = useState(false);
  const [isCountingDown, setCountingDown] = useState(false);
  const [time, setTime] = useState({ minutes: 0, seconds: 5 });
  const [isPaused, setPaused] = useState(false);

  let timerActive = true;
  let controlButton = "";

  if (isPaused) {
    controlButton = <button onClick={togglePause}>Continue</button>;
  } else if (isCountingDown) {
    controlButton = <button onClick={togglePause}>Pause</button>;
  } else if (!isCountingDown && !isFlipping) {
    controlButton = <button onClick={toggleRequestFlip}>Play</button>;
  } else {
    controlButton = "";
  }

  function toggleFlipping() {
    setFlipping(!isFlipping);
  }

  function toggleRequestFlip() {
    setRequestFlip(!requestFlip);
  }

  function toggleCountingDown() {
    setCountingDown(!isCountingDown);
  }

  function togglePause() {
    setPaused(!isPaused);
  }

  return (
    <>
      <div className="noise"></div>
      <nav className="padding-medium">
        <button>Audio</button>
        <button>Settings</button>
      </nav>
      <main>
        <div className="title-container">
          <h1 className="padding-large">Letter Flipper</h1>
          isPaused: {isPaused.toString()}
          CountingDown: {isCountingDown.toString()}
        </div>
        <div className="padding-large flex-center">
          <Letter
            letters={props.letters}
            requestFlip={requestFlip}
            toggleFlipping={toggleFlipping}
            toggleRequestFlip={toggleRequestFlip}
          />
        </div>

        {/* <div className="timer-container flex-center padding-large">
          <Timer
            isFlipping={isFlipping}
            toggleCountingDown={toggleCountingDown}
            initialTime={time}
            isPaused={isPaused}
          />
        </div> */}
        <div className="controls-container flex-center padding-medium">
          {controlButton}
        </div>
      </main>
      <footer>Credits</footer>
    </>
  );
}

export default App;

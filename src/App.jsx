import { useState } from "react";
import "./App.css";
import "./index.css";
import Timer from "./components/Timer";
import Letter from "./components/Letter";

function App(props) {
  const [isFlipping, setFlipping] = useState(false);
  const [requestFlip, setRequestFlip] = useState(false);

  // const [isCountingDown, setCountingDown] = useState(false);

  let controlButton = isFlipping ? (
    ""
  ) : (
    <button onClick={toggleRequestFlip}>Play</button>
  );

  function toggleFlipping() {
    setFlipping(!isFlipping);
  }

  function toggleRequestFlip() {
    setRequestFlip(!requestFlip);
  }

  return (
    <>
      <nav className="padding-medium">
        <button>Audio</button>
        <button>Settings</button>
      </nav>
      <main>
        <div className="title-container">
          <h1 className="padding-large">Letter Flipper</h1>
        </div>
        <div className="letter-container padding-large flex-center">
          <Letter
            letters={props.letters}
            requestFlip={requestFlip}
            toggleFlipping={toggleFlipping}
            toggleRequestFlip={toggleRequestFlip}
          />
        </div>
        <div className="timer-container flex-center padding-large">
          <Timer isFlipping={isFlipping} />
        </div>
        <div className="controls-container flex-center padding-medium">
          {controlButton}
        </div>
      </main>
      <footer>Credits</footer>
    </>
  );
}

export default App;

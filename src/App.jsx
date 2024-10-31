import { useCallback, memo } from "react";
import "./App.css";
import "./index.css";
import SplitFlap from "./components/SplitFlap";
import flap_01 from "./audio/flap_02.mp3";
import { scrambleLetters } from "./utils";
import { useFlipper } from "./useFlipper";
import { useAudio } from "./useAudio";
import ControlButton from "./components/ControlButton";

const App = memo(function App(props) {
  const FLIP_SPEED_IN_MS = 165;
  const NR_OF_FLIPS = 20;
  const playAudio = useAudio(flap_01);
  let letters = scrambleLetters(props.letters);

  const { isFlipping, letter, startFlip } = useFlipper(
    letters,
    FLIP_SPEED_IN_MS,
    NR_OF_FLIPS
  );

  const handleStartFlip = useCallback(() => {
    startFlip();
    playAudio();
  }, [startFlip, playAudio]);

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
          <ControlButton startFlip={handleStartFlip} />
        </div>
      </main>
      <footer>Created by Darion Valdez</footer>
    </>
  );
});

export default App;

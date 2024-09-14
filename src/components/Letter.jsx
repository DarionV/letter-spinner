import { useEffect, useState } from "react";

function Letter(props) {
  const [letters, setLetters] = useState(props.letters);
  const [currentLetter, setCurrentLetter] = useState("?");
  const [shouldFlip, setShouldFlip] = useState(false);

  const NR_OF_FLIPS = 20;
  const FLIP_DELAY_IN_MS = 100;

  useEffect(() => {
    if (!props.requestFlip) return;
    flipLetters();
    props.toggleRequestFlip();
  }, [props.requestFlip]);

  useEffect(() => {
    if (!shouldFlip) return;

    for (let i = 0; i < NR_OF_FLIPS; i++) {
      setTimeout(() => {
        if (i >= letters.length) setCurrentLetter(letters[i - letters.length]);
        else setCurrentLetter(letters[i]);
        if (i === NR_OF_FLIPS - 1) {
          props.toggleFlipping();
          setShouldFlip(false);
          //   setCountingDown(true);
        }
      }, i * FLIP_DELAY_IN_MS);
    }
  }, [props.shouldFlip, letters]);

  function scrambleLetters() {
    let scrambledLetters = [...letters].sort(() => {
      return Math.random() - 0.5;
    });
    setLetters(scrambledLetters);
    setShouldFlip(true);
  }

  function flipLetters() {
    props.toggleFlipping();
    scrambleLetters();
  }

  return (
    <>
      <div className="unit-frame">
        <img src="images/unit-container.svg" height="250px" alt="" />
        <div className="unit-container">
          <div className="wheel"></div>
          <div className="letter-frame flex-center">
            <div className="upper-flap-container">
              <div className="upper-flap flex-center">{currentLetter}</div>
            </div>
            <div className="lower-flap-container">
              <div className="lower-flap flex-center flipped-0">
                {currentLetter}
              </div>
              <div className="lower-flap flipped-1"></div>
              <div className="lower-flap flipped-2"></div>
              <div className="lower-flap flipped-3"></div>
              <div className="lower-flap flipped-4"></div>
              <div className="lower-flap flipped-5"></div>
            </div>
          </div>
          <div className="wheel"></div>
        </div>
      </div>
    </>
  );
}

export default Letter;

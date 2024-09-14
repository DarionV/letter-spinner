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

  return <>{currentLetter}</>;
}

export default Letter;

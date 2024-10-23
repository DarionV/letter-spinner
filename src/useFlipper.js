import { useCallback, useState, useEffect } from "react";
import { scrambleLetters } from "./utils";

export function useFlipper(letters, flipSpeed, nrOfFlips) {
  const [isFlipping, setFlipping] = useState(false);
  const [shouldFlip, setShouldFlip] = useState(false);
  const [letter, setLetter] = useState("?");

  const startFlip = useCallback(() => {
    setShouldFlip(true);
  }, []);

  useEffect(() => {
    if (!shouldFlip) return;
    letters = scrambleLetters(letters);
    setFlipping(true);

    for (let i = 0; i < nrOfFlips; i++) {
      setTimeout(() => {
        if (i >= letters.length) setLetter(letters[i - letters.length]);
        else setLetter(letters[i]);
        if (i === nrOfFlips - 1) {
          setShouldFlip(false);
          // Add small delay before showing the playbutton again
          setTimeout(() => {
            setFlipping(false);
          }, 400);
        }
      }, i * flipSpeed);
    }
  }, [shouldFlip]);

  return { isFlipping, letter, startFlip };
}

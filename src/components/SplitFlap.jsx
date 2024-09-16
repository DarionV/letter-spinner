import { useEffect, useState } from "react";

function SplitFlap({ character, initialCharacter, flipSpeed }) {
  const [newCharacter, setNewCharacter] = useState(initialCharacter);
  //   const [character, setCharacter] = useState("");
  const [prevCharacter, setPrevCharacter] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  //   const [currentLetter, setCurrentLetter] = useState("?");

  //   const FLIP_SPEED_IN_MS = 500;

  const upperFlapFlipNextClass = isFlipping ? "upper-flap-flip-next" : "";
  const upperFlapFlipClass = isFlipping ? "upper-flap-flip" : "";
  const lowerFlapFlipClass = isFlipping ? "lower-flap-flip" : "";
  const lowerFlapFlipNextClass = isFlipping ? "lower-flap-flip-next" : "";
  const lowerFlapFlipBackClass = isFlipping ? "lower-flap-flip-back" : "";
  const wheelFlipClass = isFlipping ? "wheel-flip" : "";

  useEffect(() => {
    flip();
  }, [character]);

  //   function flipLetters() {
  //     props.toggleFlipping();
  //     scrambleLetters();
  //   }

  function flip() {
    setIsFlipping(true);
    setNewCharacter(character);
    setTimeout(() => {
      setIsFlipping(false);
      setPrevCharacter(character);
    }, flipSpeed - 100);
  }

  return (
    <>
      <div className="unit-frame">
        <img src="images/unit-container.svg" height="250px" alt="" />
        <div className="unit-container">
          <div
            className={`wheel ${wheelFlipClass}`}
            style={{ animationDuration: `${flipSpeed}ms` }}
          ></div>
          <div className="letter-frame flex-center">
            <div className="upper-flap-container">
              <div
                className={`upper-flap ${upperFlapFlipNextClass}`}
                style={{ animationDuration: `${flipSpeed}ms` }}
              >
                <div>{newCharacter.toUpperCase()}</div>
              </div>
              <div
                className={`upper-flap ${upperFlapFlipClass}`}
                style={{ animationDuration: `${flipSpeed}ms` }}
              >
                <div>{prevCharacter.toUpperCase()}</div>
              </div>
            </div>
            <div className="lower-flap-container">
              <div
                className={`lower-flap  ${lowerFlapFlipNextClass}`}
                style={{ animationDuration: `${flipSpeed}ms` }}
              >
                <div>{newCharacter.toUpperCase()}</div>
              </div>
              <div
                className={`lower-flap flipped-0 ${lowerFlapFlipClass}`}
                style={{ animationDuration: `${flipSpeed}ms` }}
              >
                <div>{prevCharacter.toUpperCase()}</div>
              </div>
              <div
                className={lowerFlapFlipBackClass}
                style={{ animationDuration: `${flipSpeed}ms` }}
              >
                <div className="lower-flap flipped-1 "></div>
                <div className="lower-flap flipped-2 "></div>
                <div className="lower-flap flipped-3 "></div>
                <div className="lower-flap flipped-4 "></div>
                <div className="lower-flap flipped-5 "></div>
              </div>
              <div className="lower-flaps-shadow"></div>
            </div>
          </div>
          <div
            className={`wheel ${wheelFlipClass}`}
            style={{ animationDuration: `${flipSpeed}ms` }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default SplitFlap;

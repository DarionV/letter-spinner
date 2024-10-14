import { useEffect, useState, memo, useMemo, useCallback } from "react";

const SplitFlap = memo(function SplitFlap({
  character = "?",
  initialCharacter = "?",
  flipSpeed = 100,
  size = 250,
}) {
  const [flipState, setFlipState] = useState({
    newCharacter: initialCharacter,
    prevCharacter: initialCharacter,
    isFlipping: false,
  });

  const { newCharacter, prevCharacter, isFlipping } = flipState;

  const upperFlapFlipNextClass = useMemo(
    () => (isFlipping ? "upper-flap-flip-next" : ""),
    [isFlipping]
  );
  const upperFlapFlipClass = useMemo(
    () => (isFlipping ? "upper-flap-flip" : ""),
    [isFlipping]
  );
  const lowerFlapFlipClass = useMemo(
    () => (isFlipping ? "lower-flap-flip" : ""),
    [isFlipping]
  );
  const lowerFlapFlipNextClass = useMemo(
    () => (isFlipping ? "lower-flap-flip-next" : ""),
    [isFlipping]
  );
  const lowerFlapFlipBackClass = useMemo(
    () => (isFlipping ? "lower-flap-flip-back" : ""),
    [isFlipping]
  );
  const wheelFlipClass = useMemo(
    () => (isFlipping ? "wheel-flip" : ""),
    [isFlipping]
  );

  const fontSize = useMemo(() => (size * 10) / 2, [size]);

  useEffect(() => {
    flip();
  }, [character]);

  const flip = useCallback(() => {
    setFlipState((prev) => {
      if (prev.prevCharacter === character && prev.isFlipping === false) {
        return prev;
      }
      return {
        ...prev,
        newCharacter: character,
        isFlipping: true,
      };
    });
    setTimeout(() => {
      setFlipState((prev) => {
        if (prev.prevCharacter === character && prev.isFlipping === false) {
          return prev;
        }
        return {
          ...prev,
          prevCharacter: character,
          isFlipping: false,
        };
      });
    }, flipSpeed - 100);
  }, [character, flipSpeed]);

  return (
    <>
      <div className="unit-frame">
        <img src="images/unit-container.svg" height={size} alt="" />
        <div className="unit-container">
          <div
            className={`wheel ${wheelFlipClass}`}
            style={{ animationDuration: `${flipSpeed}ms` }}
          ></div>
          <div className="letter-frame flex-center">
            <div
              className="upper-flap-container"
              style={{ fontSize: `${fontSize}%` }}
            >
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
            <div
              className="lower-flap-container"
              style={{ fontSize: `${fontSize}%` }}
            >
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
});

export default SplitFlap;

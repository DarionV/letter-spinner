import { useEffect, useState } from "react";

let primeTimer = false;
let shouldContinue = false;
let shouldReset = false;

function Timer({ isFlipping, toggleCountingDown, initialTime, isPaused }) {
  const [time, setTime] = useState(initialTime);
  const [shouldCountDown, setShouldCountDown] = useState(false);

  useEffect(() => {
    if (isPaused) {
      setShouldCountDown(false);
      shouldContinue = true;
    }
    if (!isPaused && shouldContinue) {
      setShouldCountDown(true);
      shouldContinue = false;
    }
  }, [isPaused]);

  useEffect(() => {
    if (shouldReset) {
      setTime(initialTime);
      shouldReset = false;
    }

    if (isFlipping && !primeTimer) {
      primeTimer = true;
    }

    if (!isFlipping && primeTimer) {
      setShouldCountDown(true);
      toggleCountingDown();
      primeTimer = false;
    }
  }, [isFlipping]);

  useEffect(() => {
    if (time.seconds === 0 && time.minutes === 0) {
      if (!shouldReset) {
        toggleCountingDown();
        shouldReset = true;
      }
    }
  }, [time]);

  useEffect(() => {
    if (!shouldCountDown) return;

    const timer = setInterval(() => {
      setTime((prevTime) => {
        const { minutes, seconds } = prevTime;

        if (seconds > 0) {
          return { minutes, seconds: seconds - 1 };
        }
        if (seconds === 0 && minutes > 0) {
          return { minutes: minutes - 1, seconds: 59 };
        }
        if (minutes === 0 && seconds === 0) {
          clearInterval(timer);
          setShouldCountDown(false);
          shouldReset = true;
        }
        return { minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [shouldCountDown]);

  return (
    <>
      Time Remaining: {time.minutes.toString().padStart(2, "0")}:
      {time.seconds.toString().padStart(2, "0")}
    </>
  );
}

export default Timer;

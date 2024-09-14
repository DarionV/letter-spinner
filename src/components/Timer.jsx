import { useEffect, useState } from "react";

function Timer(props) {
  const [time, setTime] = useState({ minutes: 0, seconds: 5 });
  const [shouldCountDown, setShouldCountDown] = useState(true);

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

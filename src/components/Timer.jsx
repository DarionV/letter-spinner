import { useEffect, useState } from "react";

// useEffect(() => {
//   if (!isCountingDown) return;
//   const timer = setInterval(countDown, 1000);
// }, [isCountingDown]);

// useEffect(() => {
//   console.log(seconds);
// }, [seconds]);

function countDown() {
  if (seconds <= 0 && minutes >= 1) {
    setMinutes((prevMinutes) => prevMinutes - 1);
    setSeconds(59);
  } else if (seconds === 0 && minutes === 0) {
    setMinutes((prevMinutes) => prevMinutes - 1);
    //clear interval
  } else {
    setSeconds((prevSeconds) => prevSeconds - 1);
  }
}

function Timer(props) {
  const [seconds, setSeconds] = useState(10);
  const [minutes, setMinutes] = useState(2);
  return;
}

export default Timer;

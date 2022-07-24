import React, { useState, useEffect } from "react";

function Countdown({ countdown, setCountdown }) {
  useEffect(() => {
    if (countdown === 0) {
      setCountdown(180);
    }
    const countdownInterval = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [countdown]);

  return <div>{countdown}</div>;
}

export default Countdown;

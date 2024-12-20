"use client";
import React, { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";
import styles from "@/styles/timer.module.css";

function CountdownTimer(props) {
  const [remainingTime, setRemainingTime] = useState(props.initialMinutes * 60);
  const [timeUpTriggered, setTimeUpTriggered] = useState(false);

  useEffect(() => {
    if (!props.startSurvey || remainingTime <= 0) return;
    const timerId = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0 && !timeUpTriggered) {
          props.handleTimeUp();
          setTimeUpTriggered(true);
        }
        return newTime > 0 ? newTime : 0;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [remainingTime, timeUpTriggered, props.handleTimeUp, props.startSurvey]);

  useEffect(() => {
    setRemainingTime(props.initialMinutes * 60);
  }, [props.initialMinutes]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}s`;
  };

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerText}>
        <FiClock />
        {formatTime(remainingTime)}
      </div>
      <div className={styles.counterText}>{props.navigateCount}</div>
    </div>
  );
}

export default CountdownTimer;

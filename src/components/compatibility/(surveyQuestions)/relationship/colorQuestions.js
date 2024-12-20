"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/colorQuestionsSurvey.module.css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import {
  calculateSize,
  extractOptionFromGroups,
  calculateColor,
} from "@/../../utils/relationships/surveyHelper";
import { useGlobalContext } from "@/../../context/globalContext";

const ColorQuestions = ({
  question,
  submitSelectedOption,
  showSubmitButton,
  onClickNext,
  onClickPrev,
  handleSubmitButton,
  isFirstQuestion,
  isLastQuestion,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isShifted, setIsShifted] = useState(0);
  const [numCircles, setNumCircles] = useState(0);
  const { isMobile } = useGlobalContext();
  const [optioParameters, setOptionParameters] = useState([]);
  const handleShift = (dir) => {
    setIsShifted(dir);
    setTimeout(() => setIsShifted(0), 300);
  };

  const renderCircularOptions = (options) => {
    const result = options.map((option, index) => {
      const midpoint = Math.floor(numCircles / 2);
      const size = calculateSize(index, midpoint, numCircles, isMobile);
      const circlarOptionsContanierSize =
        numCircles === 7
          ? 900
          : numCircles === 6
          ? 800
          : numCircles === 5
          ? 700
          : numCircles === 4
          ? 600
          : numCircles === 3
          ? 500
          : 920;
      document.documentElement.style.setProperty(
        "--max-width-circularOptions",
        `${circlarOptionsContanierSize}px` // Add the unit here
      );
      const color = calculateColor(index, numCircles);
      const isHovered = hoveredIndex === index;
      return (
        <div
          key={index}
          className={styles.circle}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderColor: color,
            backgroundColor: isHovered ? color : "transparent",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleOptionClick(option._id)}
        ></div>
      );
    });

    return result;
  };

  useEffect(() => {
    if (question) {
      setCurrentQuestion(question.questions[0]);
      setOptions(question.questions[0].options || []);
      setNumCircles(question.questions[0].options.length);
      setOptionParameters(extractOptionFromGroups(question.questions[0]));
    }
  }, [question]);

  const handleOptionClick = (optionID) => {
    submitSelectedOption(currentQuestion._id, optionID);
    setSelectedValue(optionID);
    onClickNext();
  };

  return (
    currentQuestion && (
      <div className={styles.container}>
        <div className={styles.questionText}>
          {currentQuestion?.title || "Loading question..."}
        </div>

        {options.length > 0 ? (
          <div className={styles.likertScale}>
            <div className={styles.circlesContainer}>
              {renderCircularOptions(options)}
            </div>
            <div className={styles.optionInfo}>
              <span className={`${styles.label} ${styles.negativeResponse}`}>
                {optioParameters[0]}
              </span>
              <span className={`${styles.label} ${styles.positiveResponse}`}>
                {optioParameters[1]}
              </span>
            </div>
          </div>
        ) : (
          <p>Loading options...</p>
        )}

        <div className={styles.navigateButtons}>
          {!isFirstQuestion ? (
            <div
              className={`${styles.navigateButton} ${
                isShifted === -1 ? styles.shiftNeg : ""
              }`}
              onClick={() => {
                handleShift(-1);
                onClickPrev();
              }}
            >
              <MdNavigateBefore size={36} color="#5C5A5A" />
            </div>
          ) : (
            <div
              className={`${styles.navigateButton} ${
                isShifted === -1 ? styles.shiftNeg : ""
              }`}
              style={{ opacity: "0.1" }}
            >
              <MdNavigateBefore size={36} color="#5C5A5A" />
            </div>
          )}

          {!isLastQuestion ? (
            <div
              className={`${styles.navigateButton} ${
                isShifted === 1 ? styles.shiftPos : ""
              }`}
              onClick={() => {
                handleShift(1);
                onClickNext();
              }}
            >
              <MdNavigateNext size={36} color="#5C5A5A" />
            </div>
          ) : (
            <div
              className={`${styles.navigateButton} ${
                isShifted === 1 ? styles.shiftPos : ""
              }`}
              style={{ opacity: "0.3" }}
            >
              <MdNavigateNext size={36} color="#5C5A5A" />
            </div>
          )}
        </div>

        {showSubmitButton && (
          <div
            id="surveySubmitButton"
            className={styles.submitButton}
            onClick={handleSubmitButton}
          >
            <div className={styles.submitButtonText}>Submit</div>
          </div>
        )}
      </div>
    )
  );
};
export default ColorQuestions;

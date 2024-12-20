// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import questionStyles from "@/styles/questions.module.css";

const ParaQuestiosn = ({
  question,
  submitSelectedOption,
  onClickNext,
  showSubmitButton,
  handleSubmitButton,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (question) {
      setCurrentQuestion(question.questions[0]);
      setOptions(question.questions[0].options || []);
    }
  }, [question]);

  const handleOptionClick = (optionID) => {
    submitSelectedOption(currentQuestion._id, optionID);
    setSelectedValue(optionID);
    onClickNext();
  };

  return (
    <div className={questionStyles.conversationSurvey}>
      <div className={questionStyles.mainContentBody}>
        <div className={questionStyles.quesContainer}>
          <div className={questionStyles.quesTitle}>
            {currentQuestion ? currentQuestion.title : "Loading question..."}
          </div>
        </div>
        <div className={questionStyles.optionSection}>
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={index}
                className={questionStyles.optionText}
                style={{
                  backgroundColor:
                    selectedValue === option._id ? "#BFDFD9" : "#ffffff",
                  fontWeight: selectedValue === option._id ? 400 : 300,
                }}
                onClick={() => handleOptionClick(option._id)}
              >
                <div>
                  <span style={{ color: "#0E8E72" }}>
                    {String.fromCharCode(97 + index)})
                  </span>{" "}
                  <span
                    style={{
                      color:
                        selectedValue === option._id ? "#000000" : "#5C5A5A",
                    }}
                  >
                    {option.title || "Option"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>Loading options...</p>
          )}
        </div>
      </div>
      {showSubmitButton && (
        <div
          id="surveySubmitButton"
          className={questionStyles.navigateButton}
          onClick={handleSubmitButton}
        >
          <div className={questionStyles.navigateButtonText}>Submit</div>
        </div>
      )}
    </div>
  );
};

export default ParaQuestiosn;

import React from "react";
import ParaQuestiosn from "./relationship/paraQuestions";
import ColorQuestions from "./relationship/colorQuestions";

const SurveyQuestionsManager = ({
  componentKey,
  showSubmitButton,
  question,
  onClickNext,
  onClickPrev,
  submitSelectedOption,
  isFirstQuestion,
  isLastQuestion,
  handleSubmitButton,
}) => {
  const componentsMap = [ParaQuestiosn, ColorQuestions];

  const SelectedComponent = componentsMap[componentKey];

  return (
    <SelectedComponent
      // key={key}
      showSubmitButton={showSubmitButton}
      question={question}
      onClickNext={onClickNext}
      onClickPrev={onClickPrev}
      isFirstQuestion={isFirstQuestion}
      isLastQuestion={isLastQuestion}
      submitSelectedOption={submitSelectedOption}
      handleSubmitButton={handleSubmitButton}
    />
  );
};

export default SurveyQuestionsManager;

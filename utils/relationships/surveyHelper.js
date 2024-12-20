// import { useGlobalContext } from "../../context/globalContext";
// const negativeResponseColor = "#B39DDB";
// const positiveResponseColor = "#0E8E72";
const positiveResponseColor = "#B39DDB";
const negativeResponseColor = "#0E8E72";
export const calculateSize = (index, midpoint, numCircles, isMobile) => {
  // const { isMobile } = useGlobalContext();

  const minSize = isMobile ? 30 : 60;
  const maxSize = isMobile ? 45 : 120;
  if (numCircles % 2 == 0) {
    return maxSize;
  }
  return (
    minSize + ((maxSize - minSize) / midpoint) * Math.abs(midpoint - index)
  );
};

export const interpolateColor = (color1, color2, factor) => {
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const rgbToHex = (rgb) => {
    return "#" + rgb.map((val) => val.toString(16).padStart(2, "0")).join("");
  };

  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const result = c1.map((c, i) => Math.round(c + factor * (c2[i] - c)));

  return rgbToHex(result);
};

export const calculateColor = (index, numCircles) => {
  const midpoint = Math.floor(numCircles / 2);
  const factor =
    index < midpoint
      ? index / midpoint
      : (index - midpoint) / (numCircles - 1 - midpoint);

  if (index < midpoint) {
    return interpolateColor(positiveResponseColor, "#ffffff", factor);
  } else if (index > midpoint) {
    return interpolateColor("#ffffff", negativeResponseColor, factor);
  } else {
    return "#AED9D0";
  }
};

export function extractOptionFromGroups(line) {
  const optionGroups = {
    satisfactionOptions: ["Not satisfied", "Very satisfied"],
    yesNoOptions: ["Not at all", "Definitely"],
    frequencyOptions: ["Rarely", "Always"],
    emotionalOptions: ["Strongly Disagree", "Strongly Agree"],
  };

  // Helper function to match question patterns
  function getAnswerOptionsForQuestion(question) {
    const lowerCaseQuestion = question.toLowerCase();

    if (lowerCaseQuestion.includes("how satisfied")) {
      // For satisfaction-related questions
      return optionGroups.satisfactionOptions;
    }

    if (
      lowerCaseQuestion.startsWith("are you") ||
      lowerCaseQuestion.startsWith("do you") ||
      lowerCaseQuestion.startsWith("are there")
    ) {
      // For yes/no related questions (expanded to include "Are there")
      return optionGroups.yesNoOptions;
    }

    if (
      lowerCaseQuestion.includes("how often") ||
      lowerCaseQuestion.includes("i have")
    ) {
      // For frequency-related questions
      return optionGroups.frequencyOptions;
    }

    if (
      lowerCaseQuestion.includes("anxious") ||
      lowerCaseQuestion.includes("worried") ||
      lowerCaseQuestion.includes("scared") ||
      lowerCaseQuestion.includes("sad")
    ) {
      // For emotional state-related questions
      return optionGroups.emotionalOptions;
    }

    // Default return if no specific match
    return ["Strongly Disagree", "Strongly Agree"];
  }

  const title = line.title.toLowerCase(); // Extract the title from the object and convert to lowercase
  const options = getAnswerOptionsForQuestion(line.title); // Get the matching options based on the question
  return options.length > 0 ? options : []; // Return the matching options if found, otherwise return an empty array
}

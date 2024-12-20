"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useGlobalContext } from "./globalContext";
import surveyList from "../public/data/surveyList.json";
import { set } from "date-fns";

const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
  const [startSurvey, setStartSurvey] = useState(false);
  const [isSurveyCovered, setIsSurvedCovered] = useState(0);
  const [surveyID, setSurveyID] = useState(0);
  const { pageID } = useGlobalContext();
  const [surveyData, setSurveyData] = useState({});
  const [meaningData, setMeaningData] = useState(null);
  const [nameSuggestions, setNameSuggestions] = useState([]);

  const searchBabyMeaning = async (babyName) => {
    try {
      const response = await fetch(
        `https://api.aidandheal.com/parenting/getNameMeaning?name=${encodeURIComponent(
          babyName
        )}`
      );

      if (!response.ok) {
        setMeaningData(null);
        throw new Error("API call failed");
      }
      const data = await response.json();

      // Save response in sessionStorage
      if (data) {
        setMeaningData(data);
      } else {
        setMeaningData(null);
      }

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generateNameSuggestions = async (
    gender,
    startsWith,
    endsWith,
    meaningKeywords,
    origin
  ) => {
    // Construct the payload based on your BabyNamesDto
    const payload = {
      gender: gender !== "any" ? gender : "",
      startsWith: startsWith || "",
      endsWith: endsWith || "",
      meaningKeywords: meaningKeywords || "",
      origin: origin !== "any" ? origin : "",
    };

    try {
      const response = await fetch(
        `https://api.aidandheal.com/parenting/getBabyNameSuggestion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (result) {
        setNameSuggestions(result);
        return result;
      }
    } catch (error) {
      console.error("Error fetching baby name suggestions:", error);
      throw error;
    }
  };

  function isElementAboveOrBelow(elem) {
    var elemTop = elem.offsetTop;
    var elemBottom = elemTop + elem.offsetHeight;
    var scrollTop = document.documentElement.scrollTop;
    var scrollBottom = scrollTop + window.innerHeight;
    if (scrollBottom < elemTop) {
      setIsSurvedCovered(-1);
    } else if (scrollTop > elemBottom) {
      setIsSurvedCovered(1);
    } else {
      setIsSurvedCovered(0);
    }
  }

  useEffect(() => {
    if (pageID !== 0) {
      setSurveyID(pageID + 1);
    }
  }, [pageID]);

  useEffect(() => {
    const surveyItem = surveyList.find((item) => item.id == surveyID);
    if (surveyItem) {
      setSurveyData(surveyItem);
    }
  }, [surveyID]);

  return (
    <SurveyContext.Provider
      value={{
        startSurvey,
        setStartSurvey,
        isElementAboveOrBelow,
        isSurveyCovered,
        surveyID,
        setSurveyID,
        surveyData,
        searchBabyMeaning,
        generateNameSuggestions,
        meaningData,
        nameSuggestions,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurveyContext = () => useContext(SurveyContext);

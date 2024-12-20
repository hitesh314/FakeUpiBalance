"use client";
import React, { useState, useEffect } from "react";
import transactionPageStyles from "@/styles/pageTransaction.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Results = () => {
  const [transactionMessage, setTransactionMessage] = useState("");
  const [transactionPhoto, setTransactionPhoto] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(0);
  const [showTransactionStatus, setShowTransactionStatus] = useState(false);
  const [showTransactionButton, setShowTransactionButton] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [surveyDataIndex, setSurveyDataIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [surveyResponsesID, setSurveyResponsesID] = useState(null);
  // @ts-ignore
  const baseUrl = process.env.BASE_URL;
  const baseUrlBackend = process.env.BASE_URL_API;
  const router = useRouter();
  const [surveyID, setSurveyID] = useState(0);
  const [isPartnerRequire, setIsPartnerRequired] = useState(null);
  const [isRedirect, setIsRedirect] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userRecord = sessionStorage.getItem("userSession");
        const parsedUserRecord = userRecord ? JSON.parse(userRecord) : null;

        const urlParams = new URLSearchParams(window.location.search);
        const isPartnerRequireParam = urlParams.get("isPartnerRequire");
        const surveyIDParams = urlParams.get("surveyID");

        setIsPartnerRequired(isPartnerRequireParam);
        // @ts-ignore
        setSurveyID(surveyIDParams);

        const surveyEvaluateUserID = sessionStorage.getItem("surveyEvaluateID");
        setSurveyResponsesID(surveyEvaluateUserID);
        if (parsedUserRecord && parsedUserRecord.user) {
          setCurrentUser(parsedUserRecord.user);
        }

        const response = await fetch("/data/surveyLoadingData.json");
        const data = await response.json();
        const isPageRedirect =
          !surveyEvaluateUserID && isPartnerRequireParam != "false"
            ? true
            : false;

        setTransactionData(
          isPageRedirect ? [data[0], data[data.length - 1]] : data
        );
        setIsRedirect(isPageRedirect);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchData();
    setNextPageValues();
  }, []);

  useEffect(() => {
    if (
      surveyID &&
      isRedirect !== null &&
      currentUser &&
      Object.keys(currentUser).length > 0
    ) {
      getPartnerScore();
    }
  }, [surveyID, isRedirect, currentUser]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNextPageValues();
    }, 1000);

    return () => {
      setNextPageValues(), clearInterval(intervalId);
    };
  }, [transactionData, surveyDataIndex]);

  const getPartnerScore = async () => {
    try {
      const surveyResponses = sessionStorage.getItem("surveyResponses");
      const parsedSurveyResponses = JSON.parse(surveyResponses);

      if (!Array.isArray(parsedSurveyResponses)) {
        throw new TypeError("surveyResponses should be an array");
      }

      const evaluateScoreBody = {
        isPrimary: surveyResponsesID ? false : true,
        surveyResponseID: surveyResponsesID,
        surveyID: Number(surveyID),
        // @ts-ignore
        userID: currentUser?.id,
        answers: parsedSurveyResponses.map(({ optionID, questionID }) => ({
          answerId: optionID,
          questionId: questionID,
        })),
        isPartnerRequired: isPartnerRequire == "true",
      };

      const surveyScoreFetch = await fetch(
        `${baseUrlBackend}/survey/evaluate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(evaluateScoreBody),
        }
      );
      const response = await surveyScoreFetch.json();

      setSurveyResponsesID(response.data);
      if (isRedirect) {
        setTimeout(() => {
          router.push(`/surveyResult?surveyResultsID=${response.data}`);
        }, 2000);
      }

      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const setNextPageValues = () => {
    if (surveyDataIndex < transactionData?.length) {
      setTransactionMessage(transactionData[surveyDataIndex]?.title);
      setTransactionPhoto(transactionData[surveyDataIndex]?.image);
      setTransactionStatus(transactionData[surveyDataIndex]?.progressBarStatus);
      setShowTransactionStatus(
        transactionData[surveyDataIndex]?.progressBarStatus > 0
      );
      setShowTransactionButton(
        transactionData[surveyDataIndex]?.showSubmitButton
      );
      setSurveyDataIndex(surveyDataIndex + 1);
    }
  };

  const SurveyProgressCompletion = ({ show }) => {
    return (
      <>
        {show && (
          <div className={`${transactionPageStyles.progressBar}`}>
            <div className={`${transactionPageStyles.progressBarInfo}`}>
              <div
                style={{ width: `${transactionStatus}%` }}
                className={`${transactionPageStyles.progressBarRectangle}`}
              ></div>
            </div>
          </div>
        )}
      </>
    );
  };

  const SurveyCompleteViewResults = ({ show }) => {
    return (
      <>
        {show && (
          <div
            className={`${transactionPageStyles.submitButton}`}
            onClick={() => {
              router.push(`/surveyResult?surveyResultsID=${surveyResponsesID}`);
            }}
          >
            <span className={`${transactionPageStyles.submitButtonText}`}>
              Check Result
            </span>
          </div>
        )}
      </>
    );
  };

  return (
    <body>
      <div className={transactionPageStyles.main}>
        <div className={transactionPageStyles.loadFrame}>
          {transactionPhoto ? (
            <Image
              src={transactionPhoto}
              layout="responsive"
              width={480}
              height={480}
              className={`${transactionPageStyles.image}`}
              alt="surveyLoadGreetings"
              priority={true}
            />
          ) : null}

          <hr
            style={{
              borderTop: "1px solid #E3E3E3",
              color: "#E3E3E3",
              margin: 0,
              width: "100%",
            }}
          ></hr>
        </div>
        <div className={`${transactionPageStyles.analyseInformation}`}>
          <div className={`${transactionPageStyles.transactionMessage}`}>
            {transactionMessage}
          </div>
          <SurveyProgressCompletion show={showTransactionStatus} />
          <SurveyCompleteViewResults show={showTransactionButton} />
        </div>
      </div>
    </body>
  );
};

export default Results;

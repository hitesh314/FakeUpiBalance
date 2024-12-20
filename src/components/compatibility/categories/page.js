"use client";
import React, { useState, useEffect, useRef } from "react";
import SurveyQuestionsManager from "../(surveyQuestions)/surveyQuestionManager";
import CountdownTimer from "@/components/compatibility/timer/page";
import styles from "@/styles/convScrMainFrame.module.css";
import { useSession } from "next-auth/react";
import Banner from "@/components/common/banner";
import { useRouter } from "next/navigation";
import { useOverlayContext } from "@/../../context/overlayContext";
import { useSurveyContext } from "@/../../context/surveyContext";
import Image from "next/image";

function isValidObjectID(objectID) {
  const objectIDPattern = /^[0-9a-fA-F]{24}$/;

  return objectIDPattern.test(objectID);
}

export default function Survey() {
  //Use session
  const { data: session, status } = useSession();

  //Use state
  const [clockTimer, setClockTimer] = useState(0);
  const [fadeState, setFadeState] = useState("fadeEnterActive");
  const [storeOptionSelected, setStoreOptionSelected] = useState([]);
  const [questionID, setQuestionID] = useState(0);
  const [maxCategoryVisit, setMaxCategoryVisit] = useState(0);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [questionsData, setQuestionsData] = useState(null);
  const questionRef = useRef(null);
  //Use Router
  const router = useRouter();
  // Use Context API
  const { openOverlayWithContent } = useOverlayContext();

  const { startSurvey, setStartSurvey, isSurveyCovered, surveyID, surveyData } =
    useSurveyContext();

  const baseUrlBackend = process.env.BASE_URL_API;

  const getElementDimensions = (item) => {
    const categoryWidth = document.getElementById(item);
    return categoryWidth?.getBoundingClientRect().width;
  };

  const addSurveyOptionSelected = (questionID, optionID) => {
    setStoreOptionSelected((prevOptions) => {
      const existingOptionIndex = prevOptions.findIndex(
        (option) => option.questionID === questionID
      );

      if (existingOptionIndex !== -1) {
        const updatedOptions = [...prevOptions];
        updatedOptions[existingOptionIndex].optionID = optionID;
        return updatedOptions;
      } else {
        return [...prevOptions, { questionID, optionID }];
      }
    });
  };

  const evaluateResultsAndRedirect = () => {
    try {
      router.push(
        `/pageTransactions?isPartnerRequire=${surveyData.isPartnerRequired}&surveyID=${surveyID}`
      );
    } catch (error) {
      console.error("Error evaluating survey results:", error);
    }
  };

  const scrollIntoParticularView = (scrollInto) => {
    if (scrollInto) {
      const elementTop = scrollInto.offsetTop;
      const headerHeight = 100;

      window.scrollTo({
        top: elementTop - headerHeight,
        behavior: "smooth",
      });
    }
  };

  const updateMaxCategoryVisit = () => {
    if (questionID >= maxCategoryVisit) {
      setMaxCategoryVisit(questionID);
    }
  };

  const navigateQuestions = (topicId) => {
    if (topicId <= maxCategoryVisit) setQuestionID(topicId);
    else {
      openOverlayWithContent("ForbiddenEntry");
    }
  };

  const handleTimeUp = () => {
    openOverlayWithContent("RunningLateOverlay");
  };

  const handlePartnerShareNotification = () => {
    openOverlayWithContent("PartnerShareReview");
  };

  const handleSubmitButton = async () => {
    sessionStorage.setItem(
      "surveyResponses",
      JSON.stringify(storeOptionSelected)
    );
    // console.log(storeOptionSelected);

    if (status === "authenticated") {
      evaluateResultsAndRedirect();
    } else {
      setShowResults(true);
      sessionStorage.setItem("showResults", true);
      openOverlayWithContent("SignIn");
    }
  };

  const handleMoveNext = async () => {
    if (questionID < storeOptionSelected.size) {
      openOverlayWithContent("ForbiddenEntry");
    }
    if (questionID <= questionsData.length - 2) {
      setFadeState("fadeEnter");
      setTimeout(() => {
        setStartSurvey(true);
        setQuestionID(questionID + 1);
        setFadeState("fadeExit");
      }, 250);
    } else {
      const element = document.getElementById("surveySubmitButton");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      setShowSubmitBtn(true);
    }
  };

  const handleMovePrevious = async () => {
    if (questionID > 0) {
      setFadeState("fadeEnter");
      setTimeout(() => {
        setStartSurvey(true);
        setQuestionID(questionID - 1);
        setFadeState("fadeExit");
      }, 250);
    }
  };

  useEffect(() => {
    const ele = document.getElementById(`container-scroll`);
    const divDimensions = getElementDimensions("questionCategory");
    if (ele) {
      ele.scrollBy({
        left: divDimensions,
        behavior: "smooth",
      });
    }
  }, [questionID]);

  useEffect(() => {
    if (surveyID !== 0) {
      async function fetchData() {
        try {
          const fetchSurveyData = await fetch(
            `${baseUrlBackend}/survey/getSurveyData?surveyID=${surveyID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await fetchSurveyData.json();
          data?.category?.sort((a, b) => a.id - b.id);

          // console.log(data);
          const params = new URLSearchParams(window.location.search);
          const surveyEvaluateID = params.get("surveyEvaluateID");

          if (isValidObjectID(surveyEvaluateID)) {
            sessionStorage.setItem("surveyEvaluateID", surveyEvaluateID);
            handlePartnerShareNotification();
          } else {
            sessionStorage.removeItem("surveyEvaluateID");
          }
          setQuestionsData(data?.category);
          setClockTimer(data?.timeAllocated);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }
      fetchData();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [surveyID]);

  useEffect(() => {
    sessionStorage.setItem(
      "storeOptionSelected",
      JSON.stringify(storeOptionSelected)
    );
  }, [storeOptionSelected]);

  useEffect(() => {
    if (status === "authenticated") {
      const userSessionRecord = sessionStorage.getItem("userSession");
      if (!userSessionRecord) {
        sessionStorage.setItem("userSession", JSON.stringify(session));
      }
    } else {
      sessionStorage.removeItem("userSession");
    }

    const showResultsPage = sessionStorage.getItem("showResults");
    if (showResultsPage === "true" && status === "authenticated") {
      sessionStorage.removeItem("showResults");
      evaluateResultsAndRedirect();
    }
  }, [status]);

  useEffect(() => {
    updateMaxCategoryVisit();
  }, [questionID]);

  return (
    <>
      {isSurveyCovered === 1 && startSurvey && (
        <div className={styles.scrollDownLink}>
          <Image
            src="/images/moveUpwards.png"
            width={120}
            height={120}
            alt="surveyLoadGreetings"
            className={styles.scrollDownArrow}
          />
        </div>
      )}

      <Banner
        startSurvey={setStartSurvey}
        scrollIntoParticularView={scrollIntoParticularView}
      />

      {questionsData ? (
        <div id="surveyQuestionsContainer" className={styles.mainFrame}>
          <div>
            <div id="containerElementSurvey" className={styles.timer}>
              <CountdownTimer
                initialMinutes={clockTimer}
                startSurvey={startSurvey}
                navigateCount={`${maxCategoryVisit + 1} of ${
                  questionsData.length
                }`}
                handleTimeUp={handleTimeUp}
              />
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  width: `${
                    ((maxCategoryVisit + 1) / questionsData.length) * 100
                  }%`,
                  backgroundColor: "#0E8E72",
                  height: window.innerWidth <= 768 ? "2px" : "4px",
                  borderRadius: "24px",
                }}
              ></div>
              <div
                style={{
                  width: `${
                    100 - ((maxCategoryVisit + 1) / questionsData.length) * 100
                  }%`,
                  backgroundColor: "#E6F1EF",
                  height: window.innerWidth <= 768 ? "2px" : "4px",
                }}
              ></div>
            </div>
            {surveyData.surveyQuestionDisplayID == 0 ? (
              <div id="container-scroll" className={styles.categories}>
                {questionsData?.map((topic, index) => (
                  <div
                    key={index}
                    id="questionCategory"
                    className={`${
                      index === questionID
                        ? styles.categoriesListCurrentItem
                        : index < maxCategoryVisit
                        ? styles.categoriesListVisied
                        : styles.categoriesListNotVisied
                    }`}
                    onClick={() => {
                      navigateQuestions(index);
                    }}
                    ref={index === questionID ? questionRef : null}
                  >
                    <div
                      key={topic.id}
                      className={`${styles.categoriesListItem}`}
                    >
                      {topic.title}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div id="surveyQuestions" className={styles[fadeState]}>
            {questionsData[questionID] ? (
              <SurveyQuestionsManager
                key={questionsData[questionID].id}
                componentKey={surveyData.surveyQuestionDisplayID}
                showSubmitButton={showSubmitBtn}
                question={questionsData[questionID]}
                isFirstQuestion={questionID == 0}
                isLastQuestion={questionID == questionsData.length - 1}
                onClickNext={handleMoveNext}
                onClickPrev={handleMovePrevious}
                submitSelectedOption={addSurveyOptionSelected}
                handleSubmitButton={handleSubmitButton}
              />
            ) : (
              <div>No questions available for the selected category.</div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      )}
    </>
  );
}

"use client";
import Image from "next/image";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import styles from "@/styles/surveyResults.module.css";
import surveyResultsConstants from "@@/public/data/surveyResults.json";
import ShareModal from "@/components/overlays/shareSurvey";
import Modal from "@/components/overlays/overlay";

export default function Results() {
  const [activeButton, setActiveButton] = useState("");
  const [surveyResult, setSurveyResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [surveyResultsID, setSurveyResultsID] = useState(null);
  const baseUrl = process.env.BASE_URL;
  const baseUrlBackend = process.env.BASE_URL_API;
  // console.log("SurveyID", surveyID);
  const handleCopyLink = () => setIsOpen(true);

  const handleLikeClick = () => {
    // @ts-ignore
    setActiveButton(activeButton === "like" ? null : "like");
  };

  const handleDislikeClick = () => {
    // @ts-ignore
    setActiveButton(activeButton === "dislike" ? null : "dislike");
  };

  const handleCloseShareModel = () => {
    setIsOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(
        `${baseUrl}/relationship/love-compatibility?surveyEvaluateID=${surveyResultsID}`
      )
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  useEffect(() => {
    const fetchSurveyResults = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const surveyResultsIDParam = urlParams.get("surveyResultsID");
        let response;
        if (
          !!surveyResultsIDParam &&
          surveyResultsIDParam != "undefined" &&
          surveyResultsIDParam != "null"
        ) {
          // @ts-ignore
          setSurveyResultsID(surveyResultsIDParam);

          response = await fetch(`${baseUrlBackend}/survey/getResults`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              surveyResultsID: surveyResultsIDParam,
            }),
          });
          if (!!response && !response.ok) {
            throw new Error("Failed to fetch survey results");
          }
        }
        const sessionSurveyResult = !!response ? await response.json() : null;
        const userSurveyRecord = sessionSurveyResult?.result;
        setSurveyResult(
          // @ts-ignore
          surveyResultsConstants.find(
            (item) => item.surveyResultID == userSurveyRecord
          )
        );
        setShowResults(userSurveyRecord != 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSurveyResults();
  }, []);

  return (
    <>
      {isOpen && (
        <Modal>
          <ShareModal
            onClose={handleCloseShareModel}
            onCopyLink={copyToClipboard}
            surveyResultsID={surveyResultsID}
          />
        </Modal>
      )}
      {surveyResult ? (
        <div className={styles.resultsContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.headerText}>Survey Result</div>
            <hr className={styles.hrStyle} />
          </div>
          <div className={styles.resultsDisplay}>
            <div className={styles.resultBox}>
              <div
                style={{
                  color: "#ffffff",
                  // @ts-ignore
                  backgroundColor: surveyResult.bannerColor,
                }}
                className={styles.strongCompatibilityHeader}
              >
                {surveyResult
                  ? // @ts-ignore
                    surveyResult.compatibilityTitle
                  : ""}
              </div>
              <div className={styles.image}>
                <Image
                  // @ts-ignore
                  src={`${surveyResult.detailImageURL}`}
                  alt="survey results compatibility pic"
                  layout="responsive"
                  height="1"
                  width="1"
                  style={{
                    objectFit: "contain",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div
                style={{ display: showResults ? "flex" : "none" }}
                className={styles.satisfactionBox}
              >
                {" "}
                <div className={styles.satisfactionText}>
                  Satisfied With Result?
                </div>
                <div className={styles.iconsContainer}>
                  <BiSolidLike
                    onClick={handleLikeClick}
                    style={{
                      color: activeButton === "like" ? "#0E8E72" : "#000000",
                    }}
                  />
                  <BiSolidDislike
                    onClick={handleDislikeClick}
                    style={{
                      color: activeButton === "dislike" ? "#FF0000" : "#000000",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.recommendationContainer}>
              <div className={styles.recommendationHeader}>Recommendation</div>
              <div className={styles.recommendBottom}>
                <ul className={styles.recommendationList}>
                  {surveyResult.recommendations // @ts-ignore
                    .map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
                <div
                  style={{ display: showResults ? "none" : "flex" }}
                  className={styles.shareButton}
                  onClick={() => handleCopyLink()}
                >
                  Share With Partner
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

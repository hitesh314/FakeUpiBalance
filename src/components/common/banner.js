"use client";
import React, { useState } from "react";
import Image from "next/image";
import bannerStyles from "@/styles/bannerStyles.module.css";
import { useSurveyContext } from "@/../../context/surveyContext";

export default function Banner(props) {
  const { startSurvey, setStartSurvey, surveyData } = useSurveyContext();
  const handleSurveyStartClick = () => {
    const scrollIntoDiv = document.getElementById("containerElementSurvey");
    setStartSurvey(true);
    if (scrollIntoDiv) {
      props.startSurvey(true);
      props.scrollIntoParticularView(scrollIntoDiv);
    }
  };

  return surveyData && surveyData.bannerImage ? (
    <div
      style={{
        backgroundImage: `url(${surveyData.bannerBackgroundImage})`,
        "--survey-primary-color": surveyData.surveyPrimaryColor,
      }}
      className={bannerStyles.bannerContainerDesktop}
    >
      <div className={bannerStyles.bannerFrame}>
        <Image
          src={surveyData.bannerImage}
          layout="responsive"
          width={220}
          height={220}
          // fill={true}
          alt="survey banner image"
          className={bannerStyles.bannerImages}
        />
        <div className={bannerStyles.contentSection}>
          <div className={bannerStyles.subContent}>
            <div className={bannerStyles.contentHead}>
              <span className={bannerStyles.contentHeadTitleLoveCpty}>
                {surveyData.bannerTitle}
              </span>
            </div>
            <span>{surveyData.bannerDescription}</span>
          </div>
          {!startSurvey && (
            <div
              className={bannerStyles.startSurveyButton}
              onClick={handleSurveyStartClick}
            >
              Start Survey
            </div>
          )}
        </div>
        <Image
          src={surveyData.surveyImage}
          width={220}
          height={220}
          alt="surveyLoadGreetings"
          className={`${bannerStyles.bannerImages} ${bannerStyles.bannerSurveyImage}`}
        />
      </div>
    </div>
  ) : (
    <div></div>
  );
}

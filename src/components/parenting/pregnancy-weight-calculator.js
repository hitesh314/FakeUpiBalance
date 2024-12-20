"use client";

import { useState, useEffect } from "react";
import {
  calculateBMI,
  getBMICategory,
  getRecommendedWeights,
  generateChartData,
} from "@@/utils/parenting/bmiCalculations";
import WeightGainChart from "@/components/common/graphIndicators";
import { IoBody } from "react-icons/io5";
import { MdOutlineBedroomBaby } from "react-icons/md";
import { MdAutoGraph } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";

const primaryColor = "#0E8E72";
const secondaryColor = "#E6F1EF";

export default function PregnancyWeightCalculator() {
  // Toggle between metric and imperial units for both height and weight
  // For height:
  // - If metric: use heightCm
  // - If imperial: use heightFt and heightIn
  // For weight:
  // - If metric: use kg
  // - If imperial: use lbs
  const [useMetricWeight, setUseMetricWeight] = useState(true);
  const [useMetricHeight, setUseMetricHeight] = useState(false);

  // Before pregnancy inputs
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(7); // 5'7" ~ 170cm
  const [heightCm, setHeightCm] = useState(170);
  const [prePregnancyWeightLbs, setPrePregnancyWeightLbs] = useState(158.7);
  const [prePregnancyWeightKg, setPrePregnancyWeightKg] = useState(72);

  // During pregnancy inputs
  const [currentWeek, setCurrentWeek] = useState(40);
  const [isTwins, setIsTwins] = useState(false);

  // Current weight input
  const [currentWeightLbs, setCurrentWeightLbs] = useState(183.3);
  const [currentWeightKg, setCurrentWeightKg] = useState(83.3);

  // Determine current units based on toggles
  const weightUnit = useMetricWeight ? "kg" : "lbs";
  const heightUnit = useMetricHeight ? "cm" : "ftin";

  // Current weight and pre-preg weight based on unit
  const currentWeight =
    weightUnit === "lbs" ? currentWeightLbs : currentWeightKg;
  const prePregnancyWeight =
    weightUnit === "lbs" ? prePregnancyWeightLbs : prePregnancyWeightKg;

  const [bmi, setBmi] = useState(0);

  useEffect(() => {
    const newBmi = calculateBMI(
      prePregnancyWeight,
      heightFt,
      heightIn,
      heightCm,
      weightUnit,
      heightUnit
    );
    setBmi(newBmi);
  }, [
    prePregnancyWeight,
    heightFt,
    heightIn,
    heightCm,
    weightUnit,
    heightUnit,
  ]);

  const {
    recommendedLow,
    recommendedHigh,
    recommendedGainMin,
    recommendedGainMax,
  } = getRecommendedWeights(prePregnancyWeight, currentWeek);

  const recommendedLowNum = parseFloat(recommendedLow);
  const recommendedHighNum = parseFloat(recommendedHigh);

  const bmiBefore = bmi.toFixed(1);
  const bmiMessage = getBMICategory(bmi);

  const chartData = generateChartData(prePregnancyWeight);

  const sectionHeaderStyle = {
    backgroundColor: secondaryColor,
    padding: "0.5rem",
    borderRadius: "0.375rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const iconStyle = {
    color: primaryColor,
  };

  function renderHeightInput() {
    if (heightUnit === "cm") {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Height ({heightUnit}):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="border border-gray-300 rounded p-2 w-full"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              placeholder="cm"
              step="0.1"
            />
            <button
              type="button"
              className="text-xs text-blue-600 underline"
              onClick={() => setUseMetricHeight(!useMetricHeight)}
            >
              {useMetricHeight ? "Feet/Inches" : "cm"}
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Height (ft/in):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="border border-gray-300 rounded p-2 w-1/2"
              value={heightFt}
              onChange={(e) => setHeightFt(Number(e.target.value))}
              placeholder="Feet"
              step="0.1"
            />
            <input
              type="number"
              className="border border-gray-300 rounded p-2 w-1/2"
              value={heightIn}
              onChange={(e) => setHeightIn(Number(e.target.value))}
              placeholder="Inches"
              step="0.1"
            />
            <button
              type="button"
              className="text-xs underline"
              onClick={() => setUseMetricHeight(!useMetricHeight)}
            >
              {useMetricHeight ? "Feet/Inches" : "cm"}
            </button>
          </div>
        </div>
      );
    }
  }

  // Helper to display pre-pregnancy weight input based on current unit
  function renderPrePregWeightInput() {
    if (weightUnit === "kg") {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Weight ({weightUnit}):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="kg"
              value={prePregnancyWeightKg}
              onChange={(e) => setPrePregnancyWeightKg(Number(e.target.value))}
              step="0.1"
            />
            <button
              type="button"
              className="text-xs text-blue-600 underline"
              onClick={() => setUseMetricWeight(!useMetricWeight)}
            >
              {useMetricWeight ? "lbs" : "kg"}
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Weight ({weightUnit}):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="lbs"
              value={prePregnancyWeightLbs}
              onChange={(e) => setPrePregnancyWeightLbs(Number(e.target.value))}
              step="0.1"
            />
            <button
              type="button"
              className="text-x"
              onClick={() => setUseMetricWeight(!useMetricWeight)}
            >
              {useMetricWeight ? "lbs" : "kg"}
            </button>
          </div>
        </div>
      );
    }
  }

  // Helper to display current weight input based on current unit
  function renderCurrentWeightInput() {
    if (weightUnit === "kg") {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Your Current Weight ({weightUnit}):
          </label>
          <input
            type="number"
            step="0.1"
            className="border border-gray-300 rounded p-2 w-full"
            placeholder={`Enter current weight in ${weightUnit}`}
            value={currentWeightKg}
            onChange={(e) => setCurrentWeightKg(Number(e.target.value))}
          />
        </div>
      );
    } else {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Your Current Weight ({weightUnit}):
          </label>
          <input
            type="number"
            step="0.1"
            className="border border-gray-300 rounded p-2 w-full"
            placeholder={`Enter current weight in ${weightUnit}`}
            value={currentWeightLbs}
            onChange={(e) => setCurrentWeightLbs(Number(e.target.value))}
          />
        </div>
      );
    }
  }

  return (
    <div
      className="flex flex-col gap-4 p-4 min-h-screen"
      style={{ backgroundColor: secondaryColor }}
    >
      {/* Before Pregnancy Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div style={sectionHeaderStyle}>
          <h3 className="text-lg font-semibold" style={{ color: primaryColor }}>
            Before pregnancy
          </h3>
          <span className="material-icons" style={iconStyle}>
            <IoBody size={24} />
          </span>
        </div>
        <div className="mt-4">
          {renderHeightInput()}
          {renderPrePregWeightInput()}

          {/* BMI Display */}
          <div className="border-t pt-4">
            <label className="block text-sm font-medium mb-1">
              BMI (Body Mass Index)
            </label>
            <div className="text-lg font-semibold">{bmiBefore}</div>
            <div className="text-sm" style={{ color: primaryColor }}>
              {bmiMessage}
            </div>
          </div>
        </div>
      </div>

      {/* During Pregnancy Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div style={sectionHeaderStyle}>
          <h3 className="text-lg font-semibold" style={{ color: primaryColor }}>
            Weight during pregnancy
          </h3>
          <span className="material-icons" style={iconStyle}>
            <MdOutlineBedroomBaby size={24} />
          </span>
        </div>
        <div className="mt-4">
          {/* Week Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Week:</label>
            <select
              className="w-full border border-gray-300 rounded p-2"
              value={currentWeek}
              onChange={(e) => setCurrentWeek(Number(e.target.value))}
            >
              {Array.from({ length: 40 }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          {/* Twins Checkbox */}
          <div className="flex items-center mb-4 gap-2">
            <input
              type="checkbox"
              checked={isTwins}
              onChange={(e) => setIsTwins(e.target.checked)}
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label className="text-sm font-medium">Twins</label>
          </div>

          {renderCurrentWeightInput()}

          {/* Recommended Ranges */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Minimum weight:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                disabled
                className="border border-gray-300 rounded p-2 w-full bg-gray-100"
                value={recommendedLow}
              />
              <span className="self-center">{weightUnit}</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Maximum weight:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                disabled
                className="border border-gray-300 rounded p-2 w-full bg-gray-100"
                value={recommendedHigh}
              />
              <span className="self-center">{weightUnit}</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Minimum weight gain:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                disabled
                className="border border-gray-300 rounded p-2 w-full bg-gray-100"
                value={recommendedGainMin}
              />
              <span className="self-center">{weightUnit}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Maximum weight gain:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                disabled
                className="border border-gray-300 rounded p-2 w-full bg-gray-100"
                value={recommendedGainMax}
              />
              <span className="self-center">{weightUnit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weight Gain Chart Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div style={sectionHeaderStyle}>
          <h3 className="text-lg font-semibold" style={{ color: primaryColor }}>
            Weight gain chart
          </h3>
          <span className="material-icons" style={iconStyle}>
            <MdAutoGraph size={24} />
          </span>
        </div>

        <WeightGainChart
          chartData={chartData}
          currentWeek={currentWeek}
          currentWeight={currentWeight}
          recommendedLow={recommendedLowNum}
          recommendedHigh={recommendedHighNum}
          weightUnit={weightUnit}
          primaryColor={primaryColor}
        />
      </div>
    </div>
  );
}

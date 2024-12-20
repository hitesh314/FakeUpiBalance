"use client";
// components/BreastfeedingWeightLossCalculator.jsx

import { useState } from "react";
import { FaInfo } from "react-icons/fa";

export default function BreastfeedingWeightLossCalculator() {
  // Weight State
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("lbs"); // "lbs" or "kg"

  // Height State
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightUnit, setHeightUnit] = useState("imperial"); // "imperial" or "metric"

  // Other Inputs
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [milkProduction, setMilkProduction] = useState("no");

  // Results
  const [bmr, setBmr] = useState(null);
  const [activeCalories, setActiveCalories] = useState(null);
  const [totalCalories, setTotalCalories] = useState(null);

  // Fun Facts Toggle
  const [showFunFacts, setShowFunFacts] = useState(false);

  // Handle Weight Unit Change with Conversion
  const handleWeightUnitChange = (e) => {
    const newUnit = e.target.value;
    if (weight !== "") {
      const weightVal = parseFloat(weight);
      if (!isNaN(weightVal) && weightVal > 0) {
        if (newUnit === "kg") {
          setWeight((weightVal / 0.453592).toFixed(2));
        } else {
          setWeight((weightVal * 0.453592).toFixed(2));
        }
      }
    }
    setWeightUnit(newUnit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ageYears = parseFloat(age);
    if (isNaN(ageYears) || ageYears <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    // Validate and convert weight
    const weightVal = parseFloat(weight);
    if (isNaN(weightVal) || weightVal <= 0) {
      alert("Please enter a valid weight.");
      return;
    }

    let weightKg;
    if (weightUnit === "lbs") {
      // Convert lbs to kg
      weightKg = weightVal * 0.453592;
    } else {
      // Already in kg
      weightKg = weightVal;
    }

    // Validate and convert height
    let heightCmVal;
    if (heightUnit === "imperial") {
      const feetVal = parseFloat(heightFeet);
      const inchesVal = parseFloat(heightInches);

      if (
        isNaN(feetVal) ||
        feetVal < 0 ||
        isNaN(inchesVal) ||
        inchesVal < 0 ||
        inchesVal >= 12
      ) {
        alert("Please enter a valid height in feet and inches.");
        return;
      }

      const totalInches = feetVal * 12 + inchesVal;
      heightCmVal = totalInches * 2.54;
    } else {
      const cmVal = parseFloat(heightCm);
      if (isNaN(cmVal) || cmVal <= 0) {
        alert("Please enter a valid height in centimeters.");
        return;
      }
      heightCmVal = cmVal;
    }

    // Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation for females
    const bmrValue = 10 * weightKg + 6.25 * heightCmVal - 5 * ageYears - 161;

    // Activity Level Multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extra_active: 1.9,
    };

    const activityMultiplier = activityMultipliers[activityLevel] || 1.2;

    // Calculate Active Calories
    const activeCal = bmrValue * activityMultiplier;

    // Additional calories for breastfeeding
    const additionalCalories = milkProduction === "yes" ? 500 : 0;

    // Total Calories
    const totalCal = activeCal + additionalCalories;

    setBmr(bmrValue.toFixed(2));
    setActiveCalories(activeCal.toFixed(2));
    setTotalCalories(totalCal.toFixed(2));
  };

  return (
    <div className="flex flex-col py-4 px-6 border rounded-xl border-gray-300">
      {/* Header Section with Toggleable Fun Facts */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-semibold">
          Breastfeeding Weight Loss Calculator
        </span>
        {/* Info Icon */}
        <button
          onClick={() => setShowFunFacts(!showFunFacts)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Toggle Fun Facts"
        >
          <FaInfo size={20} />
        </button>
      </div>

      {showFunFacts && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg transition-all duration-300 ease-in-out">
          <h2 className="text-lg font-semibold mb-2">
            📚 Fun Facts About Breastfeeding
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              Breastfeeding can burn approximately 500 extra calories per day.
            </li>
            <li>
              Adequate calorie intake is crucial for maintaining milk supply.
            </li>
            <li>Rapid weight loss may negatively affect milk production.</li>
            <li>
              A balanced diet supports both your health and your baby's growth.
            </li>
            <li>Staying hydrated is essential while breastfeeding.</li>
          </ul>
        </div>
      )}

      <p className="text-sm text-gray-600 mb-6">
        Complete the information below to determine how many calories you need
        to maintain, lose, or gain weight while breastfeeding.
      </p>

      {/* Calculator Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Weight Input with Unit Selection */}
        <div>
          <label htmlFor="weight" className="block font-medium mb-1">
            Weight:
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight..."
              className="border border-gray-300 rounded-t sm:rounded-l sm:rounded-r-none w-full sm:w-2/3 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
              min="0"
              step="any"
              aria-label="Weight input"
            />
            <div className="relative sm:ml-2 mt-2 sm:mt-0">
              <select
                value={weightUnit}
                onChange={handleWeightUnitChange}
                className="appearance-none bg-white border border-gray-300 rounded sm:rounded-r p-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
                aria-label="Weight unit selection"
              >
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
              {/* Custom Dropdown Icon */}
            </div>
          </div>
        </div>

        {/* Height Input with Toggle Between Imperial and Metric */}
        <div>
          <label className="block font-medium mb-1">Height:</label>
          <div className="mb-2">
            <label className="mr-4 flex items-center">
              <input
                type="radio"
                name="heightUnit"
                value="imperial"
                checked={heightUnit === "imperial"}
                onChange={(e) => setHeightUnit(e.target.value)}
                className="form-radio text-primary-600"
                aria-checked={heightUnit === "imperial"}
              />
              <span className="ml-2">Feet/Inches</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="heightUnit"
                value="metric"
                checked={heightUnit === "metric"}
                onChange={(e) => setHeightUnit(e.target.value)}
                className="form-radio text-primary-600"
                aria-checked={heightUnit === "metric"}
              />
              <span className="ml-2">Centimeters</span>
            </label>
          </div>

          {heightUnit === "imperial" ? (
            <div className="flex flex-col sm:flex-row sm:space-x-2">
              <div className="flex-1">
                <input
                  id="heightFeet"
                  type="number"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  placeholder="Feet"
                  className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  min="0"
                  aria-label="Height in feet"
                />
              </div>
              <div className="flex-1 mt-2 sm:mt-0">
                <input
                  id="heightInches"
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  placeholder="Inches"
                  className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  min="0"
                  max="11"
                  aria-label="Height in inches"
                />
              </div>
            </div>
          ) : (
            <div className="mt-2 sm:mt-0">
              <input
                id="heightCm"
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder="Centimeters"
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
                min="0"
                step="any"
                aria-label="Height in centimeters"
              />
            </div>
          )}
        </div>

        {/* Age Input */}
        <div>
          <label htmlFor="age" className="block font-medium mb-1">
            Age (years):
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age..."
            className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
            min="0"
            aria-label="Age input"
          />
        </div>

        {/* Activity Level */}
        <div>
          <label htmlFor="activityLevel" className="block font-medium mb-1">
            Activity Level:
          </label>
          <select
            id="activityLevel"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Activity level selection"
          >
            <option value="sedentary">
              Little to no exercise in a day; &lt; 5,000 steps per day
            </option>
            <option value="lightly_active">
              Lightly Active (light exercise/sports 1-3 days/week)
            </option>
            <option value="moderately_active">
              Moderately Active (moderate exercise/sports 3-5 days/week)
            </option>
            <option value="very_active">
              Very Active (hard exercise/sports 6-7 days a week)
            </option>
            <option value="extra_active">
              Extra Active (very hard exercise/sports & physical job)
            </option>
          </select>
        </div>

        {/* Milk Production */}
        <div>
          <label className="block font-medium mb-1">
            Do you know how much milk you make per day?
          </label>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <label className="inline-flex items-center mb-2 sm:mb-0">
              <input
                type="radio"
                name="milkProduction"
                value="yes"
                checked={milkProduction === "yes"}
                onChange={(e) => setMilkProduction(e.target.value)}
                className="form-radio text-primary"
                aria-checked={milkProduction === "yes"}
              />
              <span className="ml-2">
                Yes (Common when exclusively pumping)
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="milkProduction"
                value="no"
                checked={milkProduction === "no"}
                onChange={(e) => setMilkProduction(e.target.value)}
                className="form-radio text-primary"
                aria-checked={milkProduction === "no"}
              />
              <span className="ml-2">
                No (Common when feeding at the breast)
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Calculate Calories
        </button>
      </form>

      {/* Result Display */}
      {(bmr || activeCalories || totalCalories) && (
        <div className="mt-6 p-4 bg-blue-100 border border-primary rounded">
          <p className="font-semibold text-primary">Your Caloric Needs:</p>
          {bmr && (
            <p className="mt-2 text-primary">
              <span className="font-medium">Basal Metabolic Rate (BMR):</span>{" "}
              {bmr} kcal/day
            </p>
          )}
          {activeCalories && (
            <p className="mt-1 text-primary">
              <span className="font-medium">Active Calories:</span>{" "}
              {activeCalories} kcal/day
            </p>
          )}
          {totalCalories && (
            <p className="mt-1 text-primary">
              <span className="font-medium">
                Total Calories per day to maintain CURRENT weight:
              </span>{" "}
              {totalCalories} kcal/day
            </p>
          )}
        </div>
      )}

      {/* Encouragement Message */}
      {(activeCalories || totalCalories) && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
          <p className="text-green-700">
            We encourage you to embrace self-compassion during the postpartum
            period and prioritize the health of both you and your baby. Your
            body has accomplished a wonderful miracle and merits nurturing and
            respect.
          </p>
        </div>
      )}

      {/* Disclaimer */}
      {(activeCalories || totalCalories) && (
        <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
          <p className="text-red-700">
            <strong>Disclaimer:</strong> All values are estimates and do not
            guarantee weight loss, weight gain, an adequate milk supply, or
            sufficient calorie intake while breastfeeding. Inadequate calorie
            consumption can impact milk supply. Please contact your personal
            healthcare provider if you are unsure how many calories you should
            be consuming. Accurate determination of the calories you burn can
            only be accomplished by individual physiological testing. Weight
            loss is generally not recommended while pregnant.
          </p>
        </div>
      )}
    </div>
  );
}

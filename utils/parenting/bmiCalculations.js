export function calculateBMI(
  weight,
  heightFt,
  heightIn,
  heightCm,
  weightUnit,
  heightUnit
) {
  let weightKg;
  let heightM;

  // Convert weight to kg
  weightKg = weightUnit === "lbs" ? weight * 0.45359237 : weight;

  // Convert height to meters
  if (heightUnit === "ftin") {
    const totalInches = heightFt * 12 + heightIn;
    heightM = totalInches * 0.0254;
  } else {
    heightM = heightCm / 100;
  }

  if (heightM <= 0) return 0;
  return weightKg / (heightM * heightM);
}

export function getBMICategory(bmi) {
  if (bmi < 18.5) return "You are underweight.";
  if (bmi >= 25 && bmi < 30) return "You are overweight.";
  if (bmi >= 30) return "You are obese.";
  return "You are within normal limits!";
}

export function getRecommendedWeights(prePregnancyWeight, currentWeek) {
  const recommendedLow = prePregnancyWeight + currentWeek * 0.32;
  const recommendedHigh = prePregnancyWeight + currentWeek * 0.54;
  const recommendedGainMin = recommendedLow - prePregnancyWeight;
  const recommendedGainMax = recommendedHigh - prePregnancyWeight;

  return {
    recommendedLow: recommendedLow.toFixed(1),
    recommendedHigh: recommendedHigh.toFixed(1),
    recommendedGainMin: recommendedGainMin.toFixed(1),
    recommendedGainMax: recommendedGainMax.toFixed(1),
  };
}

export function generateChartData(prePregnancyWeight) {
  const weeksArray = Array.from({ length: 40 }, (_, i) => i + 1);
  return weeksArray.map((week) => ({
    week,
    low: prePregnancyWeight + week * 0.32,
    high: prePregnancyWeight + week * 0.54,
  }));
}

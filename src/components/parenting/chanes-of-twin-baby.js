"use client";
// components/TwinChanceCalculator.jsx
// components/TwinChanceCalculator.jsx

import { useState } from "react";

export default function TwinChanceCalculator() {
  const [art, setArt] = useState(false);
  const [twinsMotherSide, setTwinsMotherSide] = useState(false);
  const [twinsFatherSide, setTwinsFatherSide] = useState(false);
  const [previousTwins, setPreviousTwins] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Base chance for dizygotic twins: ~1.18% (1 in 85)
    let baseChance = 1.18;

    // Initialize total chance with base
    let totalChance = baseChance;

    // Define factors and their assumed percentage increases
    const factors = [];

    if (art) {
      // ART (e.g., IVF) can increase chance significantly
      factors.push({ name: "ART (e.g., IVF)", increase: 2.0 });
    }

    if (twinsMotherSide) {
      // Family history on mother's side
      factors.push({ name: "Family history (mother's side)", increase: 0.75 });
    }

    if (twinsFatherSide) {
      // Family history on father's side
      factors.push({ name: "Family history (father's side)", increase: 0.5 });
    }

    if (previousTwins) {
      // Previous pregnancy with twins
      factors.push({ name: "Previous pregnancy with twins", increase: 1.25 });
    }

    const h = parseFloat(height);
    if (!isNaN(h) && h > 170) {
      // Height over 170 cm
      factors.push({ name: "Height over 170 cm", increase: 0.3 });
    }

    const w = parseFloat(weight);
    if (!isNaN(w) && w > 80) {
      // Weight over 80 kg
      factors.push({ name: "Weight over 80 kg", increase: 0.3 });
    }

    // Sum all percentage increases
    const totalIncrease = factors.reduce(
      (acc, factor) => acc + factor.increase,
      0
    );

    // Calculate final chance
    totalChance += totalIncrease;

    // Cap the chance at a reasonable maximum (e.g., 10%)
    if (totalChance > 10) totalChance = 10;

    // Format the result to two decimal places
    const formattedChance = totalChance.toFixed(2);

    setResult({
      chance: formattedChance,
      factors,
    });
  };

  return (
    <div className="flex flex-col  py-2 px-6 border rounded-xl border-1">
      {/* Fun Facts Section */}
      {/* Calculator Title and Description */}
      <span className="text-[24px] sm:text-3xl py-2">
        Chances of having twins calculator
      </span>

      <p className="text-sm text-gray-600 mb-4">
        This tool provides a rough, non-medical estimate of your chances of
        conceiving twins based on various factors. For accurate information,
        consult a healthcare professional.
      </p>

      {/* Calculator Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ART Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            id="art"
            type="checkbox"
            checked={art}
            onChange={() => setArt(!art)}
            className="h-4 w-4 text-primary border-gray-300 rounded"
          />
          <label htmlFor="art" className="font-medium">
            Pregnancy with the help of ART (e.g., IVF)
          </label>
        </div>

        {/* Family History - Mother's Side */}
        <div className="flex items-center space-x-2">
          <input
            id="twinsMotherSide"
            type="checkbox"
            checked={twinsMotherSide}
            onChange={() => setTwinsMotherSide(!twinsMotherSide)}
            className="h-4 w-4 text-primary border-gray-300 rounded"
          />
          <label htmlFor="twinsMotherSide" className="font-medium">
            Twins in the family (mother's side)
          </label>
        </div>

        {/* Family History - Father's Side */}
        <div className="flex items-center space-x-2">
          <input
            id="twinsFatherSide"
            type="checkbox"
            checked={twinsFatherSide}
            onChange={() => setTwinsFatherSide(!twinsFatherSide)}
            className="h-4 w-4 text-primary border-gray-300 rounded"
          />
          <label htmlFor="twinsFatherSide" className="font-medium">
            Twins in the family (father's side)
          </label>
        </div>

        {/* Previous Twins Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            id="previousTwins"
            type="checkbox"
            checked={previousTwins}
            onChange={() => setPreviousTwins(!previousTwins)}
            className="h-4 w-4 text-primary border-gray-300 rounded"
          />
          <label htmlFor="previousTwins" className="font-medium">
            Previous pregnancy with twins
          </label>
        </div>

        {/* Mother's Height */}
        <div>
          <label htmlFor="height" className="block font-medium mb-1">
            Mother's height (cm)
          </label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g., 170"
            className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Mother's Weight */}
        <div>
          <label htmlFor="weight" className="block font-medium mb-1">
            Mother's weight (kg)
          </label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 70"
            className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Calculate Chances
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
          <p className="font-semibold text-green-800">Result:</p>
          <p className="mt-2 text-green-700">
            Based on your inputs, your chances of conceiving twins are{" "}
            <span className="font-bold">{result.chance}%</span>.
          </p>
          {result.factors.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-green-800">
                Factors Considered:
              </p>
              <ul className="list-disc list-inside text-green-700 mt-2">
                {result.factors.map((factor, index) => (
                  <li key={index}>
                    {factor.name} (+{factor.increase}%)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

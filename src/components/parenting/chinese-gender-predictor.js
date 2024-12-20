"use client";
import { useState } from "react";
import { chineseBirthChart } from "@@/config/parenting/chinese-gender-predictor";

const ChineseGenderPredictor = () => {
  const [age, setAge] = useState("");
  const [month, setMonth] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Simplified gender prediction logic
  const predictGender = (age, month) => {
    // Convert inputs to numbers
    const motherAge = parseInt(age, 10);
    const conceptionMonth = parseInt(month, 10);

    if (
      isNaN(motherAge) ||
      isNaN(conceptionMonth) ||
      conceptionMonth < 1 ||
      conceptionMonth > 12
    ) {
      return "Invalid input. Please enter a valid age and a month (1-12).";
    }

    if (!chineseBirthChart[motherAge]) {
      return "Age not supported by this chart. Valid for ages 18-45.";
    }

    const result = chineseBirthChart[motherAge][conceptionMonth - 1];
    return result === "G" ? "Girl" : "Boy";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (age === "" || month === "") {
      setError("Please enter both age and conception month.");
      setResult(null);
      return;
    }
    const prediction = predictGender(age, month);
    setResult(prediction);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Chinese Baby Gender Calculator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Mother's Age at Conception
          </label>
          <input
            type="number"
            id="age"
            name="age"
            min="10"
            max="60"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter age"
            required
          />
        </div>
        <div>
          <label
            htmlFor="month"
            className="block text-sm font-medium text-gray-700"
          >
            Conception Month
          </label>
          <select
            id="month"
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
          >
            <option value="">Select month</option>
            {[...Array(12)].map((_, idx) => (
              <option key={idx + 1} value={idx + 1}>
                {idx + 1}{" "}
                {new Date(0, idx).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary transition duration-200"
        >
          Predict Gender
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-md text-center">
          <p className="text-lg font-semibold">
            Predicted Gender: <span className="text-primary">{result}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ChineseGenderPredictor;

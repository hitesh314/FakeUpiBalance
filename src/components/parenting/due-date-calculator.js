"use client";
import React, { useState } from "react";

export const DueDateCalculator = () => {
  const [method, setMethod] = useState("Last Period");
  const [inputDate, setInputDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [weeks, setWeeks] = useState(0);
  const [days, setDays] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const calculatePregnancy = () => {
    if (!inputDate) {
      alert(`Please provide the date for ${method} method.`);
      return null;
    }

    const input = new Date(inputDate);
    const today = new Date();
    const diffInMs = today - input; // Difference in milliseconds
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert to days
    return diffInDays;
  };

  const calculate = () => {
    if (!inputDate) return;

    let gestationalAgeDays;
    if (method === "Last Period") {
      gestationalAgeDays = calculatePregnancy();
    } else if (method === "Conception Date") {
      gestationalAgeDays = calculatePregnancy() + 14; // Add 14 days for conception
    } else if (method === "Ultrasound") {
      gestationalAgeDays = calculatePregnancy(); // Treat input as exact gestational age
    }

    if (gestationalAgeDays === null) return;

    // Check if duration exceeds 280 days
    if (gestationalAgeDays > 280) {
      setErrorMessage("The date has passed. Please contact a doctor.");
      setShowResult(false);
      return;
    }

    const weeksPreg = Math.floor(gestationalAgeDays / 7); // Complete weeks pregnant
    const daysPreg = gestationalAgeDays % 7; // Remaining days
    const totalDaysToAdd = 280 - gestationalAgeDays; // Total pregnancy duration minus elapsed time

    const due = new Date();
    due.setDate(due.getDate() + totalDaysToAdd); // Add remaining days to today's date

    setDueDate(due.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    setWeeks(weeksPreg);
    setDays(daysPreg);
    setShowResult(true);
    setErrorMessage(""); // Clear error message
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Pregnancy Due Date Calculator
      </h2>

      <div className="mb-4">
        <label
          htmlFor="method"
          className="block text-gray-700 font-medium mb-2"
        >
          Calculation Method
        </label>
        <select
          id="method"
          name="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Last Period">Last Period</option>
          <option value="Conception Date">Conception Date</option>
          <option value="Ultrasound">Ultrasound</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="inputDate"
          className="block text-gray-700 font-medium mb-2"
        >
          {method === "Last Period"
            ? "First day of your last period"
            : method === "Conception Date"
            ? "Conception Date"
            : "Gestational Age Date"}
        </label>
        <input
          id="inputDate"
          type="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary transition duration-200"
      >
        Calculate My Due Date
      </button>

      {errorMessage && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p>{errorMessage}</p>
        </div>
      )}

      {showResult && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
          <p className="mb-2">
            🎉 Congratulations! You are {weeks} weeks and {days} days pregnant.
          </p>
          <p>
            Your due date is: <span className="font-semibold">{dueDate}</span>{" "}
            👶
          </p>
        </div>
      )}
    </div>
  );
};

export default DueDateCalculator;

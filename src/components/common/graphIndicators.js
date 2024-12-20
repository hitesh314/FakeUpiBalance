"use client";

import { AreaClosed, LinePath } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { TooltipInPortal, useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { createScales, getTooltipData } from "@@/utils/parenting/bmiCharts";
import React from "react";

const tooltipStyles = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "white",
  padding: "8px",
  borderRadius: "4px",
  fontSize: "12px",
  pointerEvents: "none",
};

export default function WeightGainChart({
  chartData,
  currentWeek,
  currentWeight,
  recommendedLow,
  recommendedHigh,
  weightUnit,
  primaryColor = "#0E8E72",
  width = 700,
  height = 350,
  margin = { top: 20, right: 20, bottom: 40, left: 40 },
}) {
  const { xScale, yScale } = createScales(chartData, width, height, margin);

  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } =
    useTooltip();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });

  const handleTooltip = (event) => {
    const coords = localPoint(event) || { x: 0 };
    const d = getTooltipData(coords, chartData, xScale);
    showTooltip({
      tooltipData: d,
      tooltipLeft: xScale(d.week),
      tooltipTop: yScale(d.high),
    });
  };

  // Determine if current weight is within range
  const isAboveRange = currentWeight > recommendedHigh;
  const isBelowRange = currentWeight < recommendedLow;
  const currentWeightColor =
    isAboveRange || isBelowRange ? "#ff0000" : primaryColor;

  return (
    <div ref={containerRef} className="overflow-auto mt-4">
      <svg
        width={width}
        height={height}
        onMouseMove={handleTooltip}
        onMouseLeave={hideTooltip}
      >
        <rect width={width} height={height} fill="#f9f9f9" />
        <Group>
          <AxisBottom
            scale={xScale}
            top={height - margin.bottom}
            label="Week"
            labelProps={{
              fill: "#000",
              fontSize: 12,
              textAnchor: "middle",
            }}
            tickFormat={(d) => `${d}`}
          />
          <AxisLeft
            scale={yScale}
            left={margin.left}
            label={`Weight (${weightUnit})`}
            labelProps={{
              fill: "#000",
              fontSize: 12,
              textAnchor: "middle",
              transform: "rotate(-90)",
            }}
          />

          <AreaClosed
            data={chartData}
            x={(d) => xScale(d.week)}
            y0={(d) => yScale(d.low)}
            y1={(d) => yScale(d.high)}
            fill="rgba(14, 142, 114, 0.1)"
            stroke="none"
          />

          {/* Min Weight (Low) */}
          <LinePath
            data={chartData}
            x={(d) => xScale(d.week)}
            y={(d) => yScale(d.low)}
            stroke={primaryColor}
            strokeWidth={2}
          />

          {/* Max Weight (High) */}
          <LinePath
            data={chartData}
            x={(d) => xScale(d.week)}
            y={(d) => yScale(d.high)}
            stroke="#ff5722"
            strokeWidth={2}
          />

          {/* Current Weight Point */}
          {chartData.map(
            (d) =>
              d.week === currentWeek && (
                <circle
                  key={`current-weight-${d.week}`}
                  cx={xScale(d.week)}
                  cy={yScale(currentWeight)}
                  r={4}
                  fill={currentWeightColor}
                  stroke="#fff"
                  strokeWidth={2}
                />
              )
          )}

          {tooltipData && (
            <>
              {/* Vertical line */}
              <line
                x1={tooltipLeft}
                y1={margin.top}
                x2={tooltipLeft}
                y2={height - margin.bottom}
                stroke="rgba(0,0,0,0.1)"
                strokeDasharray="5,5"
              />

              {/* Low Weight Circle */}
              <circle
                cx={xScale(tooltipData.week)}
                cy={yScale(tooltipData.low)}
                r={3}
                fill={primaryColor}
                stroke="#fff"
                strokeWidth={1}
              />

              {/* High Weight Circle */}
              <circle
                cx={xScale(tooltipData.week)}
                cy={yScale(tooltipData.high)}
                r={3}
                fill="#ff5722"
                stroke="#fff"
                strokeWidth={1}
              />

              {/* Current Weight Circle if applicable */}
              {tooltipData.week === currentWeek && (
                <circle
                  cx={xScale(tooltipData.week)}
                  cy={yScale(currentWeight)}
                  r={3}
                  fill={currentWeightColor}
                  stroke="#fff"
                  strokeWidth={1}
                />
              )}
            </>
          )}
        </Group>
      </svg>

      {tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div>
            <strong>Week {tooltipData.week}</strong>
          </div>
          <div style={{ color: primaryColor }}>
            Min Size: {tooltipData.low.toFixed(1)} {weightUnit}
          </div>
          <div style={{ color: "#ff5722" }}>
            Max Size: {tooltipData.high.toFixed(1)} {weightUnit}
          </div>
          {tooltipData.week === currentWeek && (
            <div>
              Your Current Weight: {currentWeight} {weightUnit} -{" "}
              {isAboveRange
                ? "Above recommended range"
                : isBelowRange
                ? "Below recommended range"
                : "Within recommended range"}
            </div>
          )}
        </TooltipInPortal>
      )}
    </div>
  );
}

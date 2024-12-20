// utils/chartHelpers.js
import { scaleLinear } from "@visx/scale";
import { bisector } from "d3-array";

export function createScales(chartData, width, height, margin) {
  const xScale = scaleLinear({
    domain: [1, 40],
    range: [margin.left, width - margin.right],
  });

  const yMin = Math.min(...chartData.map((d) => d.low)) - 5;
  const yMax = Math.max(...chartData.map((d) => d.high)) + 5;
  const yScale = scaleLinear({
    domain: [yMin, yMax],
    range: [height - margin.bottom, margin.top],
    nice: true,
  });

  return { xScale, yScale };
}

export function getTooltipData(event, chartData, xScale) {
  const bisectWeek = bisector((d) => d.week).left;
  const { x } = event || { x: 0 };
  const x0 = xScale.invert(x);
  const index = bisectWeek(chartData, x0, 1);
  const d0 = chartData[index - 1];
  const d1 = chartData[index];

  let d = d0;
  if (d1 && d1.week) {
    d = x0 - d0.week > d1.week - x0 ? d1 : d0;
  }
  return d;
}

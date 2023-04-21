import React, { useEffect, useMemo, useState } from "react";

const CurvedLine = ({
  height,
  useLinearSegments,
  strokeColor,
  strokeOnly,
  dashArray,
}) => {
  const [width, setWidth] = useState(window.innerWidth + 25);
  const peakCount = useMemo(() => Math.floor(width / 274) + 1, [width]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth + 25);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define the peak points
  const peakHeight = height / 2;
  // Calculate the peak points
  const peakPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < peakCount; i++) {
      const x = (i / (peakCount - 1)) * width;
      let y = peakHeight;

      // Add a composite wave
      const numWaves = 3;
      for (let j = 0; j < numWaves; j++) {
        const amplitude = Math.random() * peakHeight * 0.5;
        const frequency = (j + 1) * 5;
        const phase = Math.random() * Math.PI * 2;
        y += amplitude * Math.cos(frequency * x * 0.01 + phase);
      }

      points.push([x, y]);
    }

    // Randomize start and end points
    const yOffset = peakHeight * 0.25;
    points[0][1] += Math.random() * yOffset - yOffset / 2;
    points[points.length - 1][1] += Math.random() * yOffset - yOffset / 2;

    return points;
  }, [peakCount, peakHeight, width]);

  // Create the line segments
  const segments = [];
  for (let i = 0; i < peakCount - 1; i++) {
    const p0 = peakPoints[i];
    const p1 = peakPoints[i + 1];
    if (useLinearSegments) {
      segments.push(`L${p1[0]},${p1[1]}`);
    } else {
      const dx = p1[0] - p0[0];
      segments.push(
        `C${p0[0] + dx / 3},${p0[1]},${p1[0] - dx / 3},${p1[1]},${p1[0]},${
          p1[1]
        }`
      );
    }
  }

  // Construct the SVG path
  const path = `M0,${height}L${peakPoints[0][0]},${peakHeight}${segments.join(
    ""
  )}L${peakPoints[peakCount - 1][0]},${peakHeight}L${width},${height}`;

  const strokeProps = {
    stroke: strokeColor,
    strokeWidth: 5,
    fill: strokeOnly ? "none" : strokeColor,
    strokeDasharray: dashArray ? dashArray : "none",
  };

  return (
    <svg
      className="curvedLine"
      style={{ transform: "translate3d(0,3%,0)" }}
      width={width}
      height={height}
    >
      <path d={path} {...strokeProps} />
    </svg>
  );
};

export default CurvedLine;

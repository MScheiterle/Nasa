import React from "react";

class CurvedLine extends React.Component {
  render() {
    const {
      peakCount,
      height,
      useLinearSegments,
      strokeColor,
      strokeOnly,
      dashArray,
    } = this.props;
    const width = window.innerWidth;

    // Define the peak points
    const peakPoints = [];
    const peakHeight = height / 2;
    for (let i = 0; i < peakCount; i++) {
      const x = (i / (peakCount - 1)) * width;
      const y = peakHeight + Math.random() * peakHeight;
      peakPoints.push([x, y]);
    }

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
    };

    return (
      <svg
        style={{ transform: "translate3d(0,3%,0)" }}
        width={width}
        height={height}
      >
        <path d={path} stroke-dasharray={dashArray} {...strokeProps} />
      </svg>
    );
  }
}

export default CurvedLine;

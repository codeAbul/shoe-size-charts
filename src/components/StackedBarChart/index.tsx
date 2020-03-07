import React, { FunctionComponent } from "react";
import { OrdinalFrame } from "semiotic";
import useWindowSize from "../../hooks/useWindowSize";
import { TransformDataFn } from "../../types";
import "./StackedBarChart.scss";


const colors = [
  "#ffd700",
  "#ffb14e",
  "#fa8775",
  "#ea5f94",
  "#cd34b5",
  "#9d02d7",
  "#0000ff"
];

// The indexes for stacks in each bar
const rAccessor = ["A", "B", "C", "D", "E", "2A-2E", "3A-3E"];


// sets the colors for each stack in the bar
// ENHANCEMENT- create it programmatically from colors and raccessor arrays

const colorhash: any = {
  "3A-3E": "#ffd700",
  "2A-2E": "#ffb14e",
  E: "#fa8775",
  D: "#ea5f94",
  C: "#cd34b5",
  B: "#9d02d7",
  A: "#0000ff"
};

// ENHANCEMENT: Remove typecasts
// Investigate the types from semiotic source code

const StackedBarChart: FunctionComponent<ReturnType<TransformDataFn>> = ({
  sizingSystem,
  gender,
  data
}) => {
  const { innerWidth, innerHeight } = useWindowSize();
  const frameProps = {
    data,
    // the index to categorize data
    oAccessor: "size",
    // set size relative to window's width and height
    size: [innerWidth! * 0.9, innerHeight! / 3],
    margin: { left: 40, bottom: 40, right: 10, top: 40 },
    // axes
    axes: [
      {
        orient: "left"
      }
    ],
    // enable tooltips on hover over each individual stack
    pieceHoverAnnotation: true,
    type: "bar",
    // title for the chart
    // Enhancement: make it into a seperate component
    title: (
      <text textAnchor={"center"} fontWeight={"bold"} fontSize={"1.2rem"}>
        <tspan fill={"#9d02d7"}>{sizingSystem} - </tspan>
        <tspan fill={"#0000ff"}>{gender}</tspan>
      </text>
    ),

    oPadding: 5,

    oLabel: true,
    rAccessor,
    // every datapoint d has a rIndex prop added which points to the index of the stack
    // if it's for "A" the rIndex would be 0 etc
    style: (d: any) => ({
      fill: colorhash[rAccessor[d.rIndex]],
      stroke: "white"
    }),
    tooltipContent: (d: any) => (
      <div className={"tooltip-content"}>
        {rAccessor[d.rIndex]}: {d[rAccessor[d.rIndex]]}
      </div>
    ),
    foregroundGraphics: Object.keys(colorhash).map((d, i) => (
      <text
        key={d}
        x={innerWidth! * 0.7}
        y={i * 20 + 60}
        fontWeight={"bold"}
        fill={"blue"}
      >
        <tspan fontSize="10" fill={colors[i]}>
          ●
        </tspan>{" "}
        {d}
      </text>
    ))
  };
  return (
    <article className={"chart-container"}>
      <OrdinalFrame {...frameProps} />
    </article>
  );
};

export default StackedBarChart;

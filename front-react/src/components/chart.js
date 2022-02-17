import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function Chart(props) {
  const data = props.data;
  const keys = Object.keys(data);

  const svgRef = useRef(null);
  useEffect(() => {
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.time), d3.max(data, (d) => d.time)])
      .range([0, 600]);
    const svgElement = d3.select(svgRef.current);
    const axisgenerator = d3.axisBottom(xScale);
    svgElement.append("g").call(axisgenerator);
  }, [data]);
  //   const svgRef = useRef(null);

  const width = 600;
  const height = 300;
  const margin = { top: 30, right: 30, bottom: 30, left: 60 };
  const dimensions = {
    width,
    height,
    margin,
  };

  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  //   useEffect(() => {
  //     const svgElement = d3.select(svgRef.current);
  //     svgElement
  //       .append("svg")
  //       .selectAll("line")
  //       .attr("width", width + margin.left + margin.right)
  //       .attr("height", height + margin.top + margin.bottom)
  //       .append("g")
  //       .attr("transform", `translate(${margin.left},${margin.top})`);

  //     const sumstat = d3.group(data, (d) => d.zone_1);
  //     console.log(sumstat);

  //     const x = d3
  //       .scaleLinear()
  //       .domain(d3.extent(data, (d) => d.time))
  //       .range([0, width]);

  //     svgElement
  //       .append("g")
  //       .attr("transform", `translate(0, ${height})`)
  //       .call(d3.axisBottom(x).ticks(5));

  //     const y = d3
  //       .scaleLinear()
  //       .domain([0, d3.max(data, (d) => d.value)])
  //       .range([height, 0]);
  //     svgElement.append("g").call(d3.axisLeft(y));

  //     svgElement
  //       .selectAll(".line")
  //       .data(sumstat)
  //       .join("path")
  //       .attr("fill", "none")
  //       //.attr("stroke", function(d){ return color(d[0]) })
  //       .attr("stroke-width", 1.5)
  //       .attr("d", function (d) {
  //         return d3
  //           .line()
  //           .x(function (d) {
  //             return x(d.time);
  //           })
  //           .y(function (d) {
  //             return y(+d.value);
  //           })(d[1]);
  //       });
  //   }, [data]);

  //   const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  //   const width = 460 - margin.left - margin.right;
  //   const height = 400 - margin.top - margin.bottom;

  return (
    <svg
      style={{ border: "2px solid gold" }}
      ref={svgRef}
      width={svgWidth}
      height={svgHeight}
    />
  );
  //   const svgRef = React.useRef(null);
  //   const width = 600;
  //   const height = 300;
  //   const margin = { top: 30, right: 30, bottom: 30, left: 60 };
  //   const dimensions = {
  //     width,
  //     height,
  //     margin,
  //   };

  //   const svgWidth = width + margin.left + margin.right;
  //   const svgHeight = height + margin.top + margin.bottom;

  //   useEffect(() => {
  //     const xScale = d3
  //       .scaleTime()
  //       .domain(d3.extent(data[keys[0]], (d) => d.value))
  //       .range([margin.left, width - margin.right]);
  //     let min_key = [];
  //     let max_key = [];

  //     for (let i = 0; i < keys.length; i++) {
  //       let origen = data[keys[i]];
  //       max_key.push(d3.max(origen, (v) => v.value));
  //       min_key.push(d3.min(origen, (v) => v.value));
  //     }
  //     let y_max = d3.max(max_key);
  //     let y_min = d3.min(min_key);

  //     const yScale = d3
  //       .scaleLinear()
  //       .domain([y_min, y_max])
  //       .range([height - margin.top, margin.bottom]);

  //     const svgEl = d3.select(svgRef.current);
  //     svgEl.selectAll("*").remove();
  //     const svg = svgEl
  //       .append("g")
  //       .attr("transform", `translate(${margin.left},${margin.top})`);

  //     const xAxis = d3
  //       .axisBottom(xScale)
  //       .ticks(5)
  //       .tickSize(-height + margin.bottom);
  //     const xAxisGroup = svg
  //       .append("g")
  //       .attr("transform", `translate(0, ${height - margin.bottom})`)
  //       .call(xAxis);
  //     xAxisGroup.select(".domain").remove();
  //     xAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
  //     xAxisGroup
  //       .selectAll("text")
  //       .attr("opacity", 0.5)
  //       .attr("color", "white")
  //       .attr("font-size", "0.75rem");

  //     const yAxis = d3
  //       .axisLeft(yScale)
  //       .ticks(5)
  //       .tickSize(-width)
  //       .tickFormat((val) => `${val}%`);
  //     const yAxisGroup = svg.append("g").call(yAxis);
  //     yAxisGroup.select(".domain").remove();
  //     yAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
  //     yAxisGroup
  //       .selectAll("text")
  //       .attr("opacity", 0.5)
  //       .attr("color", "white")
  //       .attr("font-size", "0.75rem");

  //     //for (let i = keys[0]; i < keys.length; i++) {
  //     let data_d = data[keys[0]];
  //     const line = d3
  //       .line()
  //       .x((d) => {
  //         console.log(d.time);
  //         return xScale(d.time);
  //       })
  //       .y((d) => {
  //         console.log(d.value);
  //         return yScale(d.value);
  //       });
  //     svg
  //       .selectAll(".line")
  //       .data(data_d)
  //       .enter()
  //       .append("path")
  //       .attr("fill", "none")
  //       .attr("stroke", (d) => d.color)
  //       .attr("stroke-width", 3)
  //       .attr("d", (d) => {
  //         console.log(d);
  //         console.log(line(d));
  //         return line(d);
  //       });
  //     //}
  //   }, [data]);
  //   return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}
export default Chart;

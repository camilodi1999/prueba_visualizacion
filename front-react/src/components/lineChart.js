import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function LineChart(props) {
  let data = props.data;
  const svgRef = useRef(null);
  useEffect(() => {
    let svgElement = d3.select(svgRef.current);
    let leftMargin = 70;
    let topMargin = 30;

    let xExtent = d3.extent(data, (d) => d.time);
    let xScale = d3.scaleLinear().domain(xExtent).range([leftMargin, 600]);

    let yMax = d3.max(data, (d) => d.value);
    let yScale = d3
      .scaleLinear()
      .domain([0, yMax + topMargin])
      .range([400, 0]);

    let xAxis = d3.axisBottom().scale(xScale);

    svgElement
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,420)")
      .call(xAxis)
      .append("text")
      .attr("x", (900 + 70) / 2) //middle of the xAxis
      .attr("y", "50") // a little bit below xAxis
      .text("Year");

    //yAxis and yAxis label
    let yAxis = d3.axisLeft().scale(yScale).ticks(10);

    svgElement
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${leftMargin},20)`) //use variable in translate
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", "-150")
      .attr("y", "-50")
      .attr("text-anchor", "end")
      .text("Value");

    const sumstat = d3.group(data, (d) => d.zone_1);

    svgElement
      .selectAll(".line")
      .append("g")
      .attr("class", "line")
      .data(sumstat.values())
      .enter()
      .append("path")
      .attr("d", function (d) {
        return d3
          .line()
          .x((d) => xScale(d.time))
          .y((d) => yScale(d.value))
          .curve(d3.curveCardinal)(d);
      })
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1);
  }, [data]);

  return <svg ref={svgRef} width={1000} height={700} />;
}

export default LineChart;

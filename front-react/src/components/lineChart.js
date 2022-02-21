import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function LineChart(props) {
  let data = props.data;
  const svgRef = useRef(null);
  useEffect(() => {
    let svgElement = d3.select(svgRef.current);
    svgElement.selectAll("*").remove();

    let margin = 200;
    let width = 600 - margin;
    let height = 500 - margin;

    let leftMargin = 70;
    let topMargin = 10;

    let xExtent = d3.extent(data, (d) => d.time);
    let xScale = d3.scaleLinear().domain(xExtent).range([0, width]);

    let yMax = d3.max(data, (d) => d.value);
    let yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.value))
      .range([height, 0]);

    let xAxis = d3.axisBottom().scale(xScale);

    let g = svgElement
      .append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");

    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("y", height - 250)
      .attr("x", width - 200)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Year");

    //yAxis and yAxis label
    let yAxis = d3.axisLeft().scale(yScale).ticks(10);

    g.append("g")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -100)
      .attr("y", 6)
      .attr("dy", "-5.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("value");

    const sumstat = d3.group(data, (d) => d.zone_1);

    g.selectAll(".line")
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
          .curve(d3.curveCardinalOpen)(d);
      })
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1);
  }, [data]);

  return (
    <div style={{ paddingTop: "3rem" }}>
      <svg ref={svgRef} width={600} height={500} />
    </div>
  );
}

export default LineChart;

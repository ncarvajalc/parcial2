import * as d3 from "d3";
import { useD3 } from "./useD3";

/* Component */
export const D3Graph = ({ data }) => {
  const width = 600;
  const height = 500;

  const ref = useD3(
    (svg) => {
      const margin = { top: 10, left: 60, bottom: 40, right: 30 };
      const iwidth = width - margin.left - margin.right;
      const iheight = height - margin.top - margin.bottom;

      const g = svg
        .select(".plot")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.id))
        .range([0, iwidth])
        .padding(0.1);
      const y = d3.scaleLinear().domain([0, 10000000]).range([iheight, 0]);

      const bars = g.selectAll("rect").data(data);

      bars
        .enter()
        .append("rect")
        .attr("class", "bar")
        .style("fill", "LightSalmon")
        .attr("x", (d) => x(d.id))
        .attr("y", (d) => y(d.views))
        .attr("height", (d) => iheight - y(d.views))
        .attr("width", x.bandwidth());

      g.select(".x--axis")
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);

      g.select(".y--axis").call(d3.axisLeft(y));
    },
    [data]
  );

  return (
    <svg width={width} height={height} ref={ref}>
      <g className="plot">
        <g className="x--axis"></g>
        <g className="y--axis"></g>
      </g>
    </svg>
  );
};

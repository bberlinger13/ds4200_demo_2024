const data = [12, 29, 35, 45, 45, 55, 60, 70, 85, 100];

const q1 = d3.quantile(data, 0.25);
const median = d3.median(data);
const q3 = d3.quantile(data, 0.75);
const min = d3.min(data);
const max = d3.max(data);

const width = 600;
const height = 400;
const margin = {top: 20, right: 30, bottom: 40, left: 40};

const svg = d3.select("#boxplot")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const boxWidth = 100;
const center = width / 2 - margin.left - margin.right;

const yScale = d3.scaleLinear()
  .domain([min - 10, max + 10])
  .range([height - margin.bottom, margin.top]);

svg.append("rect")
  .attr("x", center - boxWidth / 2)
  .attr("y", yScale(q3))
  .attr("width", boxWidth)
  .attr("height", yScale(q1) - yScale(q3))
  .attr("class", "box");

svg.append("line")
  .attr("x1", center - boxWidth / 2)
  .attr("x2", center + boxWidth / 2)
  .attr("y1", yScale(median))
  .attr("y2", yScale(median))
  .attr("class", "median");

svg.append("line")
  .attr("x1", center)
  .attr("x2", center)
  .attr("y1", yScale(min))
  .attr("y2", yScale(q1))
  .attr("class", "whisker");

svg.append("line")
  .attr("x1", center)
  .attr("x2", center)
  .attr("y1", yScale(q3))
  .attr("y2", yScale(max))
  .attr("class", "whisker");

svg.append("g")
  .attr("transform", `translate(${center - boxWidth / 2}, 0)`)
  .call(d3.axisLeft(yScale));

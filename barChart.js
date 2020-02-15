//import {legend} from "@d3/color-legend"
//d3 = require("d3@5")

margin = ({
  top: 10,
  right: 10,
  bottom: 20,
  left: 40
})

height = 500
width = 1200

formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")


d3.dsv(",","Asia.csv").then(function (data) {
  console.log("data loaded: ");
  console.log(data);

  drawBarChart(data);
});
//file_string = await FileAttachment("uspopulations.csv").text();

function drawBarChart(data) {

  yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.selectAll(".domain").remove())

  xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove())

  series = d3.stack()
    .keys(data.columns.slice(1))
    (data)
    .map(d => (d.forEach(v => v.key = d.key), d))
  console.log(series);

  color = d3.scaleOrdinal()
    .domain(series.map(d => d.key))
    .range(d3.schemeDark2)
    .unknown("#ccc")

  y = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .rangeRound([height - margin.bottom, margin.top])

  x = d3.scaleBand()
    .domain(data.map(d => d["Year of Activity Period"]))
    .range([margin.left, width - margin.right])
    .padding(0.1)

  var canvas = d3.select("#vis")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  canvas.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
    .attr("x", (d, i) => x(d.data["Year of Activity Period"]))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth())
    .append("title")
    .text(d => `${d.data["Year of Activity Period"]} ${d.key}
    ${formatValue(d.data[d.key])}`);

  canvas.append("g")
    .call(xAxis);

  canvas.append("g")
    .call(yAxis);
}

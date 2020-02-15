//import {select,csv} from 'd3';
//const svg = d3.select('svg');

const width = 960;
console.log(width);
const height = 500;
console.log(height);
const svg = d3.select("body")
.append("svg")
.attr("viewBox", [0, 0, width, height]);


// create one rectangle for each row of our data table;
const render = data => {
    const margin = {top:20,right:20,bottom:20,left:20};
    const innerWidth = width - margin.left - margin.right;
    console.log(innerWidth);
    const innerHeight = height - margin.top - margin.bottom;
    console.log(innerHeight);
    //20 here is the number of pixels away from the edge.
    const xScale = d3.scaleLinear()// it should draw 12 ranctangle,it does not
        .domain([0,d3.max(data,d => d.passenger )])
        .range([0,innerWidth]); // this doesnot work
    
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.year))
        .range([0,innerHeight]); // this will cause the data elements to be 
        // arranged from top to bottom
    console.log(xScale.range());// why print 12 times?

    const g = svg.append('g')
        .attr('transform',`translate(${margin.left}),${margin.top}`);

    g.selectAll('rect').data(data)
        .enter().append('rect')
          .attr('y',d=> yScale(d.year))
          .attr('width', d => xScale(d.passenger))
          .attr('height',yScale.bandwidth())// bandwidth is to compute width of a single bar
           // use yScale to set the height of these ranctangles
};
d3.csv('Asia.csv').then(data => {
    data.forEach(d => {
        d.passenger = +d.passenger;
        d.year = +d.year;
        //console.log(JSON.stringify(Object.keys(d)));
        //console.log(Object.keys(d));
        render(data);
    })
    console.log(data);
});

//use d3 linear and band scales to really make these rectangles bars of
//a bar chart that correspond to the data

// construct a linear scale
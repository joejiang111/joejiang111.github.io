// initial colors

//FPL
let green1 = '#0A8A1F';
let green2 = '#0A8A74';
let green3 = '#0A5F8A';

//Age group
let blue1;
let blue2;
let blue3;

//Health
let yellow1, yello2, yello3;

// draw
const col = 10;
const row = 10;
let y = d3.scaleBand().range([0, 200]).domain(d3.range(row));
let x = d3.scaleBand().range([0, 200]).domain(d3.range(col));

let svg = d3
  .select('#viz')
  .append('svg')
  .attr('width', 1000)
  .attr('height', 1000);

let group1 = svg.append('g').attr('width', 600).attr('height', 600);

let group2 = svg.append('g').attr('width', 600).attr('height', 600);

function clean(chartType) {
  if (chartType !== 'group1') {
    group1.selectAll('circle').transition().attr('opacity', 0);
  }
  if (chartType !== 'group2') {
    group2.selectAll('text').transition().attr('opacity', 0);
  }
}

function draw1() {
  //title graph
}

function draw2() {
  clean('group1');
  const debtPer = 0.17;

  group1
    .append('circle')
    .attr('cx', 200)
    .attr('cy', 300)
    .transition()
    .duration(1000)
    .attr('r', 200)

    .attr('fill', 'grey');

  group1
    .append('circle')
    .attr('cx', 200)
    .attr('cy', 460)

    .transition()
    .duration(1500)
    .attr('r', 40)
    .attr('fill', 'orange');
}

function draw3() {
  clean('group2');

  function drawMedi(col, row) {
    let data = d3.range(col * row);
    console.log(data);
    group2
      .append('text')
      .attr('x', 400)
      .attr('y', 100)
      .style('font-size', 30)
      .style('font-family', 'Helvetica')
      .attr('fill', 'black')
      .text('Medical Care');

    group2
      .append('rect')
      .attr('x', 380)
      .attr('y', 70)
      .attr('height', 60)
      .attr('width', 5)
      .attr('fill', 'orange');

    group2
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .transition()

      .delay(function (d, i) {
        return i * 20;
      })
      .duration(200)
      .attr('cx', function (d) {
        return x(d % col) + 340;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 80;
      })
      .attr('r', 8)
      .attr('fill', 'lightgray');
  }

  drawMedi(2, 3);
}

function draw4() {}

function draw5() {}

let activationFunctions = [draw1, draw2, draw3, draw4];

//All the scrolling function
//Will draw a new graph based on the index provided by the scroll

let scroll = scroller().container(d3.select('#graphic'));
scroll();

let lastIndex,
  activeIndex = 0;

scroll.on('active', function (index) {
  // d3.selectAll('.step')
  //   .transition()
  //   .duration(500)
  //   .style('opacity', function (d, i) {
  //     return i === index ? 1 : 0.1;
  //   });

  activeIndex = index;
  let sign = activeIndex - lastIndex < 0 ? -1 : 1;
  let scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
  scrolledSections.forEach((i) => {
    activationFunctions[i]();
  });
  lastIndex = activeIndex;
});

scroll.on('progress', function (index, progress) {
  if ((index == 2) & (progress > 0.7)) {
  }
});

// function cleanViz() {
//   svg.selectAll('g').remove();
// }
function clickFPL() {
  svg
    .selectAll('circle')
    .data(data)
    .transition()
    .delay(function (d, i) {
      return i * 20;
    })
    .duration(1000)
    // .attr('r', 8)
    .attr('stroke-width', 4)
    .attr('stroke', function (d) {
      if (d <= 12) {
        return green1;
      } else if (13 <= d && d <= 37) {
        return green2;
      } else if (38 <= d && d <= 60) {
        return green3;
      } else {
        return 'grey';
      }
    });
}

function getStroke() {}

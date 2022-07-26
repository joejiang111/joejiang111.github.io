// initial

// draw

let svg = d3
  .select('#viz')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600);

let group1 = svg.append('g').attr('width', 600).attr('height', 600);

function draw1() {
  // svg
  //   .append('rect')
  //   .attr('x', 100)
  //   .attr('y', 100)
  //   .attr('width', 100)
  //   .attr('height', 100)
  //   .attr('fill', 'black');
}

function draw2() {
  // cleanViz();
  const debtPer = 0.17;

  group1

    .append('rect')
    .attr('x', 200)
    .attr('y', 200)
    .transition()
    .duration(1000)
    .attr('width', 400)
    .attr('height', 400)
    .attr('rx', '20px')
    .attr('fill', 'grey');

  group1

    .append('rect')
    .attr('x', 200)
    .attr('y', 200)
    .transition()
    .duration(1000)
    .attr('width', 400 * debtPer)
    .attr('height', 400 * debtPer)
    .attr('rx', '20px')
    .attr('fill', 'orange');
}

function draw3() {
  group1.selectAll('rect').attr('opacity', 0);
  group2 = svg.append('g');
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

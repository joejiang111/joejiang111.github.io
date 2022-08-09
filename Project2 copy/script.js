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
// let col;
// let row;
// let y = d3.scaleBand().range([0, 200]).domain(d3.range(row));
// let x = d3.scaleBand().range([0, 200]).domain(d3.range(col));

let svg = d3
  .select('#viz')
  .append('svg')
  .attr('width', 1000)
  .attr('height', 1000);

let group1 = svg.append('g').attr('width', 600).attr('height', 600);

let group2 = svg.append('g').attr('width', 600).attr('height', 600);

let group3 = svg.append('g').attr('width', 600).attr('height', 600);

let group4 = svg.append('g').attr('width', 600).attr('height', 600);

function clean(chartType) {
  if (chartType !== 'group1') {
    group1.selectAll('circle').transition().attr('opacity', 0);
  }
  if (chartType !== 'group2') {
    group2.selectAll('text').transition().attr('opacity', 0);
    group2.selectAll('circle').transition().attr('opacity', 0);
    group2.selectAll('rect').transition().attr('opacity', 0);
  }
  if (chartType !== 'group3') {
    group3.selectAll('text').transition().attr('opacity', 0);
    group3.selectAll('circle').transition().attr('opacity', 0);
    group3.selectAll('path').transition().attr('opacity', 0);
  }
  if (chartType !== 'group4') {
    group4.selectAll('text').transition().attr('opacity', 0);
    group4.selectAll('circle').transition().attr('opacity', 0);
    group4.selectAll('rect').transition().attr('opacity', 0);
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
  let y = d3.scaleBand().range([0, 500]).domain(d3.range(25));
  let x = d3.scaleBand().range([0, 500]).domain(d3.range(25));

  function drawMedi(col, row) {
    let data = d3.range(col * row);
    // y.domain(d3.range(row));
    // x.domain(d3.range(col));

    console.log(data);
    group2
      .append('text')
      .attr('x', 510)
      .attr('y', 110)
      .style('font-size', 30)
      .style('font-family', 'Helvetica')
      .attr('fill', 'black')
      .text('Medical tests');

    group2
      .append('rect')
      .attr('x', 490)
      .attr('y', 70)
      .attr('height', 60)
      .attr('width', 5)
      .attr('fill', '#f15a24');

    group2
      .append('g')
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
        return x(d % col) + 100;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 80;
      })
      .attr('r', 8)
      .attr('fill', '#f15a24')
      .attr('opacity', 0.5);
  }

  function drawOngoing(col, row) {
    let data = d3.range(col * row);
    // y.domain(d3.range(row));
    // x.domain(d3.range(col));
    console.log(data);
    group2
      .append('text')
      .attr('x', 510)
      .attr('y', 210)
      .style('font-size', 30)
      .style('font-family', 'Arial')
      .attr('fill', 'black')
      .text('Ongoing Care');

    group2
      .append('rect')
      .attr('x', 490)
      .attr('y', 170)
      .attr('height', 60)
      .attr('width', 5)
      .attr('fill', '#f15a24');

    group2
      .append('g')
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
        return x(d % col) + 160;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 180;
      })
      .attr('r', 8)
      .attr('fill', '#f15a24')
      .attr('opacity', 0.5);
  }

  function drawED(col, row) {
    let data = d3.range(col * row);
    console.log(data);
    group2
      .append('text')
      .attr('x', 510)
      .attr('y', 310)
      .style('font-size', 30)
      .style('font-family', 'Arial')
      .attr('fill', 'black')
      .text('ED visit');

    group2
      .append('rect')
      .attr('x', 490)
      .attr('y', 270)
      .attr('height', 60)
      .attr('width', 5)
      .attr('fill', '#f15a24');

    group2
      .append('g')
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
        return x(d % col) + 180;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 280;
      })
      .attr('r', 8)
      .attr('fill', '#f15a24')
      .attr('opacity', 0.5);
  }
  function drawDental(col, row) {
    let data = d3.range(col * row);
    console.log(data);
    group2
      .append('text')
      .attr('x', 510)
      .attr('y', 410)
      .style('font-size', 30)
      .style('font-family', 'Arial')
      .attr('fill', 'black')
      .text('Dental Care');

    group2
      .append('rect')
      .attr('x', 490)
      .attr('y', 370)
      .attr('height', 60)
      .attr('width', 5)
      .attr('fill', '#f15a24');

    group2
      .append('g')
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
        return x(d % col) + 180;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 380;
      })
      .attr('r', 8)
      .attr('fill', '#f15a24')
      .attr('opacity', 0.5);
  }

  function drawPre(col, row) {
    let data = d3.range(col * row);
    console.log(data);
    group2
      .append('text')
      .attr('x', 510)
      .attr('y', 510)

      .style('font-size', 30)
      .style('font-family', 'Arial')
      .attr('fill', 'black')

      .text('Prescription Drugs');

    group2
      .append('rect')
      .attr('x', 490)
      .attr('y', 470)
      .attr('height', 60)
      .attr('width', 5)
      .attr('fill', '#f15a24');

    group2
      .append('g')
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
        return x(d % col) + 260;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 480;
      })
      .attr('r', 8)
      .attr('fill', '#f15a24')
      .attr('opacity', 0.5);
  }

  function drawFinal(col, row) {
    let data = d3.range(col * row);
    console.log(data);
    group2
      .append('text')
      .attr('x', 510)
      .attr('y', 610)
      .style('font-size', 30)
      .style('font-family', 'Arial')
      .attr('fill', '#f15a24')
      .text('Reported 2+ types of care');

    group2
      .append('rect')
      .attr('x', 490)
      .attr('y', 570)
      .attr('height', 60)
      .attr('width', 5)
      .attr('fill', '#f15a24');

    group2
      .append('g')
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
        return x(d % col) + 10;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 580;
      })
      .attr('r', 8)
      .attr('fill', '#f15a24')
      .attr('opacity', 1);
  }

  drawMedi(19, 3);
  drawOngoing(16, 3);
  drawED(15, 3);
  drawDental(15, 3);
  drawPre(11, 3);
  drawFinal(24, 3);
}

function draw4() {
  let y = d3.scaleBand().range([0, 400]).domain(d3.range(25));
  let x = d3.scaleBand().range([0, 400]).domain(d3.range(25));

  clean('group3');
  group3
    .append('circle')
    .attr('cx', 400)
    .attr('cy', 400)
    .transition()
    .duration(1000)
    .attr('r', 100)
    .attr('fill', '#f15a24');

  d3.select('#explore1').on('click', function () {
    drawCut(13, 5);
  });
  d3.select('#explore2').on('click', function () {
    drawCredit(8, 5);
  });
  d3.select('#explore3').on('click', function () {
    drawAgency(10, 5);
  });

  // function explore() {
  //   drawCut();
  //   drawCredit();
  //   drawAgency();
  // }

  function drawCut(col, row) {
    const curve = d3.line().curve(d3.curveBasis);
    const points = [
      [400, 400],
      [400, 600],
      [300, 600],
      // [230, 540],
    ];
    path = group3
      .append('path')
      .attr('d', curve(points))
      .attr('stroke', '#f15a24')
      .attr('stroke-width', '10px')
      .attr('fill', 'none')
      .attr('opacity', 0);

    path.transition().duration(3000).attr('opacity', 0.2);

    let data = d3.range(col * row);

    group3
      .append('g')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .transition()

      .delay(function (d, i) {
        return i * 20;
      })
      .duration(2500)
      .attr('cx', function (d) {
        return x(d % col) + 80;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 570;
      })
      .attr('r', 5)
      .attr('fill', '#f15a24')
      .attr('opacity', 1);

    text1 = group3
      .append('text')
      .attr('x', 75)
      .attr('y', 550)
      .attr('opacity', 0)
      .style('font-size', 40)
      .style('font-family', 'Arial')
      .attr('fill', '#f15a24')
      .text('65%');

    text1.transition().duration(5000).attr('opacity', 1);
  }

  function drawCredit(col, row) {
    const curve = d3.line().curve(d3.curveBasis);
    const points = [
      [400, 400],
      [400, 600],
      [500, 600],
      // [230, 540],
    ];
    path = group3
      .append('path')
      .attr('d', curve(points))
      .attr('stroke', '#f15a24')
      .attr('stroke-width', '10px')
      .attr('fill', 'none')
      .attr('opacity', 0);

    path.transition().duration(3000).attr('opacity', 0.2);

    let data = d3.range(col * row);

    group3
      .append('g')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .transition()

      .delay(function (d, i) {
        return i * 20;
      })
      .duration(2500)
      .attr('cx', function (d) {
        return x(d % col) + 520;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 570;
      })
      .attr('r', 5)
      .attr('fill', '#f15a24')
      .attr('opacity', 1);

    text1 = group3
      .append('text')
      .attr('x', 520)
      .attr('y', 550)
      .attr('opacity', 0)
      .style('font-size', 40)
      .style('font-family', 'Arial')
      .attr('fill', '#f15a24')
      .text('40%');

    text1.transition().duration(5000).attr('opacity', 1);
  }

  function drawAgency(col, row) {
    const curve = d3.line().curve(d3.curveBasis);
    const points = [
      [400, 400],
      [400, 200],
      [500, 200],
      // [230, 540],
    ];
    path = group3
      .append('path')
      .attr('d', curve(points))
      .attr('stroke', '#f15a24')
      .attr('stroke-width', '10px')
      .attr('fill', 'none')
      .attr('opacity', 0);

    path.transition().duration(3000).attr('opacity', 0.2);

    let data = d3.range(col * row);

    group3
      .append('g')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .transition()

      .delay(function (d, i) {
        return i * 20;
      })
      .duration(2500)
      .attr('cx', function (d) {
        return x(d % col) + 520;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 170;
      })
      .attr('r', 5)
      .attr('fill', '#f15a24')
      .attr('opacity', 1);

    text1 = group3
      .append('text')
      .attr('x', 520)
      .attr('y', 150)
      .attr('opacity', 0)
      .style('font-size', 40)
      .style('font-family', 'Arial')
      .attr('fill', '#f15a24')
      .text('52%');

    text1.transition().duration(5000).attr('opacity', 1);
  }
}

function draw5() {
  clean('group4');
  let y = d3.scaleBand().range([0, 500]).domain(d3.range(25));
  let x = d3.scaleBand().range([0, 500]).domain(d3.range(25));

  function drawFPL1(col, row) {
    let data = d3.range(col * row);
    group4
      .append('text')
      .attr('x', 510)
      .attr('y', 210)
      .style('font-size', 30)
      .style('font-family', 'Arial')
      .attr('fill', '#f15a24')
      .text('>400%');

    group4
      .append('rect')
      .attr('x', 490)
      .attr('y', 170)
      .attr('height', 60)
      .attr('width', 5)
      .attr('fill', '#f15a24');

    group4
      .append('g')
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
        return x(d % col) + 450;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 180;
      })
      .attr('r', 8)
      .attr('fill', '#f15a24')
      .attr('opacity', 1);
  }
  drawFPL1(2, 3);
}

let activationFunctions = [draw1, draw2, draw3, draw4, draw5];

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

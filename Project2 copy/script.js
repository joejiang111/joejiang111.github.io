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
let group5 = svg.append('g').attr('width', 600).attr('height', 600);
let group6 = svg.append('g').attr('width', 600).attr('height', 600);
let group7 = svg.append('g').attr('width', 600).attr('height', 600);
let group8 = svg.append('g').attr('width', 600).attr('height', 600);
let group9 = svg.append('g').attr('width', 600).attr('height', 600);
let group10 = svg.append('g').attr('width', 600).attr('height', 600);

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
  if (chartType !== 'group5' && chartType !== 'group6') {
    group5.selectAll('circle').transition().attr('opacity', 0);
  }
  if (chartType !== 'group6') {
    group6.selectAll('circle').transition().attr('opacity', 0);
    group5.selectAll('circle').transition().remove();
    group6.selectAll('path').transition().remove();
    group6.selectAll('text').transition().remove();
    // textGroup.remove();
  }
  if (chartType !== 'group7') {
    group7.selectAll('rect').transition().remove();
    group7.selectAll('text').transition().remove();
    group7.selectAll('image').remove();
    // textGroup.remove();
  }
  if (chartType !== 'group8') {
    group8.selectAll('rect').transition().remove();
    group8.selectAll('text').transition().remove();
  }
  if (chartType !== 'group9') {
    group9.selectAll('circle').transition().remove();
  }
  if (chartType !== 'group10') {
    group10.selectAll('circle').transition().remove();
    group10.selectAll('path').transition().remove();
    group10.selectAll('text').transition().remove();
  }
}

function draw1() {
  //title graph
}

function draw2() {
  clean('group1');
  const debtPer = 0.15;

  group1
    .append('circle')
    .attr('cx', 300)
    .attr('cy', 300)
    .transition()
    .duration(1000)
    .attr('r', 200)

    .attr('fill', 'grey');

  group1
    .append('circle')
    .attr('cx', 300)
    .attr('cy', 422)

    .transition()
    .duration(1500)
    .attr('r', function () {
      return Math.pow(debtPer * 200 * 200, 0.5);
    })
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
        return x(d % col) + 110;
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
        return x(d % col) + 170;
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
        return x(d % col) + 190;
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
        return x(d % col) + 190;
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
        return x(d % col) + 270;
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
    .attr('cy', 300)
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
      [350, 300],
      [350, 500],
      [300, 500],
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
        return y(Math.floor(d / col)) + 470;
      })
      .attr('r', 5)
      .attr('fill', '#f15a24')
      .attr('opacity', 1);

    text1 = group3
      .append('text')
      .attr('x', 75)
      .attr('y', 450)
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
      [450, 300],
      [450, 500],
      [500, 500],
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
        return y(Math.floor(d / col)) + 470;
      })
      .attr('r', 5)
      .attr('fill', '#f15a24')
      .attr('opacity', 1);

    text1 = group3
      .append('text')
      .attr('x', 520)
      .attr('y', 450)
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
      [400, 100],
      [500, 100],
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
        return y(Math.floor(d / col)) + 70;
      })
      .attr('r', 5)
      .attr('fill', '#f15a24')
      .attr('opacity', 1);

    text1 = group3
      .append('text')
      .attr('x', 520)
      .attr('y', 50)
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
        return x(d % col) + 410;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 180;
      })
      .attr('r', 8)
      .attr('fill', '#f15a24')
      .attr('opacity', 0.5);
  }
  function drawFPL2(col, row) {
    let data = d3.range(col * row);
    group4
      .append('text')
      .attr('x', 510)
      .attr('y', 310)
      .style('font-size', 30)
      .style('font-family', 'Arial')
      .attr('fill', '#f15a24')
      .text('300% – 400%');

    group4
      .append('rect')
      .attr('x', 490)
      .attr('y', 270)
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
        return x(d % col) + 370;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 280;
      })
      .attr('r', 8)
      .attr('fill', '#f15a24')
      .attr('opacity', 0.5);
  }

  function drawFPL3(col, row) {
    let data = d3.range(col * row);
    group4
      .append('text')
      .attr('x', 510)
      .attr('y', 410)
      .style('font-size', 30)
      .style('font-family', 'Arial')
      .attr('fill', '#f15a24')
      .text('139% – 300%');

    group4
      .append('rect')
      .attr('x', 490)
      .attr('y', 370)
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
        return x(d % col) + 330;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 380;
      })
      .attr('r', 8)
      .attr('fill', '#f15a24')
      .attr('opacity', 1);
  }
  function drawFPL4(col, row) {
    let data = d3.range(col * row);
    group4
      .append('text')
      .attr('x', 510)
      .attr('y', 510)
      .style('font-size', 30)
      .style('font-family', 'Arial')
      .attr('fill', '#f15a24')
      .text('139% – 300%');

    group4
      .append('rect')
      .attr('x', 490)
      .attr('y', 470)
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
        return x(d % col) + 430;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 480;
      })
      .attr('r', 8)
      .attr('fill', '#f15a24')
      .attr('opacity', 0.5);
  }
  drawFPL1(4, 3);
  drawFPL2(6, 3);
  drawFPL3(8, 3);
  drawFPL4(3, 3);
}
let cir1;
let cir2;
function draw6() {
  clean('group5');
  const debtPer = 0.37;

  cir1 = group5
    .append('circle')
    .attr('cx', 300)
    .attr('cy', 300)
    .attr('class', 'cir1')
    .transition()
    .duration(1000)
    .attr('r', 200)

    .attr('fill', 'grey');

  cir2 = group5

    .append('circle')
    .attr('cx', 300)
    .attr('cy', 380)
    .attr('class', 'cir2')
    .transition()
    .duration(1500)
    .attr('r', function () {
      return Math.pow(debtPer * 200 * 200, 0.5);
    })
    .attr('fill', 'orange');
}

function draw7() {
  clean('group6');

  d3.select('.cir1').transition().duration(1000).attr('fill', 'white');

  d3.select('.cir2')
    .transition()
    .duration(1000)
    .attr('fill', '#f15a24')
    .attr('r', 90)
    .attr('transform', 'translate(100,0)');

  let data = [
    { label: 'one', count: 0.28 },
    { label: 'two', count: 0.27 },
    { label: 'three', count: 0.45 },
  ];

  const width = 250;
  const height = 250;
  const radius = Math.min(width, height) / 2;
  const donutWidth = 18; // NEW

  var arc = d3
    .arc()
    .innerRadius(radius - donutWidth) // NEW
    .outerRadius(radius);

  let pie = d3
    .pie()
    .value(function (d) {
      return d.count;
    })
    .sort(null);

  group6.attr('transform', 'translate(400,380)');
  let donut = group6.selectAll('path');

  var blues = d3.scaleOrdinal(d3.schemeOranges[3]);

  donut
    .data(pie(data))
    .enter()

    .append('path')

    .attr('d', arc)

    .transition()
    .duration(1000)
    .attr('fill', function (d) {
      return blues(d.data.label);
    });

  group6
    .append('text')
    .attr('x', -220)
    .attr('y', -20)
    .style('font-size', 40)
    .style('font-family', 'Arial')
    .attr('fill', 'black')
    .style('opacity', 0)
    .text('45%');
  group6
    .append('text')
    .attr('x', -240)
    .attr('y', 10)
    .style('font-size', 30)
    .style('font-family', 'Arial')
    .attr('fill', 'grey')
    .style('opacity', 0)
    .text('3+ Bills');
  group6
    .append('text')
    .attr('x', 50)
    .attr('y', 150)
    .style('font-size', 40)
    .style('font-family', 'Arial')
    .attr('fill', 'black')
    .style('opacity', 0)
    .text('27%');
  group6
    .append('text')
    .attr('x', 50)
    .attr('y', 180)
    .style('font-size', 30)
    .style('font-family', 'Arial')
    .attr('fill', 'grey')
    .style('opacity', 0)
    .text('2 Bills');
  group6
    .append('text')
    .attr('x', 100)
    .attr('y', -120)
    .style('font-size', 40)
    .style('font-family', 'Arial')
    .attr('fill', 'black')
    .style('opacity', 0)
    .text('28%');
  group6
    .append('text')
    .attr('x', 100)
    .attr('y', -90)
    .style('font-size', 30)
    .style('font-family', 'Arial')
    .attr('fill', 'grey')
    .style('opacity', 0)
    .text('1 Bill');

  group6.selectAll('text').transition().duration(1000).style('opacity', 1);
}

function draw8() {
  clean('group7');
  group7
    .append('rect')

    .attr('x', 350)
    .attr('y', 50)
    .transition()
    .duration(1000)
    .attr('width', 100)
    .attr('fill', '#f15a24')
    .attr('height', 500)
    .style('rx', '15px');

  let rectNum = (500 / 42) * 32;
  group7
    .append('rect')
    .attr('x', 400)
    .attr('y', 50 + (500 - rectNum))
    .transition()
    .duration(1000)
    .attr('fill', '#f7931e')
    .attr('width', 100)
    .attr('height', (500 / 42) * 32)
    .style('rx', '15px');

  let icon1 = group7
    .append('svg:image')
    .attr('x', 230)
    .attr('y', 450)
    .attr('width', 100)
    .attr('height', 100)
    .style('opacity', 0)
    .attr('xlink:href', 'assets/SVG/Asset25.svg');

  let icon2 = group7
    .append('svg:image')
    .attr('x', 510)
    .attr('y', 450)
    .attr('width', 100)
    .attr('height', 100)
    .style('opacity', 0)
    .attr('xlink:href', 'assets/SVG/Asset26.svg');

  icon1.transition().duration(1000).style('opacity', 1);
  icon2.transition().duration(1000).style('opacity', 1);

  group7
    .append('text')
    .attr('x', 410)
    .attr('y', 160)
    .style('font-size', 20)
    .style('font-family', 'Arial')
    .attr('fill', 'black')
    .style('opacity', 0)
    .text('32%');
  group7
    .append('text')
    .attr('x', 370)
    .attr('y', 40)
    .style('font-size', 30)
    .style('font-family', 'Arial')
    .style('font-weight', 'bold')
    .attr('fill', 'black')
    .style('opacity', 0)
    .text('42%');

  group7
    .selectAll('text')
    .transition()
    .delay(400)
    .duration(1000)
    .style('opacity', 1);
}

function draw9() {
  clean('group8');
  group8
    .append('rect')
    .attr('x', 150)
    .attr('y', 200)
    .attr('height', 200)
    .attr('width', 300)
    .attr('fill', 'none')
    .attr('stroke', '#f15a24')
    .attr('stroke-width', '7px')
    .attr('rx', '20px');
  group8
    .append('rect')
    .attr('x', 550)
    .attr('y', 300)
    .attr('height', 100)
    .attr('width', 150)
    .attr('fill', 'none')
    .attr('stroke', 'grey')
    .attr('stroke-width', '7px')
    .attr('rx', '20px');

  group8
    .append('text')
    .attr('x', 250)
    .attr('y', 180)
    .style('font-size', 50)
    .style('font-family', 'Arial')
    .style('font-weight', 'regular')
    .attr('fill', '#f15a24')
    .style('opacity', 1)
    .text('35%');
}
function draw10() {
  clean('group9');
  const debtPer = 0.17;

  group9
    .append('circle')
    .attr('cx', 300)
    .attr('cy', 300)
    .transition()
    .duration(1000)
    .attr('r', 200)

    .attr('fill', 'lightgrey');

  group9
    .append('circle')
    .attr('cx', 300)
    .attr('cy', 418)

    .transition()
    .duration(1500)
    .attr('r', function () {
      return Math.pow(debtPer * 200 * 200, 0.5);
    })
    .attr('fill', '#005480');
}

function draw11() {
  let y = d3.scaleBand().range([0, 400]).domain(d3.range(25));
  let x = d3.scaleBand().range([0, 400]).domain(d3.range(25));

  clean('group10');

  group10
    .append('circle')
    .attr('cx', 400)
    .attr('cy', 300)
    .transition()
    .duration(1000)
    .attr('r', 100)
    .attr('fill', '#005480');

  d3.select('#debt1').on('click', function () {
    drawDebt1(16, 5);
  });
  d3.select('#debt2').on('click', function () {
    drawDebt2(14, 5);
  });
  d3.select('#debt3').on('click', function () {
    drawDebt3(12, 5);
  });
  d3.select('#debt4').on('click', function () {
    drawDebt4(10, 5);
  });

  // function explore() {
  //   drawCut();
  //   drawCredit();
  //   drawAgency();
  // }

  function drawDebt1(col, row) {
    const curve = d3.line().curve(d3.curveBasis);
    const points = [
      [370, 300],
      [370, 100],
      [270, 100],
      // [230, 540],
    ];
    path = group10
      .append('path')
      .attr('d', curve(points))
      .attr('stroke', '#005480')
      .attr('stroke-width', '10px')
      .attr('fill', 'none')
      .attr('opacity', 0);

    path.transition().duration(1000).attr('opacity', 0.2);

    let data = d3.range(col * row);

    group10
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
        return x(d % col) + 10;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 70;
      })
      .attr('r', 5)
      .attr('fill', '#005480')
      .attr('opacity', 1);

    text1 = group10
      .append('text')
      .attr('x', 10)
      .attr('y', 50)
      .attr('opacity', 0)
      .style('font-size', 40)
      .style('font-family', 'Arial')
      .attr('fill', '#005480')
      .text('81%');

    text1.transition().duration(5000).attr('opacity', 1);
  }

  function drawDebt2(col, row) {
    const curve = d3.line().curve(d3.curveBasis);
    const points = [
      [430, 300],
      [430, 100],
      [530, 100],
      // [230, 540],
    ];
    path = group10
      .append('path')
      .attr('d', curve(points))
      .attr('stroke', '#005480')
      .attr('stroke-width', '10px')
      .attr('fill', 'none')
      .attr('opacity', 0);

    path.transition().duration(3000).attr('opacity', 0.2);

    let data = d3.range(col * row);

    group10
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
        return x(d % col) + 550;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 70;
      })
      .attr('r', 5)
      .attr('fill', '#005480')
      .attr('opacity', 1);

    text1 = group10
      .append('text')
      .attr('x', 680)
      .attr('y', 50)
      .attr('opacity', 0)
      .style('font-size', 40)
      .style('font-family', 'Arial')
      .attr('fill', '#005480')
      .text('68%');

    text1.transition().duration(5000).attr('opacity', 1);
  }

  function drawDebt3(col, row) {
    const curve = d3.line().curve(d3.curveBasis);
    const points = [
      [370, 300],
      [370, 500],
      [270, 500],
      // [230, 540],
    ];
    path = group10
      .append('path')
      .attr('d', curve(points))
      .attr('stroke', '#005480')
      .attr('stroke-width', '10px')
      .attr('fill', 'none')
      .attr('opacity', 0);

    path.transition().duration(3000).attr('opacity', 0.2);

    let data = d3.range(col * row);

    group10
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
        return x(d % col) + 75;
      })
      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 470;
      })
      .attr('r', 5)
      .attr('fill', '#005480')
      .attr('opacity', 1);

    text1 = group10
      .append('text')
      .attr('x', 75)
      .attr('y', 450)
      .attr('opacity', 0)
      .style('font-size', 40)
      .style('font-family', 'Arial')
      .attr('fill', '#005480')
      .text('62%');

    text1.transition().duration(5000).attr('opacity', 1);
  }
  function drawDebt4(col, row) {
    const curve = d3.line().curve(d3.curveBasis);
    const points = [
      [430, 300],
      [430, 500],
      [530, 500],
      // [230, 540],
    ];
    path = group10
      .append('path')
      .attr('d', curve(points))
      .attr('stroke', '#005480')
      .attr('stroke-width', '10px')
      .attr('fill', 'none')
      .attr('opacity', 0);

    path.transition().duration(3000).attr('opacity', 0.2);

    let data = d3.range(col * row);

    let cirs = group10
      .append('g')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .transition()
      .attr('cx', 400)
      .attr('cy', 300)
      .attr('r', 5)
      .attr('fill', '#005480')
      .attr('opacity', 1)
      .delay(function (d, i) {
        return i * 20;
      })
      .duration(2500)
      .attr('cx', function (d) {
        return x(d % col) + 550;
      })

      .attr('cy', function (d) {
        return y(Math.floor(d / col)) + 470;
      });
    text1 = group10
      .append('text')
      .attr('x', 620)
      .attr('y', 450)
      .attr('opacity', 0)
      .style('font-size', 40)
      .style('font-family', 'Arial')
      .attr('fill', '#005480')
      .text('52%');

    text1.transition().duration(5000).attr('opacity', 1);
  }
}

function draw12() {}

let activationFunctions = [
  draw1,
  draw2,
  draw3,
  draw4,
  draw5,
  draw6,
  draw7,
  draw8,
  draw9,
  draw10,
  draw11,
  draw12,
];

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

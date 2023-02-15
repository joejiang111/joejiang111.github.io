const height = 800;
const width = 1200;

let svg = d3
  .select('#viz')
  .append('svg')
  .attr('viewBox', `0 0 ${width} ${height}`)
  .attr('preserveAspectRatio', 'xMidYMid meet');
// .attr('transform', 'translate(100,0)');
// .attr('transform', 'translate(300,0)');

let axisGroup = svg.append('g').attr('height', height).attr('width', width);
let lgdGroup = svg.append('g').attr('height', height).attr('width', width);
let group1_2000 = svg.append('g').attr('height', height).attr('width', width);
let group2_2000 = svg.append('g').attr('height', height).attr('width', width);
let group1_1900 = svg.append('g').attr('height', height).attr('width', width);
let group2_1900 = svg.append('g').attr('height', height).attr('width', width);

lgdGroup
  .append('rect')
  .attr('x', 40)
  .attr('y', 640)
  .attr('height', 40)
  .attr('width', 80)
  .attr('rx', 5)
  .attr('fill', 'white');

lgdGroup
  .append('rect')
  .attr('x', 90)
  .attr('y', 650)
  .attr('height', 5)
  .attr('width', 20)
  .attr('fill', '#DD7230');

lgdGroup
  .append('rect')
  .attr('x', 90)
  .attr('y', 665)
  .attr('height', 5)
  .attr('width', 20)
  .attr('fill', '#5B443E');

lgdGroup
  .append('text')
  .attr('x', 50)
  .attr('y', 655)
  .style('font-size', 10)
  .style('font-family', 'Futura')
  .attr('fill', 'black')
  .text('Female');

lgdGroup
  .append('text')
  .attr('x', 50)
  .attr('y', 670)
  .style('font-size', 10)
  .style('font-family', 'Futura')
  .attr('fill', 'black')
  .text('Male');

axisGroup
  .append('rect')
  .attr('x', 500)
  .attr('y', 100)
  .attr('height', 600)
  .attr('width', 3)
  .attr('fill', 'none');

axisGroup
  .append('text')
  .attr('x', 560)
  .attr('y', 60)
  .style('font-size', 20)
  .style('font-family', 'Futura')
  .attr('fill', 'black')
  .text('Age');

axisGroup
  .append('text')
  .attr('x', 300)
  .attr('y', 760)
  .style('font-size', 20)
  .style('font-family', 'Futura')
  .attr('fill', 'black')
  .text('Population(1900)');

axisGroup
  .append('text')
  .attr('x', 700)
  .attr('y', 760)
  .style('font-size', 20)
  .style('font-family', 'Futura')
  .attr('fill', 'black')
  .text('Population(2000)');

d3.csv('USpop.csv').then(function (data) {
  const pop = {
    min: d3.min(data, function (d) {
      return +d.People;
    }),
    max: d3.max(data, function (d) {
      return +d.People;
    }),
  };

  console.log(pop);

  let data_2000_1 = data.filter(function (d) {
    return d.Year === '2000' && d.Sex === '1';
  });

  let data_2000_2 = data.filter(function (d) {
    return d.Year === '2000' && d.Sex === '2';
  });

  console.log(data_2000_1);
  console.log(data_2000_2);

  let data_1900_1 = data.filter(function (d) {
    return d.Year === '1900' && d.Sex === '1';
  });

  let data_1900_2 = data.filter(function (d) {
    return d.Year === '1900' && d.Sex === '2';
  });

  console.log(data_1900_1);
  console.log(data_1900_2);

  let x_1900 = d3.scaleLinear().domain([0, pop.max]).range([500, 0]);
  let x2 = d3.scaleLinear().domain([0, pop.max]).range([0, 500]);

  let y_1900 = d3.scaleLinear().domain([0, 90]).range([600, 0]);
  let y2 = d3.scaleLinear().domain([0, 90]).range([600, 0]);

  // const yAxis = axisGroup
  //   .append('g')
  //   .attr('class', 'axis')
  //   .attr('transform', 'translate(595, 100)')
  //   .call(d3.axisLeft().scale(y_1900))
  //   .ticks(18);

  const yAxis = d3.axisLeft().scale(y_1900).ticks(19);
  const xAxis1 = d3.axisBottom().scale(x_1900).ticks(8);
  const xAxis2 = d3.axisBottom().scale(x2).ticks(8);
  //   .append('g')
  //   .attr('class', 'axis')
  //   .attr('transform', `translate(0,${height - margin.bottom})`)
  //   .call(d3.axisBottom().scale(xScale));
  axisGroup
    .append('g')
    .attr('class', 'axis')
    .attr('id', 'age')
    .attr('transform', 'translate(595,100)')
    .call(yAxis);

  axisGroup
    .append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(50, 710)')
    .call(xAxis1);

  axisGroup
    .append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(605, 710)')
    .call(xAxis2);

  group1_1900
    .selectAll('rect')
    .data(data_1900_1)
    .enter()
    .append('rect')
    .attr('x', function (d) {
      return x_1900(+d.People) + 50;
    })
    .attr('y', function (d) {
      return y_1900(+d.Age) + 100;
    })
    .attr('height', 5)
    .attr('width', function (d) {
      return x_1900(0) - x_1900(+d.People);
    })
    .attr('fill', '#5B443E');

  group2_1900
    .selectAll('rect')
    .data(data_1900_2)
    .enter()
    .append('rect')
    .attr('x', function (d) {
      return x_1900(+d.People) + 50;
    })
    .attr('y', function (d) {
      return y_1900(+d.Age) + 95;
    })
    .attr('height', 5)
    .attr('width', function (d) {
      return x_1900(0) - x_1900(+d.People);
    })
    .attr('fill', '#DD7230');

  group1_2000
    .selectAll('rect')
    .data(data_2000_1)
    .enter()
    .append('rect')
    .attr('x', function (d) {
      return 603;
    })
    .attr('y', function (d) {
      return y2(d.Age) + 100;
    })
    .attr('height', 5)
    .attr('width', function (d) {
      return x_1900(0) - x_1900(+d.People);
    })
    .attr('fill', '#5B443E');

  group2_2000
    .selectAll('rect')
    .data(data_2000_2)
    .enter()
    .append('rect')
    .attr('x', function (d) {
      return 603;
    })
    .attr('y', function (d) {
      return y2(d.Age) + 95;
    })
    .attr('height', 5)
    .attr('width', function (d) {
      return x_1900(0) - x_1900(+d.People);
    })
    .attr('fill', '#DD7230');
});

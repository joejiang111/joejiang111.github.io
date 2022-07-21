// create a dataset

data = [
  {
    name: 'Individual',
    value: 8.3,
    data2018: 307325,
    data2019: 333414,
    data2020: 341648,
  },
  {
    name: 'Small',
    value: 10.3,
    data2018: 455244,
    data2019: 442026,
    data2020: 424105,
  },
  {
    name: 'Mid Size',
    value: 6.1,
    data2018: 268520,
    data2019: 276357,
    data2020: 258904,
  },
  {
    name: 'Large',
    value: 12.1,
    data2018: 559796,
    data2019: 572859,
    data2020: 547732,
  },
  {
    name: 'Jumbo',
    value: 55.5,
    data2018: 2620903,
    data2019: 2591979,
    data2020: 2563772,
  },
  {
    name: 'GIC',
    value: 7.7,
    data2018: 326115,
    data2019: 318344,
    data2020: 316277,
  },
];

var width = 700,
  height = 550;

//use dispatch
var effects = d3.dispatch('zoomin', 'zoomout', 'compare', 'text', 'drawbars');

//change the opacity on the arc when hover
effects.on('zoomin', function () {
  this.attr('fill', 'rgb(248,146,30)').style('opacity', 1.0);
});

//change back the opacity when mouseout
effects.on('zoomout', function (name) {
  svg.selectAll('text').remove();

  this.attr('fill', color(name));
  group.selectAll('.xAxis').remove();
});

//display the group and it's percentage when hover
effects.on('text', function (name, value) {
  console.log(name, value);
  text1
    .append('text')
    .attr('x', width + 500)
    .attr('y', height - 70)
    .attr('font-size', 60)
    .attr('font-family', 'Arial')
    .attr('font-weight', 'bold')
    .attr('text-aligh', 'center')
    .attr('fill', 'rgb(0,84,128)')
    .text(name + ' Group');

  text2
    .append('text')
    .attr('x', width + 500)
    .attr('y', height)
    .attr('font-size', 40)
    .attr('font-family', 'Arial')
    .attr('font-weight', 'regular')
    .attr('text-aligh', 'center')
    .attr('fill', 'rgb(0,84,128)')
    .text('2020 ESI: ');

  text2
    .append('text')

    .attr('x', width + 700)
    .attr('y', height)
    .transition()
    .duration(500)
    .attr('font-size', 40)
    .attr('font-family', 'Arial')
    .attr('font-weight', 'bold')
    .attr('text-aligh', 'center')
    .attr('fill', 'rgb(248,146,30)')
    .text(value + '%');
});

effects.on('compare', function (name, value) {});

//draw a bar chart of 3 year data when click
effects.on('drawbars', function (name, value, value2018, value2019, value2020) {
  yearData = [
    { year: '2018', value: value2018 },
    { year: '2019', value: value2019 },
    { year: '2020', value: value2020 },
  ];
  let perChange = ((value2020 - value2019) / value2019) * 100;
  perChange = Math.round(perChange * 10) / 10;
  console.log(perChange);
  text2
    .selectAll('text')
    .transition()
    .duration(500)
    .attr('transform', 'translate(0,-50)');

  text1
    .selectAll('text')
    .transition()
    .duration(500)
    .attr('transform', 'translate(0,-50)');

  text3
    .append('text')
    .attr('x', width + 500)
    .attr('y', height + 100)

    .attr('font-size', 30)
    .attr('font-family', 'Arial')
    .attr('fill', 'black')
    .transition()
    .duration(1000)
    .attr('fill-opacity', 1)
    .text(getText(name, value));

  text4
    .append('text')
    .attr('x', width + 500)
    .attr('y', height - 200)

    .attr('font-size', 30)
    .attr('font-family', 'Arial')
    .attr('fill', 'rgb(0,84,128)')
    .transition()
    .duration(1000)
    .attr('fill-opacity', 1)
    .text(getNumText(name));

  percentage
    .append('text')
    .attr('x', width / 2 - 330)
    .attr('y', height / 2 - 350)
    .attr('font-size', 15)

    .attr('font-family', 'Arial')
    .attr('fill', 'black')
    .transition()
    .duration(2000)
    .attr('fill-opacity', 1)
    .text(getPer(perChange));

  const graphHeight = 140;
  const graphWidth = 120;

  const minMax = d3.extent(yearData, function (d) {
    return d.value;
  });
  //console.log(minMax);

  const y = d3.scaleLinear().domain([0, minMax[1]]).range([graphHeight, 0]);
  const x = d3
    .scaleBand()
    .domain(yearData.map((d) => d.year))
    .range([0, graphWidth])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  const xAxis = d3.axisBottom(x);
  const xAxisGroup = group
    .append('g')
    .attr('class', 'xAxis')
    .attr('transform', `translate(-55, ${graphHeight - 65})`);

  rects
    .data(yearData)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.year) - 55)
    .attr('width', x.bandwidth)
    .attr('height', graphHeight - y(0))
    .attr('rx', 5)
    .attr('fill', function (d) {
      return getBarColor(d.year);
    })
    .attr('y', y(0));

  // animation
  group
    .selectAll('rect')
    .transition()
    .duration(500)
    .attr('y', (d) => y(d.value) - 70)
    .attr('height', function (d) {
      return graphHeight - y(d.value);
    })
    .delay(function (d, i) {
      return i * 100;
    });

  xAxisGroup.attr('class', 'xAxis').call(xAxis);
  xAxisGroup.select('.domain').remove();

  xAxisGroup
    .data(yearData)
    .selectAll('text')
    .transition()
    .duration(1000)
    .attr('transform', 'rotate(-45)')
    .style('font-family', 'Arial')
    .style('font-weight', 'bold')
    .attr('text-anchor', 'end');

  // xAxisGroup.selectAll('.').attr('fill', 'white');

  xAxisGroup.selectAll('text').each(function (d, i) {
    if (d == '2020') {
      d3.select(this).attr('fill', 'rgb(248,146,30)').style('font-size', 20);
    } else {
      d3.select(this).attr('fill', 'rgb(0,84,128)').style('font-size', 10);
    }
  });
  let textMember = d3.select('svg').append('g');

  rects = group
    .selectAll('rect')
    // .on('mouseover', function (d) {
    //   d3.select(this).attr('fill-opacity', 0.5);
    //   // d3.event.stopPropagation();
    // })
    .on('mouseout', function (d) {
      tooltip.style('opacity', 0);
      textMember.selectAll('text').remove();
      d3.select(this).attr('fill-opacity', 1);
    })
    .on('mouseover', function (d) {
      d3.select(this).attr('fill-opacity', 0.5);
      textMember.selectAll('text').remove();
      let year = d.year;
      tooltip.style('opacity', 1).style('border-color', getBarColor(d.year));
      // tooltip.attr('')
      // textMember
      //   .append('text')
      //   .attr('x', width - 20)
      //   .attr('y', height - 100)
      //   .style('font-family', 'Arial')
      //   .style('font-size', 30)
      //   .style('font-weight', 'regular')
      //   .attr('fill', 'black')
      //   .text(d.year + ': ' + d.value);
    })
    .on('mousemove', function (d) {
      valueWithIndicator = d.value.toLocaleString('en-US');
      tooltip
        .html('Year: ' + d.year + '<br> Value: ' + valueWithIndicator)
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY - 75 + 'px');
    });

  function getText(group, number) {
    let text = 'here are some information about ' + group + ' Group';
    return text;
  }

  function getPer(per) {
    if (per >= 0) {
      return `+ ${per}%`;
    } else {
      return `- ${Math.abs(per)}%`;
    }
  }

  function getNumText(name) {
    if (name == 'Small') {
      return '(1 - 50 employees)';
    } else if (name == 'Mid Size') {
      return '(51 - 100 employees)';
    } else if (name == 'Large') {
      return '(101 - 499 employees)';
    } else if (name == 'Jumbo') {
      return '(500+ employees)';
    }
  }

  //console.log(yearData);
});

function getBarColor(year) {
  if (year == 2020) {
    return 'rgb(248,146,30)';
  } else {
    return 'rgb(0,84,128)';
  }
}

function resetColor(selection) {
  selection.style('opacity', 1);
}

const svg = d3.select('.canvas').select('svg');

var text1 = svg.append('g');
var text2 = svg.append('g');
var text3 = svg.append('g').attr('fill-opacity', 0);
var text4 = svg.append('g').attr('fill-opacity', 0);
var tooltip = d3
  .select('.canvas')
  .append('div')
  .style('opacity', 0)
  .attr('class', 'tooltip')
  .style('border', 'solid')
  .style('border-width', '2px')
  .style('border-radius', '10px')
  .style('padding', '3px');

const group = svg
  .append('g')
  .attr('transform', 'translate(' + (width + 50) + ',' + height + ')');
var rects = group.selectAll('rect');
var percentage = group.append('g').attr('fill-opacity', 0);
var radius = Math.min(width, height) / 2;
var donutWidth = 75;

var color = d3
  .scaleOrdinal()
  .range([
    'rgb(99,102,106,0.1)',
    'rgb(99,102,106,0.2)',
    'rgb(99,102,106,0.3)',
    'rgb(99,102,106,0.4)',
    'rgb(99,102,106,0.5)',
    'rgb(99,102,106,0.6)',
    'rgb(99,102,106,0.7)',
  ]);

var arc = d3
  .arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius)
  .cornerRadius(10);

var pie = d3
  .pie()
  .value(function (d) {
    return d.value;
  })
  .padAngle(0.02)
  .sort(null);

var path = group
  .selectAll('path')
  .data(pie(data))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function (d, i) {
    return color(d.data.name);
  })
  .style('opacity', 1);

var isClicked = false;

path
  .data(data)
  .on('mouseover', function (d) {
    effects.call('zoomout', d3.select(this), d.name);
    //group.selectAll('rect').remove();

    group.selectAll('path').attr('fill', function (d, i) {
      return color(d.name);
    });

    // isClicked = false;
    effects.call('zoomin', d3.select(this));
    // console.log(d.name);
    effects.call('text', d3.select(this), d.name, d.value);
  })

  .on('mouseout', function (d) {
    if (isClicked == false) {
      effects.call('zoomout', d3.select(this), d.name);
      svg.selectAll('rect').remove();
    }
  })

  .on('click', function (d) {
    d3.select(this).on('mouseout', null);

    // xAxisGroup.selectAll('text').remove();
    // text1.selectAll('text').remove();
    isClicked = true;

    effects.call(
      'drawbars',
      d3.select(this),
      d.name,
      d.value,
      d.data2018,
      d.data2019,
      d.data2020
      // color(d.data.name)
    );
  });

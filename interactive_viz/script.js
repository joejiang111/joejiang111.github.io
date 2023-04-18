function parseCSV(d) {
  if (
    d.Music_effects != '' &&
    d.Age > 0 &&
    +d.BPM > 0 &&
    +d.Hours_per_day > 0 &&
    +d.BPM < 625
  ) {
    return {
      Age: +d.Age,
      Hours: +d.Hours_per_day,
      bpm: +d.BPM,
      working: d.working,
      stream: d.stream,
      Explo: d.Exploratory,
      Classical: d.Frequency_Classical,
      Country: d.Frequency_Country,
      EDM: d.Frequency_EDM,
      Folk: d.Frequency_Folk,
      Gospel: d.Frequency_Gospel,
      Hiphop: d.Frequency_Hip_hop,
      Jazz: d.Frequency_Jazz,
      Kpop: d.Frequency_K_pop,
      Latin: d.Frequency_Latin,
      Lofi: d.Frequency_Lofi,
      Metal: d.Frequency_Metal,
      Pop: d.Frequency_Pop,
      R_B: d.Frequency_R_B,
      Rap: d.Frequency_Rap,
      Rock: d.Frequency_Rock,
      Game: d.Frequency_Game,
      Anxiety: +d.Anxiety,
      Depression: +d.Depression,
      Insomnia: +d.Insomnia,
      OCD: +d.OCD,
      effect: d.Music_effects,
      favGenre: d.Fav_genre,
      score: (+d.Anxiety + +d.Depression + +d.Insomnia + +d.OCD) / 4,
    };
  }
}






d3.csv('./mxmh_survey_results.csv', parseCSV).then(function (data) {
  console.log(data);
  // let count_edm = 0;

  // console.log(count_edm);

  const width = document.querySelector('#viz').clientWidth;
  const height = document.querySelector('#viz').clientHeight;
  const margin = { top: 50, left: 200, right: 150, bottom: 100 };

  const svg = d3
    .select('#viz')
    .append('svg')
    .attr('width', width + 200)
    .attr('height', height)
    .property("value", [])

  let group1 = svg
    .append('g')
    .attr('width', width + 200)
    .attr('height', height);

  let size = 736;

  const age = {
    min: d3.min(data, function (d) {
      return d.Age;
    }),
    max: d3.max(data, function (d) {
      return d.Age;
    }),
  };

  const score = {
    min: d3.min(data, function (d) {
      return d.score;
    }),
    max: d3.max(data, function (d) {
      return d.score;
    }),
  };

  const hours = {
    min: d3.min(data, function (d) {
      return d.Hours;
    }),
    max: d3.max(data, function (d) {
      return d.Hours;
    }),
  };

  const bpm = {
    min: d3.min(data, function (d) {
      return d.bpm;
    }),
    max: d3.max(data, function (d) {
      return d.bpm;
    }),
  };

  console.log(age);
  console.log(score);
  console.log(hours);
  console.log(bpm);











  const scaleFav = d3.scaleBand().domain(['Classical', 'Country', 'EDM', 'Folk', 'Gospel',
'Hip hop', 'Jazz', 'K pop', 'Latin', 'Lofi', 'Metal', 'Pop', 'R&B', 'Rap', 'Rock', 'Video game music']).range([50, height - margin.top-50])

  const yScale = d3
    .scaleLinear()
    .domain([score.min, score.max])
    .range([height - margin.bottom, margin.top]);

  const yScale2 = d3
    .scaleLinear()
    .domain([0, 16])
    .range([height - margin.bottom, margin.top]);

  const xScale = d3
    .scaleLinear()
    .domain([age.min, age.max])
    .range([margin.left, width - margin.right]);

  const angleScale = d3
    .scaleLinear()
    .domain([hours.min, hours.max])
    .range([0, 360]);

  const xAxis = svg
    .append('g')
    .attr('class', 'axis')
    .attr('id', 'x_axis1')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom().scale(xScale));

  const yAxis = svg
    .append('g')
    .attr('class', 'axis')
    .attr('id', 'y_axis1')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft().scale(yScale));

  const tooltip = d3.select('#viz').append('div').attr('class', 'tooltip');

  //draw circles
  const circle = svg
    .append('g')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')

    .attr('cx', function (d) {
      return xScale(d.Age);
    })
    .attr('cy', function (d) {
      return yScale(d.score);
    });
  circle
    .transition()
    .duration(function (d) {
      return (1 / d.bpm) *100000;
    })
    .attr('r', 3)
    .attr('fill', 'white');

  //mouseover effect
  
  circle
    .on('mouseover', function (e, d) {
      
      circle.transition().duration(500).attr('opacity', 0);
      let hours = d.Hours;
      let posX = d3.select(this).attr('cx');
      let posY = d3.select(this).attr('cy');
      let end_angle = angleScale(hours);
      console.log(end_angle);

      console.log(posX);
      console.log(posY);
      console.log(hours);

      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity', 1)

        .attr('r', 20);

      const arc = d3
        .arc()
        .innerRadius(30)
        .outerRadius(35)
        .startAngle(0)

        .endAngle((end_angle * Math.PI) / 180);

      group1
        .append('path')
        .attr('transform', `translate(${posX},${posY})`)
        .attr('class', 'arc')
        .attr('d', arc)
        .attr('fill', '#8D6A9F');

      console.log(d.bpm);

      //tooltip
      let x = +d3.select(this).attr('cx') + 230;
      let y = +d3.select(this).attr('cy');
      tooltip
        .style('visibility', 'visible')
        .style('top', `${y}px`)
        .style('left', `${x}px`)
        .html(
          `<p>BPM: <b>${d.bpm}</b><br>Hours: ${d.Hours}<br>Mental Score: ${d.score}</p>`
        );
      
    })

    .on('mouseout', function (e, d) {
      circle
        .transition()
        .duration(200)
        .attr('opacity', 1)

        .attr('r', 3);
      
      
      d3.select('.arc').remove();
      tooltip.style('visibility', 'hidden');
    })

    .on('click', function(e,d){

      tooltip.style('visibility', 'hidden')

      d3.select(this)
      .attr('selected', 'True')

      d3.select(this)
        .transition()
        .duration(1000)
        
        .attr('r', 100)
      
      console.log(d);
      
    })

  button1 = svg
    .append('g')
    .append('rect')
    .attr('x', 0)
    .attr('y', 200)
    .attr('fill', 'white')
    .attr('height', 30)
    .attr('width', 10);

  text_btn1 = svg
    .append('g')
    .append('text')
    .attr('x', 10)
    .attr('y', 220)
    .text('Show Effect')
    .attr('fill', 'black')
    .style('font-family', 'Overpass')
    .style('font-weight', 700);
    
  button1.on('mouseover', function (d) {
    button1.transition().duration(200).attr('width', 110);
  });

  button2 = svg
    .append('g')
    .append('rect')
    .attr('x', 0)
    .attr('y', 300)
    .attr('fill', 'white')
    .attr('height', 30)
    .attr('width', 10);

  text_btn2 = svg
    .append('g')
    .append('text')
    .attr('x', 10)
    .attr('y', 320)
    .text('Age vs Fav Genre')
    .attr('fill', 'black')
    .style('font-family', 'Overpass')
    .style('font-weight', 700);

  button3 = svg
    .append('g')
    .append('rect')
    .attr('x', 0)
    .attr('y', 400)
    .attr('fill', 'white')
    .attr('height', 30)
    .attr('width', 10);

  text_btn3 = svg
    .append('g')
    .append('text')
    .attr('x', 10)
    .attr('y', 420)
    .text('Play with Brush')
    .attr('fill', 'black')
    .style('font-family', 'Overpass')
    .style('font-weight', 700);

  button2.on('mouseover', function (d) {
    button2.transition().duration(200).attr('width', 150);
  });
  button3.on('mouseover', function (d) {
    button3.transition().duration(200).attr('width', 150);
  });

  // svg
  //   .append('svg:defs')
  //   .append('svg:marker')
  //   .attr('id', 'triangle')
  //   .attr('refX', 6)
  //   .attr('refY', 6)
  //   .attr('markerWidth', 30)
  //   .attr('markerHeight', 30)
  //   .attr('orient', 'auto')
  //   .append('path')
  //   .attr('d', 'M 0 0 12 6 0 12 3 6')
  //   .style('fill', 'black');

  button1.on('mouseout', function (d) {
    // button1.transition().duration(200).attr('width', 10);
  });
  text_btn1.on('click', changeColor);
  text_btn2.on('click', redraw1);
  text_btn3.on('click', playBrush);

  function changeColor() {
    circle
      .transition()
      .duration(1000)
      .attr('fill', function (d) {
        if (d.effect == 'Improve') {
          return '#08BDBD';
        } else if (d.effect == 'Worsen') {
          return 'red';
        } else {
          return 'white';
        }
      });
  }

  function redraw1(){
    d3.select('.legend1').remove()
    d3.select('.legend2').remove()
    circle.attr("fill", 'white')
    
    d3.select('#y_axis1').attr('opacity', 0)
    d3.select('.brush').remove()
    circle
    .attr('opacity', 1)
    .transition()
    .duration(1000)
    
    .attr('cy', function(d){
      
      return(scaleFav(d.favGenre));
    })
    
    console.log(scaleFav(d.FavGenre));


  }
  // Define the brush
  let gBrush;

  function playBrush(){

    reset()
    d3.select('#y_axis1').attr('opacity', 1)
  const brush = d3.brush()
  .extent([[200, 0], [width, height]])
  .on("brush", brushended);

// Append the brush to the SVG
  gBrush = svg.append("g")
  .attr("class", "brush")
  .call(brush);

  let sideViz = svg.append('g').attr('transform', 'translate(1200, 200)')
// Define the brushended function
  function brushended({selection}) {
    sideViz.selectAll('circle').remove();
    let value = [];
    if (selection) {
      const [[x0, x1], [y0, y1]] = selection;
      console.log(selection)
      circle.attr("class", "non_brushed");
      circle.attr('fill', 'white')
      var brush_coords = d3.brushSelection(this);
      let selectCirs = circle.filter(function (){

        var cx = d3.select(this).attr("cx"),
            cy = d3.select(this).attr("cy");

        return isBrushed(brush_coords, cx, cy);
    })
    selectCirs
    .attr("class", "brushed")
        .attr("fill", "red")
        .data(data);
    
    
    // let count_1 =  d3.count(selectCirs, function(d){
    //   return d.stream === 'Spotify';
    // })

   
    // console.log(count_1)
    let selectedData = selectCirs.data();
    let spo = selectedData.filter(function(d){
      return d.stream === 'Spotify';
    })
    count_spo = spo.length;

    let apl = selectedData.filter(function(d){
      return d.stream === 'Apple Music';
    })
    count_apl = apl.length;

    let youtube = selectedData.filter(function(d){
      return d.stream === 'Youtube Music';
    })
    count_youtube = youtube.length;
    
    let pandora = selectedData.filter(function(d){
      return d.stream === 'Pandora';
    })
    count_pandora = pandora.length;
    
    count_other = selectedData.length - count_spo - count_apl - count_youtube - count_pandora

    let work = selectedData.filter(function(d){
      return d.working === 'Yes'
    })
    count_work = work.length;

    let work_no = selectedData.filter(function(d){
      return d.working === 'No'
    })
    count_nowork = work_no.length;

    console.log(count_nowork)
    console.log(count_work)

    sideViz.append('circle')
    .attr('r', Math.log(count_work)*10)
    .attr('cy', 200)
    .attr('cx', 0)
    .attr('fill', 'yellow')
  
    sideViz.append('circle')
    .attr('r', Math.log(count_nowork)*10)
    .attr('cy', 200)
    .attr('cx', 40)
    .attr('fill', 'purple')

    svg.append('text')
    .style('font-size', 10)
    .style('font-family', 'Libre Franklin')
    .style('font-weight', 0)
    .attr('fill', 'white')
    .attr('class', 'legend1')
    .attr('y', 500)
    .attr('x', 1150)
    .text('Yellow: While Working')

    svg.append('text')
    .style('font-size', 10)
    .style('font-family', 'Libre Franklin')
    .style('font-weight', 0)
    .attr('fill', 'white')
    .attr('class', 'legend2')
    .attr('y', 520)
    .attr('x', 1150)
    .text('Purple: While Not Working')
  







    



    //create words for word cloud
    let words = [
      {word: 'Spotify', size: count_spo},
      {word: 'Youtube Music', size: count_youtube},
      {word: 'Apple Music', size: count_apl},
      {word: 'Pandora', size: count_pandora},
      {word: 'Other', size: count_other},
    ]

    let layout = d3.layout.cloud()
      .size([200, 200])
      .words(words.map(function(d) { return {text: d.word, size:d.size}; }))
      .padding(10)        //space between words
      .rotate(function() { return ~~(Math.random() * 2) ; })
      .fontSize(function(d) { return Math.log(d.size)*10; })      // font size of words
      .on("end", drawWord);
    layout.start();

    function drawWord(words){
      d3.selectAll('.words').remove()
      

      sideViz
      // .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
      .data(words)
      .attr('class', 'words')
      .enter().append("text")
        .style("font-size", function(d) { return d.size ; })
        .style("fill", "white")
        .attr("text-anchor", "middle")
        .style("font-family", "Satoshi")
        .attr('class', 'words')
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
    }
    
    console.log(count_spo)
    console.log(count_apl)
    console.log(count_youtube)
    console.log(count_pandora)
    console.log(count_other)


    // Log the data to the console:
    console.log("Selected data: ", selectedData);
    
    console.log(selectCirs)
  } 

  function isBrushed(brush_coords, cx, cy) {

    var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];

   return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
  }
}
  }

  function reset(){
    circle
    
    .transition()
    .duration(1000)
    .attr('cx', function (d) {
      return xScale(d.Age);
    })
    .attr('cy', function (d) {
      return yScale(d.score);
    })
    .attr('fill', 'white');


  }

  
  

  // function repeat() {
  //   circle
  //     .transition()
  //     .duration((d) => d.bpm * 10)
  //     .attr('r', 3)

  //     .transition()
  //     .duration((d) => d.bpm * 10)
  //     .attr('r', 2)
  //     .on('end', () => setTimeout(repeat));
  // }

  // repeat();
  // circle.on('mouseover', function (d) {
  //   circle.attr('opacity', 0);
  // });
});

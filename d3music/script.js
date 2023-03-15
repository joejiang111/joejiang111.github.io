// load the audio file
const audioContext = new AudioContext();
const audioElement = document.getElementById('lang1.mp3');
const audioSource = audioContext.createMediaElementSource(audioElement);

// create the frequency analyzer
const frequencyAnalyzer = audioContext.createAnalyser();
frequencyAnalyzer.fftSize = 2048;
audioSource.connect(frequencyAnalyzer);

// create the visualization
const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

const x = d3.scaleBand().range([0, chartWidth]).padding(0.1);
const y = d3.scaleLinear().range([chartHeight, 0]);

const chart = svg
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

const bar = chart
  .selectAll('rect')
  .data(new Array(1024))
  .enter()
  .append('rect')
  .attr('x', (d, i) => x(i))
  .attr('y', chartHeight)
  .attr('width', x.bandwidth())
  .attr('height', 0);

// update the visualization
function updateVisualization() {
  const frequencyData = new Uint8Array(frequencyAnalyzer.frequencyBinCount);
  frequencyAnalyzer.getByteFrequencyData(frequencyData);

  x.domain(frequencyData.map((d, i) => i));
  y.domain([0, d3.max(frequencyData)]);

  bar
    .data(frequencyData)
    .attr('y', (d) => y(d))
    .attr('height', (d) => chartHeight - y(d));
}

// start the audio and update the visualization
audioElement.play();
setInterval(updateVisualization, 50);

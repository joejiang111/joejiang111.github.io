let song1, song2, buttton, amp1, amp2, fft;
let volHistory1 = [];
let volHistory2 = [];
let colors = [];

function preload() {
  song1 = loadSound('./music/langlang_firsttwo.mp4');
  song2 = loadSound('./music/richter_firsttwo.mp4');
  getAudioContext().resume();
}

function setup() {
  createCanvas(1200, 1000);
  song1.play();
  song2.play();

  // amp1 = new p5.Amplitude();
  fft = new p5.FFT();
  fft2 = new p5.FFT();
  console.log(fft, fft2);
  amp1 = new p5.Amplitude();
}

function draw() {
  background('white');
  let vol1 = amp1.getLevel();
  let vol2 = fft.analyze();

  volHistory1.push(vol1);
  volHistory2.push(vol2);
  // console.log(volHistory1);
  // console.log(volHistory2);
  let centroid;
  centroid = fft.getCentroid();

  let color_cal = map(centroid, 0, 4186.01, 0, 1);

  colors.push(color_cal);
  // console.log(colors);

  // console.log(volHistory.length);
  let posY = 100;
  let tracker1 = 0;
  let tracker2 = 0;
  let tracker3 = 0;
  let tracker4 = 0;

  for (let x = 0; x < volHistory2.length; x += 5) {
    tracker3 += 5;
    if (tracker3 > 100) {
      tracker3 = 5;
      tracker4 += 20;
    }

    noStroke();
    // console.log(x);
    // console.log(color[x]);
    let from = color(0, 0, 0);
    let to = color(255, 69, 0);
    let intercolor = lerpColor(from, to, colors[x]);
    // console.log(intercolor);

    fill(intercolor);
    // fill(colors[tracker]);
    // console.log(x % 100);
    ellipse((x % 100) * 1.8 + 500, tracker4 + posY, volHistory1[x] * 35);
  }
}

function touchStarted() {
  getAudioContext().resume();
}

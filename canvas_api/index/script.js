const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')
const image = document.querySelector('#source');
canvas.width = image.width;
canvas.height = image.height;

// let shapes = [];

let shapes = [];
const shapes1 = new Image()
shapes1.src = 'icons/1.svg'
const shapes2 = new Image()
shapes2.src = 'icons/2.svg'
const shapes3 = new Image()
shapes3.src = 'icons/3.svg'
const shapes4 = new Image()
shapes4.src = 'icons/4.svg'
const shapes5 = new Image()
shapes5.src = 'icons/5.svg'
const shapes6 = new Image()
shapes6.src = 'icons/6.svg'
const shapes7 = new Image()
shapes7.src = 'icons/7.svg'

shapes.push(shapes1, shapes2, shapes3, shapes4, shapes5, shapes6, shapes7);

const mapping = d3.scaleLinear().domain([0, 255]).range([0, 6])

image.addEventListener("load", (e) => {
    ctx.drawImage(image, 0, 0, image.width, image.height);

    
    for (let gridX = 0; gridX < image.width; gridX++) {
        for (let gridY = 0; gridY < image.height; gridY++) {
          // get the current color
          let c = ctx.getImageData(gridX, gridY, 1, 1).data;
          // greyscale conversion
          let greyscale = Math.round(c[0] * 0.222 + c[1] * 0.707 + c[2] * 0.071);
          let gradientToIndex = Math.round(d3.scaleLinear()
            .domain([0, 255])
            .range([0, shapes.length - 1])(greyscale));
          // draw the SVG file onto the canvas
         
          ctx.drawImage(shapes[gradientToIndex], gridX, gridY, 1, 1);
        }
      }

  });






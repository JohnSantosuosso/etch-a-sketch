//HTML notes
//canvas is an html element used for drawing
//canvas can be grabbed and then context
//canvas has set of methods used to draw
//canvas is the element, context is where we do drawing

//Select elements on page--canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 10; //when it's a true constant, we can use all UPPERCASE and underscore

//Setup our canvas for drawing
const { width, height } = canvas;
//short form of const width = canvas.width and const height = canvas.height
//this is called DESTRUCTURING and a short form way to do it

//create random x and y starting points on canvas
//we use let because we'll be reassigning x and y
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
let hue = 0
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; //change hsl/color
ctx.beginPath(); //start the drawing
ctx.moveTo(x, y); //200 pixels in, 200 pixels from top
ctx.lineTo(x, y);
ctx.stroke(); //connects moveTo with lineTo



//Write a draw function
function draw( { key }) { //object destructuring, instead of passing options or multiple keys, we just log the key
  //increment hue
  hue += 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y);

  //move our x and y values depending on what user did
  switch(key) {
    case 'ArrowUp' :
      y -= MOVE_AMOUNT; //y = y - 10;
      break;
    case 'ArrowDown' :
      y += MOVE_AMOUNT;
      break;
    case 'ArrowRight' :
      x += MOVE_AMOUNT; //x = x + 10
      break;
    case 'ArrowLeft' :
      x -= MOVE_AMOUNT;
      break;
    default: //must also add default and break
      break;
  }

  ctx.lineTo(x, y); //line to new x and y
  ctx.stroke();
};

//Write a handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) { //conditional to only handle key events that include arrow
    e.preventDefault(); //keeps entire page from moving
    draw({ key: e.key })
  }
};

//Clear-Shake function
function clearCanvas() {
  canvas.classList.add('shake'); //shake class is defined in CSS class to shake the screen, moves everything on canvas left and right
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener('animationend', function() {
    canvas.classList.remove('shake');
  },
  {once: true } //only does EventListener once (unbinds itself), alternative to removeEventListener
  );
}

//Listen for arrow keys
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);

//Getting all paths from the svg
let paths = document.getElementsByClassName("cycle-js")[0].getElementsByTagName("path");
let chosenColor = '1074B0'; //Default color
const clearButton = document.getElementById("clear").children[0];
const eraserButton = document.getElementById("eraser");
const backButton = document.getElementById("back");
let priorMoves = [];
let backCount = 0;

console.log('THISISIA: ', document.getElementsByClassName("colorSvg")[0].getElementsByTagName("path"));

var slideIndex = 1;
showDivs(slideIndex);
console.log(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("cycle-js");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
  //console.log('SLIDE INDEX: ', slideIndex);
  console.log(x);
  let j = slideIndex - 1;
  //console.log('J: ', j);
    
  setEventListeners(j);
}


function initializeButtons(){
    backButton.addEventListener("click", function(){
        console.log('Undoing...');
        priorMoves[backCount].el.style.fill = priorMoves[backCount].fill;
        backCount += 1;
        updateCanvas();
    });

    eraserButton.addEventListener("click", function(){
        chosenColor = "#FFFFFF";
    });

    clearButton.addEventListener("click", function(){
        for (const value of paths){
            if (value.getAttribute('fill') == '#FFFFFF') {
                value.style.fill = '#FFFFFF';
            }
        }
        updateCanvas();
        console.log('Canvas cleared!');
    });
}

function setEventListeners(j){
    //console.log(j);
    paths = document.getElementsByClassName("cycle-js")[j].getElementsByTagName("path");
   // console.log(paths);

    //Listens for a click on each path
    for (let value of paths){
        value.addEventListener("click", function(){
            //Makes sure the path isnt an outline
            if (value.getAttribute('fill') == '#FFFFFF') {
                setUndo(this);
                this.style.fill = chosenColor;
                updateCanvas();
                backCount = 0;
            } else {
                console.log('Clicked an outline!');
            }
        });
    }
}


function setUndo(el){
    let lastMove = new Object();
    lastMove.el = el;
    lastMove.fill = el.style.fill;

    //Adding last move to an array of past actions
    priorMoves.push(lastMove);
    priorMoves.unshift(lastMove);

    //Number sets length of history array. Limits how much memory app will take up
    if (priorMoves[40]){
        priorMoves.length = 40;
    }
}

function instantiateWheel(){
    //Makes sure canvas for the color wheel is instantiated
    var colorWheelCanvasInstantiation = new Promise(function(resolve, reject){
        html2canvas(document.getElementById("colorWheelImg")).then(function(canvas){
            document.body.appendChild(canvas);
            canvas.id = "color-wheel-canvas";

            return wasCanvasInstantiated(canvas);
    });

    function wasCanvasInstantiated(canvas){
        if (canvas){
                resolve('Color wheel canvas instantiated!');
            } else {
                reject(Error('Color wheel canvas did not instantiate. Try reloading the page.'));
            }
        }
    });

    //What to do after color wheel canvas is instantiated
    colorWheelCanvasInstantiation.then(function(result) {
        //console.log(result);
        document.getElementById("colorWheelImg").style.display = "none";
        document.getElementById("color-wheel-canvas").addEventListener("click", function(e){
            colorPick(e);
        });

    }, function(err){
        console.log(err);
    });
}

function colorPick(e){

    //Converts the RGB data to hex from the page data
    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    var colorWheelCanvas = document.getElementById("color-wheel-canvas");
    var context = colorWheelCanvas.getContext('2d');

   //Works on windows but not Mac????
   //Gets the position of the area clicked on the canvas
    // if (e.pageX || e.pageY) {
    //   x = e.pageX;
    //   y = e.pageY;
    // } else {
    //   x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    //   y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    // }

    // x -= colorWheelCanvas.offsetLeft;
    // y -= colorWheelCanvas.offsetTop;

    function getMousePos( canvas, evt ) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.floor( ( evt.clientX - rect.left ) / ( rect.right - rect.left ) * canvas.width ),
            y: Math.floor( ( evt.clientY - rect.top ) / ( rect.bottom - rect.top ) * canvas.height )
        };
    }

    var mousePos = getMousePos( colorWheelCanvas, e );

    var x = mousePos.x;
    var y = mousePos.y;

    //Gets image data on the position clicked
    var p = context.getImageData(x, y, 1, 1).data;
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

    //Sets the chosen color to the color clicked
    chosenColor = hex;
    console.log(`Chosen color: ${chosenColor} at X: ${x}, Y: ${y}`);
}

//Updates the canvas when a color is changed
//makes sure the img href is always up to date
function updateCanvas(){
    //console.log('updating');

    var imgCanvas = new Promise(function(resolve, reject){
    html2canvas(document.getElementsByClassName("colorSvg")[0]).then(function(canvas){
        document.body.appendChild(canvas);
        canvas.classList.add('canvas-history');

        return wasCanvasInstantiated(canvas);
    });

    function wasCanvasInstantiated(canvas){
        if (canvas){
                resolve('Sketch canvas instantiated!');
            } else {
                reject(Error('Sketch canvas did not instantiate. Try reloading the page.'));
            }
        }
    });

    imgCanvas.then(function(result) {
        //console.log('Result: ', result);
        //console.log('Canvas: ', document.getElementsByClassName('canvas-history')[0]);

        let canvas = document.getElementsByClassName("canvas-history")[0];
        const dl = document.getElementById("dl");

        //Sets the download link to the updated img
        dl.href = canvas.toDataURL("image/png");

        //Removes duplicate canvases so the first one is always up to date
        if (canvas){
            canvas.remove();
        }
    },
    function(err){
        console.log('Didnt work');
    });
}

//Prepares the download link after site is loaded
document.addEventListener("DOMContentLoaded", function(){
    updateCanvas();
    instantiateWheel();
    initializeButtons();
});

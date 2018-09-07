//Getting all paths from the svg
let paths = document.getElementsByClassName("cycle-js")[0].getElementsByTagName("path");
let chosenColor = '1074B0'; //Default color
const clearButton = document.getElementById("clear").children[0];
const eraserButton = document.getElementById("eraser");
const backButton = document.getElementById("back");
const rightArrow = document.getElementById("right-arrow");
const leftArrow = document.getElementById("left-arrow");

let priorMoves = [];
let backCount = 0;
var slideIndex = 1;
let colorDisplay = document.getElementById("pickedColor");

var grid = document.getElementById("grid");
var pageGroup = document.getElementById("pageGroup");
var viewAll = document.getElementById("viewAll");

let artists;

artists = [
    "Christina An",
    "Stephen Brennan",
    "John Davalos",
    "Angela Filtz",
    "Travis Hove",
    "Maxime Lewing",
    "Fiona Lynch",
    "Sara Meixner",
    "Elijah Rizzuto Smith",
    "Julia Schultz",
    "Ben Spurr",
    "Anthony Srnka",
    "Clay Tercek",
    "Michael Toone",
    "Ciaran Wagner",
    "Lindsey Wolfe"
];

showDivs(slideIndex);

function plusDivs(n) {
    console.log('plus divs added');
    showDivs(slideIndex += n);
    updateCanvas();
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
  document.getElementById("artistName").innerHTML = artists[slideIndex-1];
  console.log('SLIDE INDEX: ', slideIndex);
  console.log(x);
  let j = slideIndex - 1;
  //console.log('J: ', j);

    
  setEventListeners(j);
}



viewAll.addEventListener("click", showGrid);
function showGrid() {
    slideIndex = 1;
    viewAll.innerHTML = "back";
    pageGroup.style.display = 'none';
    grid.style.display = 'flex';
}
back.addEventListener("click", hideGrid);
function hideGrid(n) {
    viewAll.innerHTML = "View All Pictures";
    pageGroup.style.display = 'block';
    grid.style.display = 'none'; 
    plusDivs(n-1);
}

thumb1.addEventListener("click", function(){hideGrid(1)});
thumb2.addEventListener("click", function(){hideGrid(2)});
thumb3.addEventListener("click", function(){hideGrid(3)});
thumb4.addEventListener("click", function(){hideGrid(4)});
thumb5.addEventListener("click", function(){hideGrid(5)});
thumb6.addEventListener("click", function(){hideGrid(6)});
thumb7.addEventListener("click", function(){hideGrid(7)});
thumb8.addEventListener("click", function(){hideGrid(8)});
thumb9.addEventListener("click", function(){hideGrid(9)});
thumb10.addEventListener("click", function(){hideGrid(10)});
thumb11.addEventListener("click", function(){hideGrid(11)});
thumb12.addEventListener("click", function(){hideGrid(12)});
thumb13.addEventListener("click", function(){hideGrid(13)});
thumb14.addEventListener("click", function(){hideGrid(14)});
thumb15.addEventListener("click", function(){hideGrid(15)});
thumb16.addEventListener("click", function(){hideGrid(16)});
// thumb2.addEventListener("click", function(){showImage(2)});
// thumb3.addEventListener("click", function(){showImage(3)});
// thumb4.addEventListener("click", function(){showImage(4)});


function showImage(n) {
    grid.style.display = 'none';
    pageGroup.style.display = 'block';
    viewAll.innerHTML = "View all";
    showDivs(n);
    console.log(n);
    
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
        colorDisplay.style.backgroundColor = chosenColor;
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

    leftArrow.addEventListener("click", function(){plusDivs(-1);});
    rightArrow.addEventListener("click", function(){plusDivs(1)});
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

function instantiateColorCanvases(imgId, canvasId){
    let wheelCanvas;
    let img = document.getElementById(imgId);

    //Makes sure canvas for the color wheel is instantiated
    var colorWheelCanvasInstantiation = new Promise((resolve, reject) =>{
        var c = document.getElementById(canvasId);
        var ctx = c.getContext("2d");
        
        var rect = img.getBoundingClientRect();
        c.width = rect.width;
        c.height = rect.height;
        
        ctx.drawImage(img,0,0, rect.width, rect.height);

        return resolve(c);
    });

    //What to do after color wheel canvas is instantiated
    colorWheelCanvasInstantiation.then(function(result) {
        img.style.display = "none";
        result.addEventListener("click", function(e){
            colorPick(e, result);
        });

    }, function(err){
        console.log(err);
    });  
}

function colorPick(e, colorWheelCanvas){

    //Converts the RGB data to hex from the page data
    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    //var colorWheelCanvas = document.getElementById("color-wheel-canvas");
    var context = colorWheelCanvas.getContext('2d');

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

    colorDisplay.style.backgroundColor = chosenColor;
}

//Updates the canvas when a color is changed
function updateCanvas(){
    let i = slideIndex-1;
    createImg();

    function createImg(){
        var svg = document.getElementsByClassName("colorSvg")[0].children[i];
        var wrap = document.createElement("div");
        var img = new Image();
        var data;

        wrap.appendChild(svg.cloneNode(true));
        data = "data:image/svg+xml;base64," + window.btoa(wrap.innerHTML);
        img.src = data;

        return setTimeout(function(){drawHistoryCanvas(svg, img)}, 100);
    }
    
    //Draws new history canvas
    function drawHistoryCanvas(svg, img){

        let c = document.createElement('canvas');
        let ctx = c.getContext("2d");
        let rect = svg.getBoundingClientRect();
        
        document.body.appendChild(c);

        c.classList.add('canvas-history');
        c.setAttribute('viewbox', '0 0 ' + rect.width + ' ' + rect.height);
        c.setAttribute('width', rect.width);
        c.setAttribute('height', rect.height);

        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        
        return setLink(c);
    }

    //Makes sure the img href is always up to date
    function setLink(canvas){
        
        //Removes duplicate canvases so the first one is always up to date
        let latestCanvasHistory = document.getElementsByClassName("canvas-history")[0];
        if (latestCanvasHistory){
            latestCanvasHistory.remove();
        }

        //Sets the download link to the updated img
        let dl = document.getElementById("dl");
        dl.setAttribute('href', '');
        dl.href = document.getElementsByClassName("canvas-history")[0].toDataURL("image/png");

        return;
    }
}

//Prepares the download link after site is loaded
window.addEventListener("load", function(){
    updateCanvas();
    instantiateColorCanvases("colorWheelImg", "color-wheel-canvas");
    instantiateColorCanvases("colorWheelImg2", "mobile-color-wheel-canvas");
    initializeButtons();
    console.log('All page content loaded');
});

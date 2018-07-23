//Getting all paths from the svg
const paths = document.getElementsByTagName("path");
let chosenColor;

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
        console.log(result);
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
   
   //Gets the position of the area clicked on the canvas
    if (e.pageX || e.pageY) { 
      x = e.pageX;
      y = e.pageY;
    } else { 
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    }

    x -= colorWheelCanvas.offsetLeft;
    y -= colorWheelCanvas.offsetTop;
    
    //Gets image data on the position clicked
    var p = context.getImageData(x, y, 1, 1).data;
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    
    //Sets the chosen color to the color clicked
    chosenColor = hex;
    console.log(`Chosen color: ${chosenColor} at X: ${x}, Y: ${y}`);
}

//Listens for a click on each path
for (const value of paths){
    value.addEventListener("click", function(){
        this.style.fill = chosenColor;
         updateCanvas();
    });
}

//Updates the canvas when a color is changed
//makes sure the img href is always up to date
function updateCanvas(){
    console.log('updating');
    
    var imgCanvas = new Promise(function(resolve, reject){
    html2canvas(document.getElementsByClassName("svg")[0]).then(function(canvas){
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
        console.log(result);

        let canvas = document.getElementsByClassName("canvas-history")[0];
        const dl = document.getElementById("dl");

        //Sets the download link to the updated img
        dl.href = canvas.toDataURL("image/png");

        //Removes duplicate canvases so the first one is always up to date
        if (canvas){
            canvas.remove();
        }

    }, function(err){
        console.log(err);
    });
}

//Prepares the download link after site is loaded
document.addEventListener("DOMContentLoaded", function(){
    updateCanvas();
    instantiateWheel();
});
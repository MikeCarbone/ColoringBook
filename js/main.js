//Getting all paths from the svg
const paths = document.getElementsByTagName('path');

const colorPicker = document.getElementById('color-js');
let chosenColor = colorPicker.value;

//Adding event listener to each path that will change the paths color on pick
for (const value of paths){
	value.addEventListener("click", function(){
		this.style.fill = chosenColor;
		updateCanvas();
	});
}

//Updates the chosen color when it is changed through the picker
colorPicker.addEventListener("change", function(){
	chosenColor = colorPicker.value;
})

//Prepares the download link after site is loaded
document.addEventListener("DOMContentLoaded", function(){
	updateCanvas();
})

//Updates the canvas when a color is changed so the img href is always up to date
function updateCanvas(){
	
	//Turns the svg into canvas, allows export to png. Display: none in css
	html2canvas(document.getElementsByClassName('svg')[0]).then(function(canvas){
		document.body.appendChild(canvas);
	})

    //Gives the canvas time to initialize before setting href
    //This usually takes between 100-180ms
    setTimeout(function(){
    	let canvas = document.getElementsByTagName('canvas')[0];
	 	const dl = document.getElementById('dl');

	 	//Sets the download link to the updated img
	 	dl.href = canvas.toDataURL("image/png");

	 	//Removes duplicate canvases so the first one is always up to date
	    if (canvas){
	    	canvas.remove();
	    }
	}, 250);

	return dl;
}




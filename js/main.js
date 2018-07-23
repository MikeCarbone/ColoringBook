// //Getting all paths from the svg
// const paths = document.getElementsByTagName("path");
//
// $(function() {
//     $('img').click(function(e) {
//
//         //drawing the custom color wheel
//         if(!this.canvas) {
//             this.canvas = $('<canvas/>')[0];
//             this.canvas.width = this.width;
//             this.canvas.height = this.height;
//             this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
//         }
//
//         //getting the pixel data
//         var imgData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
//
//         //r,g,b,a values
//         var x = imgData[0];
//         var y = imgData[1];
//         var z = imgData[2];
//         var a = imgData[3];
//
//         $('#output').html('R: ' + x + '<br>G: ' + y + '<br>B: ' + z + '<br>A: ' + a);
//
//         function colorDeclartion() {
//             var total = 'rgba(' + x + ', ' + y + ', ' + z + ', ' + a + ')';
//             return total;
//         }
//
//         //shows the color swatch
//         $('.displayColor').css('background-color', colorDeclartion());
//         chosenColor = $('.displayColor').css('background-color');
//
//         //updates the picture with the chosen color
//         for (const value of paths){
//             value.addEventListener("click", function(){
//             this.style.fill = chosenColor;
//         // updateCanvas();
//     });
// }
//     });
// });
//
//
// //Updates the canvas when a color is changed
// //makes sure the img href is always up to date
//
// function updateCanvas(){
//
//     //Turns the svg into canvas, allows export to png. Display: none in css
//     html2canvas(document.getElementsByClassName("svg")[0]).then(function(canvas){
//         document.body.appendChild(canvas);
//     });
//
//     //Gives the canvas time to initialize before setting href
//     //This usually takes between 100-180ms
//     setTimeout(function(){
//         let canvas = document.getElementsByTagName("canvas")[0];
//         const dl = document.getElementById("dl");
//
//         //Sets the download link to the updated img
//         dl.href = canvas.toDataURL();
//
//         //Removes duplicate canvases so the first one is always up to date
//         if (canvas){
//             canvas.remove();
//         }
//     }, 250);
//
//     return dl;
// }
//
// //Prepares the download link after site is loaded
// document.addEventListener("DOMContentLoaded", function(){
//     updateCanvas();
// });


var slideIndex = 1;
showDivs(slideIndex);
console.log(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("gallery_images");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}

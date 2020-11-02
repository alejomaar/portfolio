//All this code depend to Imageloadanddrag.js file 
var WidthBox ;
var HeigthBox ;
let OutImgCanvas;

function startSketch(){
  var sketch = function( p ) {

    var WidthBox ;
    var HeigthBox ;
    let OutImgCanvas;

    p.preload=function()
    {
        OutImgCanvas = p.loadImage('/Image/Gorila.jpg');
        WidthBox = $("BoxOutputImg").offsetWidth;
        HeigthBox = $("BoxOutputImg").offsetHeight;
        console.log(OutImgCanvas);
        
    }
    p.setup = function() {
        var Canvas =p.createCanvas(WidthBox, HeigthBox);
        Canvas =Canvas.parent("BoxOutputImg");
    };

    p.draw = function() {
      p.background(0);
      p.image(OutImgCanvas,p.mouseX,p.mouseY,WidthBox,HeigthBox);

    };
  };
  var myp5 = new p5(sketch);
}
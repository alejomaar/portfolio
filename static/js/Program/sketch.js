//All this code depend to Imageloadanddrag.js file 
var WidthBox ;
var HeigthBox ;
let OutImgCanvas;

function startSketch(urlimage){
  var sketch = function( p ) {

    let OutImgCanvas;

    p.preload=function()
    {
      
        OutImgCanvas = p.loadImage(urlimage);
        console.log(OutImgCanvas);
        
    }
    p.setup = function() {
        WidthBox = $("BoxOutputImg").offsetWidth;
        HeigthBox = $("BoxOutputImg").offsetHeight;
        var Canvas =p.createCanvas(WidthBox, HeigthBox);
        
        Canvas =Canvas.parent("BoxOutputImg");

       // 
       
    };

    p.draw = function() {
      p.background(255, 204, 0);
      p.image(OutImgCanvas,0, 0, p.mouseX, p.mouseY);

    };

    p.windowResized = function() {
      WidthBox = $("BoxOutputImg").offsetWidth;
      HeigthBox = $("BoxOutputImg").offsetHeight;
      console.log("entre");
      p.resizeCanvas(WidthBox, HeigthBox);
    }
  };
  var myp5 = new p5(sketch);
}
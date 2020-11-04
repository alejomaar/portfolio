//All this code depend to Imageloadanddrag.js and p5.js file 
// startSketch is called from Imageloadanddrag.js in selectimage function

function startSketch(urlimage){
  var sketch = function( p ) {

    let OutImgCanvas;
    let WidthBox;
    let HeigthBox;

    let ImgDom;

    p.preload=function()
    { 
        OutImgCanvas = p.loadImage(urlimage);
        //OutImgCanvas = p.loadImage("/static/Image/Gato.jpg");
        ImgDom = $("BoxInputImg").querySelector("img");

        WidthBox = $("BoxOutputImg").offsetWidth;
        HeigthBox = $("BoxOutputImg").offsetHeight;

    }
    p.setup = function() {
        
        var Canvas =p.createCanvas(WidthBox, HeigthBox);
        Canvas =Canvas.parent("BoxOutputImg");
       // p.loadPixels();
        OutImgCanvas.loadPixels();
        p.loadPixels();
        algo();
        OutImgCanvas.updatePixels();
        p.updatePixels();
       // p.image(OutImgCanvas,0,0,ImgDom.offsetWidth, ImgDom.offsetHeight);
        //end test
        p.image(OutImgCanvas,p.middleimgx(),p.middleimgy(), ImgDom.offsetWidth, ImgDom.offsetHeight);

    };

    function algo()
    {
      var pixeles = OutImgCanvas.pixels;
      
      for (y = 0; y < OutImgCanvas.height; y++) {
        for (x = 0; x < OutImgCanvas.width; x++) {
          let index = (x + y * OutImgCanvas.width) * 4;

          let gray = (pixeles[index]+pixeles[index + 1]+pixeles[index + 2])/3;

          pixeles[index] = gray;
          pixeles[index + 1] = gray;
          pixeles[index + 2] = gray;
         // pixeles[index + 3] = 255;
        }
      }
     // console.log(pixeles);
      //console.log(OutImgCanvas.pixels);
      
    }

    /*p.draw = function() { 
      p.background(0); 
      
        p.image(OutImgCanvas,0,0,p.mouseX, p.mouseY);

    };*/

    

    p.writeColor= function(image, x, y, red, green, blue, alpha) {
      
      image.pixels[index] = red;
      image.pixels[index + 1] = green;
      image.pixels[index + 2] = blue;
      image.pixels[index + 3] = alpha;
    }

    

    p.middleimgx = function(){
      return (p.width-ImgDom.offsetWidth)/2;
    };

    p.middleimgy = function(){
      return (p.height-ImgDom.offsetHeight)/2;
    };

    

    p.windowResized = function() {
      WidthBox = $("BoxOutputImg").offsetWidth;
      HeigthBox = $("BoxOutputImg").offsetHeight;

      p.resizeCanvas(WidthBox, HeigthBox);
    }
  };
  var myp5 = new p5(sketch);
}

/*const pixels32 = new Int32Array(OutImgCanvas.pixels.buffer);
      console.log(pixels32);*/
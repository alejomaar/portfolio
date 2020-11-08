//All this code depend to Imageloadanddrag.js and p5.js file 
// startSketch is called from Imageloadanddrag.js in selectimage function
var myp5;
function startSketch(urlimage){
  var sketch = function( p ) {

    let OutImgCanvas;
    let copyimg;
    let WidthBox;
    let HeigthBox;
    let ImgDom;

    p.preload=function()
    { 
        OutImgCanvas = p.loadImage(urlimage);
       // OutImgCanvas = p.loadImage("/static/Image/Gato.jpg");
        ImgDom = $("BoxInputImg").querySelector("img");
        WidthBox = $("BoxOutputImg").offsetWidth;
        HeigthBox = $("BoxOutputImg").offsetHeight;
        

    }
    p.setup = function() {
        
        copyimg = OutImgCanvas.get();
        var Canvas =p.createCanvas(WidthBox, HeigthBox);
        Canvas =Canvas.parent("BoxOutputImg");

        OutImgCanvas.loadPixels();

        Sepia();
        OutImgCanvas.updatePixels();

        p.image(OutImgCanvas,p.middleimgx(),p.middleimgy(), ImgDom.offsetWidth, ImgDom.offsetHeight);
        p.noLoop();
    };

    p.draw = function() { 
      p.image(OutImgCanvas,p.middleimgx(),p.middleimgy(), ImgDom.offsetWidth, ImgDom.offsetHeight);
    };

    p.sliderMove = function () {

      let Sliders = document.getElementsByName("T_Slider");
      let RedValue = parseFloat(Sliders[0].value)*1.0/100+1 ;
      let GreenValue = parseFloat(Sliders[1].value)*1.0/100+1 ;
      let BlueValue = parseFloat(Sliders[2].value)*1.0/100+1 ;

      //Copy original pixel of a image 
      OutImgCanvas = copyimg.get();
      //Load pixels to object image 
      OutImgCanvas.loadPixels();
      //Transform pixels to sepia tone
      Sepia(RedValue,GreenValue,BlueValue);
      OutImgCanvas.updatePixels();
      p.redraw(1);
    };

    function Sepia(WeightR=1,WeightG=1,WeightB=1 )
    {

      var pixeles = OutImgCanvas.pixels;

      for (y = 0; y < OutImgCanvas.height; y++) {
        for (x = 0; x < OutImgCanvas.width; x++) {
          let index = (x + y * OutImgCanvas.width) * 4;

          let redI = pixeles[index]*WeightR;
          let greenI = pixeles[index+1]*WeightG;
          let blueI = pixeles[index+2]*WeightB;
    // let gray = WeightR*pixeles[index]+WeightG*pixeles[index + 1]+WeightB*pixeles[index + 2];
          pixeles[index] = redI*0.393+greenI*0.769+blueI*0.189;
          pixeles[index + 1] = redI*0.349+greenI*0.686+blueI*0.168;
          pixeles[index + 2] = redI*0.272+greenI*0.536+blueI*0.131;
         // pixeles[index + 3] = 255;
        }
      }
    }

    p.windowResized = function() {
      WidthBox = $("BoxOutputImg").offsetWidth;
      HeigthBox = $("BoxOutputImg").offsetHeight;

      p.resizeCanvas(WidthBox, HeigthBox);
      p.redraw(1);
    }

    p.middleimgx = function(){
      return (p.width-ImgDom.offsetWidth)/2;
    };

    p.middleimgy = function(){
      return (p.height-ImgDom.offsetHeight)/2;
    };
  };
  myp5 = new p5(sketch);
  isImgActive=true;
}



/*const pixels32 = new Int32Array(OutImgCanvas.pixels.buffer);
      console.log(pixels32);*/
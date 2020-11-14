//All this code depend to Imageloadanddrag.js and p5.js file 
// startSketch is called from Imageloadanddrag.js in selectimage function
var myp5;
function startSketch(){
  var sketch = function( p ) {
    var HexagonX = [];
    var HexagonY = [];

    var subdivition=2;
    var ScaleFactor=0.333;
    

    p.setup = function() {
        
      //Dom container
      var container = $("ContainerSketch");
      var Width = container.offsetWidth; 
      var Heigth = container.offsetHeight; 

      //Canvas
      var Canvas =p.createCanvas(Width, Heigth);
      Canvas =Canvas.parent("ContainerSketch");
      //Background and color
      p.noStroke();
      p.colorMode(p.HSB);
      p.background(p.color(240, 19,10));

      //Set vertex of tris 
      HexagonVertex();
      p.noLoop();

    };
    

    p.draw = function() { 
      console.log("entre");
      p.background(p.color(240, 19,10  ));
      PaintHexagon(HexagonX,HexagonY,subdivition);       
      
    };


    function HexagonVertex()
    {
      //Default vertex
      let iter=0;
      let anglemin=Math.PI*2/6;
      let angle=anglemin;
      let radius = p.min(p.height,p.width)*0.4;
      //Position of Hexagon 
      PosX = p.width*0.5;
      PosY = p.height*0.5;
      console.log("X: "+PosX+" y: "+PosY);
      //Create Hexagon
      for(iter=0;iter<=5;iter++)
      {
        HexagonX.push(radius*Math.cos(angle));
        HexagonY.push(radius*Math.sin(angle));
        angle+=anglemin;
      }
      //Move Hexagon to center
      for(iter=0;iter<=5;iter++)
      {
        HexagonX[iter]+=PosX;
        HexagonY[iter]+=PosY;
      }
    }

    function PaintHexagon(newHexX,newHexY,iter)
    {
      //cycle through all vertex to paint
      if(iter==1)
      {
        p.fill(p.color(p.random(300,360), 100, 100));
        p.beginShape();
        for(let iter=0;iter<=5;iter++)
        {
          p.vertex(newHexX[iter],newHexY[iter]);
        }
        p.endShape();
      }else{
        let HexNew0x = NewHex(newHexX,0);
        let HexNew0y = NewHex(newHexY,0);
        let HexNew1x = NewHex(newHexX,1);
        let HexNew1y = NewHex(newHexY,1);
        let HexNew2x = NewHex(newHexX,2);
        let HexNew2y = NewHex(newHexY,2);
        let HexNew3x = NewHex(newHexX,3);
        let HexNew3y = NewHex(newHexY,3);
        let HexNew4x = NewHex(newHexX,4);
        let HexNew4y = NewHex(newHexY,4);
        let HexNew5x = NewHex(newHexX,5);
        let HexNew5y = NewHex(newHexY,5);
        PaintHexagon(HexNew0x,HexNew0y,iter-1);
        PaintHexagon(HexNew1x,HexNew1y,iter-1);
        PaintHexagon(HexNew2x,HexNew2y,iter-1);
        PaintHexagon(HexNew3x,HexNew3y,iter-1);
        PaintHexagon(HexNew4x,HexNew4y,iter-1);
        PaintHexagon(HexNew5x,HexNew5y,iter-1);
      }
           
    }
    //Scale hexagon point 
    //Hex: Array of vertex of Hexagone
    //Vertex: Vertex to Adjust
    function NewHex(Hex,VertexIndex){
      //let HexOld = Hex.slice();
      let CenterHexOld = center(Hex);
      
      var HexOld =Hex.map((vertex)=>{
        return vertex-CenterHexOld;
      });

      var HexNew =HexOld.map((vertex)=>{
        return vertex*ScaleFactor;
      });

      var HexNewMove =HexNew.map((vertex)=>{
        return vertex-HexNew[VertexIndex]+Hex[VertexIndex];
      });
      
   
      return HexNewMove;
    }
    function center(Hex){
      return (Hex[0]+Hex[1]+Hex[2]+Hex[3]+Hex[4]+Hex[5])/6;
    }
    
    p.sliderMove = function () {
      //Get elements of dom 
      let Sliders = document.getElementsByName("T_Slider");
      subdivition = parseInt(Sliders[0].value) ;
      //Redraw Hexagon 
      p.redraw(1);
    };

    

    p.windowResized = function() {
      var Width = $("ContainerSketch").offsetWidth;
      var Heigth = $("ContainerSketch").offsetHeight;
      HexagonX = [];
      HexagonY = [];
      HexagonVertex();
      p.resizeCanvas(Width, Heigth);
      p.redraw(1);
    }

    
  };
  myp5 = new p5(sketch);
}



/*const pixels32 = new Int32Array(OutImgCanvas.pixels.buffer);
      console.log(pixels32);*/
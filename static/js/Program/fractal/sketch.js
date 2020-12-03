//All this code depend to Imageloadanddrag.js and p5.js file 
// startSketch is called from Imageloadanddrag.js in selectimage function
var myp5;
function startSketch(){
  var sketch = function( p ) {
    var TrisX = [];
    var TrisY = [];
    var clickIter=0;
    var subdivition=2;


    p.setup = function() {
        
      //Dom container
      var container = $("ThreeContainer");
      var Width = container.offsetWidth; 
      var Heigth = container.offsetHeight; 

      //Canvas
      var Canvas =p.createCanvas(Width, Heigth);
      Canvas =Canvas.parent("ThreeContainer");
      Canvas.mouseClicked(mouseClic);
      //Background and color
      p.noStroke();
      p.colorMode(p.HSB);
      p.background(p.color(240, 19,10));

      //Set vertex of tris 
      TrisVertex();
      p.noLoop();
      TrisSerpinsky(TrisX[0], TrisY[0], TrisX[1], TrisY[1],TrisX[2], TrisY[2],subdivition);         

    };
    

    p.draw = function() { 
      if(clickIter==3)
      {
        p.background(p.color(240, 19,10  ));
        TrisSerpinsky(TrisX[0], TrisY[0], TrisX[1], TrisY[1],TrisX[2], TrisY[2],subdivition);       
      }
      
    };

    function TrisSerpinsky(x1,y1,x2,y2,x3,y3,iter,value=100)
    {
      let p12x= (x1+x2)*0.5;
      let p12y= (y1+y2)*0.5;
      let p23x= (x2+x3)*0.5;
      let p23y= (y2+y3)*0.5;
      let p13x= (x1+x3)*0.5;
      let p13y= (y1+y3)*0.5;

      

     
      if(iter==1)
      {
        p.fill(p.color(p.random(300,360), value, 100));
        p.triangle(x1, y1, p12x, p12y,p13x,p13y); 
        p.triangle(p13x,p13y, p23x, p23y,x3,y3); 
        p.triangle(p12x, p12y, x2, y2,p23x, p23y); 

      }else{
        let value1 = value*p.random(0.5,1);
        let value2 = value*p.random(0.9,1);
        let value3 = value*p.random(1,1.3);
        
        TrisSerpinsky(x1, y1, p12x, p12y,p13x,p13y,iter-1,value1); 
        TrisSerpinsky(p13x,p13y, p23x, p23y,x3,y3,iter-1,value2); 
        TrisSerpinsky(p12x, p12y, x2, y2,p23x, p23y,iter-1,value3); 

        let Cx= (p12x+p23x+p13x)/3;//Center X of center ttris
        let Cy= (p12y+p23y+p13y)/3;//Center Y of center ttris
        p.triangle(SPivot(p12x,Cx), SPivot(p12y,Cy), SPivot(p23x,Cx), SPivot(p23y,Cy),SPivot(p13x,Cx), SPivot(p13y,Cy)); 
        
      }      
    }
    //Scale point alround center 
    function SPivot(point,center){
      return (point-center)*0.8+center;
    }

    function TrisVertex(x1,y1,x2,y2,x3,y3)
    {
      //Default vertex
      if(arguments.length==0)
      {
        x1= 0.1*p.width;
        y1= 0.1*p.height;
        x2= 0.5*p.width;
        y2= 0.9*p.height;
        x3= 0.9*p.width;
        y3= 0.1*p.height;
      }
      TrisX = [x1,x2,x3];
      TrisY = [y1,y2,y3];   
      //console.log(TrisX);
    }

    function mouseClic()
    {
      //Set actual vertex
      TrisX[clickIter]=p.mouseX;
      TrisY[clickIter]=p.mouseY;
      clickIter++; 
      //Draw circle or tris 
      p.circle(p.mouseX,p.mouseY, 20);
      p.redraw(1);  
      //restart tris
      if(clickIter==3) {    
        clickIter=0;//reset clic vertex 
      }
    }


    p.sliderMove = function () {
      //Get elements of dom 
      let Sliders = document.getElementsByName("T_Slider");
      subdivition = parseInt(Sliders[0].value) ;
      //Redraw Triangle with new iterations 
      p.background(p.color(0,0,0));
      TrisSerpinsky(TrisX[0], TrisY[0], TrisX[1], TrisY[1],TrisX[2], TrisY[2],subdivition);       
      p.redraw(1);
    };

    

    p.windowResized = function() {
      var Width = $("ThreeContainer").offsetWidth;
      var Heigth = $("ThreeContainer").offsetHeight;

      p.resizeCanvas(Width, Heigth);
      p.redraw(1);
    }

    
  };
  myp5 = new p5(sketch);
}



/*const pixels32 = new Int32Array(OutImgCanvas.pixels.buffer);
      console.log(pixels32);*/
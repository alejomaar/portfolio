class Dodecaedro {
  constructor(factor=1)
  {
    this.a = (1 + Math.sqrt(5)) / 2; // numero aureo
    this.i = 1 / this.a;
    this.vertex; 
    this.face; 
    this.factor=factor;
    this.setVertex();
    this.scale(factor);
    //this.setFace(); 
  }
  setVertex()
  {
    this.vertex= [
      [this.i,0,this.a],
      [-this.i,0,this.a],
      [-this.i,0,-this.a],
      [this.i,0,-this.a],

      [this.a,this.i,0],
      [this.a,-this.i,0],
      [-this.a,-this.i,0],
      [-this.a,this.i,0],

      [0,this.a,this.i],
      [0,this.a,-this.i],
      [0,-this.a,-this.i],
      [0,-this.a,this.i],

      [1,1,1],
      [1,-1,1],
      [-1,-1,1],
      [-1,1,1],

      [-1,1,-1],
      [1,1,-1],
      [1,-1,-1],
      [-1,-1,-1]
    ]
  }
  get getFace()
  { 
    var vertex = this.vertex;
    var face=[
      [vertex[19],vertex[10],vertex[11],vertex[14],vertex[6]],
      [vertex[2],vertex[19],vertex[6],vertex[7],vertex[16]],
      [vertex[18],vertex[10],vertex[19],vertex[2],vertex[3]],
      [vertex[12],vertex[8],vertex[15],vertex[1],vertex[0]],
      [vertex[2],vertex[16],vertex[9],vertex[17],vertex[3]],
      [vertex[4],vertex[17],vertex[9],vertex[8],vertex[12]],
      [vertex[14], vertex[1] ,vertex[15], vertex[7], vertex[6]], //7
      [vertex[0] ,vertex[13], vertex[5], vertex[4],vertex[12]], //8
	    [vertex[7], vertex[15], vertex[8], vertex[9], vertex[16]], //9
	    [vertex[11], vertex[10], vertex[18], vertex[5], vertex[13]], //10
	    [vertex[14], vertex[11], vertex[13], vertex[0], vertex[1]], //11
	    [vertex[3], vertex[17], vertex[4], vertex[5], vertex[18]] //12

    ]
    return face;
  } 
  scale(factor)
  {
    //Para cada vertice
    this.vertex=this.vertex.map(vertex=>{
      //Para cada valor del vertice 
      return vertex.map(value=>{
          return value*factor;
      });
    });
  }

  move(Dx,Dy,Dz)
  {
    //Para cada vertice
    this.vertex=this.vertex.map(vertex=>{
      //Move cada valor del vertice 
      vertex[0]+=Dx;
      vertex[1]+=Dy;
      vertex[2]+=Dz;
      return vertex;
    });
  }
  subDodecaedro(indexVertex)
  {
    var scalenew= 0.2763932;
    var smallDodecaedro = new Dodecaedro(this.factor*scalenew);
    var smallVertexMove = smallDodecaedro.vertex[indexVertex];
    var bigVertexMove =this.vertex[indexVertex];
    smallDodecaedro.move(bigVertexMove[0]-smallVertexMove[0],bigVertexMove[1]-smallVertexMove[1],bigVertexMove[2]-smallVertexMove[2]);
    return smallDodecaedro;
  }
}
//All this code depend to p5.js file 
var myp5;

function startSketch(){
  var sketch = function( p ) {
    var D = new Dodecaedro(120);
    var subdivition=2;

    p.setup = function() {
        
      //Dom container
      var container = $("ContainerSketch");
      var Width = container.offsetWidth; 
      var Heigth = container.offsetHeight; 

      //Canvas
      var Canvas =p.createCanvas(Width, Heigth,p.WEBGL);
      Canvas =Canvas.parent("ContainerSketch");
      //Background and color
      p.colorMode(p.HSB);
      p.background(100);
      p.noStroke();

      p.frameRate(10);
      
      //p.noLoop();

    };
    

    p.draw = function() { 
      p.rotateX(p.frameCount * 0.0001);
      p.rotateY(p.frameCount * 0.015);

      let locX = 150*p.mouseX/p.width;
      //console.log(locX+" "+p.width)
      p.background(100);

      p.ambientLight(360,0,100);
      p.directionalLight(255, 0, 0, 0.25, 0.25, 0);
      p.pointLight(360,0,100,0, 100,0);
      //p.pointLight(360,0,100,100, 100,50);
      p.pointLight(360,0,100,p.cos(p.TWO_PI*locX), 0,p.sin(p.TWO_PI*locX));
      p.specularMaterial(250);  
      /*;
      ;
      */
  
      
      /*p.ambientLight(360, 0, 100);
      ;*/
      
      
      //p.camera(0,0,p.height*0.5);
      paintDodecaedro(D,180,subdivition);
      
      
      
    };

    function paintDodecaedro(Dodecaedro,color,iter)
    {
      if(iter==1)
      {
        
        
        Dodecaedro.getFace.forEach((Face,index) => { 
          var hue =  (color +Rhue())%360;
          var value = Rcolor(index,12);
          //console.log(rcolor);
          p.ambientMaterial(hue, 80, value);
          p.beginShape();
          p.vertex(Face[0][0],Face[0][1],Face[0][2]);
          p.vertex(Face[1][0],Face[1][1],Face[1][2]);
          p.vertex(Face[2][0],Face[2][1],Face[2][2]);
          p.vertex(Face[3][0],Face[3][1],Face[3][2]);
          p.vertex(Face[4][0],Face[4][1],Face[4][2]);
          p.endShape();
        });
      }else{    
        var rangecolor= 100/(subdivition-iter+1);
        for (var DodeIndex=0;DodeIndex<20;DodeIndex++)
        {
          var newD= Dodecaedro.subDodecaedro(DodeIndex);
          var newcolor = color +DodeIndex*rangecolor/19;
          
          paintDodecaedro(newD,newcolor,iter-1);

         

        }
        

      }
 
    }

    function Rhue()
    {
      return p.map(p.mouseX,0,p.width,0,100);
    }

    function Rcolor(value,period)
    {
      var random= p.cos(p.PI*value/period);
      
      return p.map(random,-1,1,20,100);
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
      p.resizeCanvas(Width, Heigth);
      //p.redraw(1);
    }

    
  };
  myp5 = new p5(sketch);
}

  






/*const pixels32 = new Int32Array(OutImgCanvas.pixels.buffer);
      console.log(pixels32);*/
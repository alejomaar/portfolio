// Box Image Scope

const BoxInputImgOff = $("BoxInputImg").cloneNode(true);
const BoxOutputImgOff = $("BoxOutputImg").cloneNode(true);
var ImageActive=false;
//const BoxEmpty =NewBoxEmpty();

//Creates empty box container agree if it is input or output
function BoxEmpty(isInput){
    var newbox = BoxOutputImgOff.cloneNode(true);
    if(isInput){
        newbox.setAttribute("id","BoxInputImg");
        newbox.querySelector("img").setAttribute("id","InputImg");
    }

    newbox.classList.add("activeimage");
    //reset style
    newbox.querySelector("span").remove();
    return newbox;
}

//remplace old box container to new box 
function BoxRemplace(Oldelement,Newelemet)
{
    var NewElement =Oldelement.insertAdjacentElement('afterend',Newelemet);
    Oldelement.remove();
    
    return NewElement;
}

// Input scope

//Obtener elementos del input de laimagen
var BoxInputImg = document.getElementById("BoxInputImg");
var fileimg = document.getElementById("file");

//javascript de mouse over con los elementos
BoxInputImg.addEventListener('dragover',(e)=>{
    e.preventDefault();
    BoxInputImg.style.opacity ="0.5";
})

BoxInputImg.addEventListener('dragleave',(e)=>{
    e.preventDefault();
    BoxInputImg.style.opacity ="1";
})

//This function is called after to click (Select file) (NO MOUSE DROP)
function selectimage (img)
{
    //Change Aspect of Input Box
    BoxImgOnInput = BoxRemplace(BoxInputImg,BoxEmpty(true));    
    BoxImgOnInput.querySelector("img").src= window.URL.createObjectURL(img.files[0]);
    BoxImgOnInput.querySelector("img").style.display= "block";
    //Change Aspect of Output Box

    BoxImgOnOutput = BoxRemplace($("BoxOutputImg"),BoxEmpty());
    BoxImgOnOutput.querySelector("img").src = window.URL.createObjectURL(img.files[0]);
    BoxImgOnOutput.querySelector("img").style.display= "block";

    //Call to p5js to draw in canvas
    /*ImageActive=true;
    startSketch();*/
    
} 

// Añadir elemento al soltarlo en la zona de drop
BoxInputImg.addEventListener('drop',(e)=>{
    e.preventDefault();
    //Change Aspect of Input Box
    BoxImgOnInput = BoxRemplace(BoxInputImg,BoxEmpty(true));    
    BoxImgOnInput.querySelector("img").src= window.URL.createObjectURL(e.dataTransfer.files[0]);
    BoxImgOnInput.querySelector("img").style.display= "block";
    //Change Aspect of Output Box
    BoxImgOnOutput = BoxRemplace($("BoxOutputImg"),BoxEmpty());
    BoxImgOnOutput.querySelector("img").src = window.URL.createObjectURL(e.dataTransfer.files[0]);
    BoxImgOnOutput.querySelector("img").style.display= "block";

    ImageActive=true;

})


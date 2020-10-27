function $(x) {return document.getElementById (x);} 

const interactionmenu = $("interactionmenu");
const SliderTemplate = $("SliderTemplate").content;

function sliderCreate(Title,Minvalue="0",Maxvalue="100",Initvalue)
{
    if (Initvalue === undefined){
        Initvalue = (parseFloat(Minvalue)+parseFloat(Maxvalue))/2; }
    //Get Template slider
    var newslider = SliderTemplate.cloneNode(true);
    //set title of the slider
    //SUPER IMPORTANTE (SELECCION DINAMICA)
    newslider.querySelector('[name="Title"]').textContent= Title;

    //Set attributes of input slider element
    var InputSlider =newslider.querySelector("input");
    InputSlider.setAttribute("type","range");
    InputSlider.setAttribute("min",Minvalue);
    InputSlider.setAttribute("max",Maxvalue);
    InputSlider.setAttribute("value",Initvalue);
    
    //Get span marks of values of slider 
    var spansmarks = newslider.querySelectorAll('[name="InputValue"]');
    //set span values
    spansmarks[0].textContent = Minvalue;
    spansmarks[1].textContent = Maxvalue;
    //Add template to html structure
    interactionmenu.appendChild(newslider);
}


sliderCreate("Red color","10","50","15");
sliderCreate("Green color",undefined,undefined,"10");
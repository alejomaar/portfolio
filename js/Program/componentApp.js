function SliderRange(Title,MinValue,Maxvalue,initvalue)
{
    //Obtener elementos 
    var MenuOption = document.getElementById("interactionmenu");
    //Declarar elementos
    var containerslider = document.createElement("DIV");

    var titleslider = document.createElement("SPAN");
    titleslider.textContent = Title;

    var slider = document.createElement("INPUT");
    slider.classList.add("slider");
    slider.setAttribute("type","range");
    slider.setAttribute("min",MinValue);
    slider.setAttribute("max",Maxvalue);
    slider.setAttribute("value",initvalue);

    var containerspan = document.createElement("DIV");
    containerspan.classList.add("Xflexbetween");
    containerspan.classList.add("w100");

    var spanmin = document.createElement("SPAN");
    spanmin.textContent = MinValue;

    var spanmax = document.createElement("SPAN");
    spanmax.textContent = Maxvalue;
    //Estructurar elementos de menor al mayor

    //level 3
    containerspan.appendChild(spanmin);
    containerspan.appendChild(spanmax);
    //level 2
    containerslider.appendChild(titleslider)
    containerslider.appendChild(slider)
    containerslider.appendChild(containerspan)
    //level 1
    MenuOption.appendChild(containerslider);
}
SliderRange("Red color","10","50","15");
SliderRange("Green color","10","50","15");
SliderRange("Blue color","20","150","80");
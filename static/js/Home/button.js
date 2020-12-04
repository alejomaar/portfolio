//Getting Buttons 
var buttons = document.querySelectorAll("button");
//Add Click listener to all buttons 
buttons.forEach(element =>{
    element.addEventListener("click",()=> {
        //Select and remove Active Button
        var activeelement = document.querySelectorAll(".activebutton")[0];
        activeelement.classList.remove("activebutton");
        //Set actual Active Button
        element.classList.add("activebutton");
        filter(element);
    });
});

function filter(button)
{
    var Programacion = document.querySelectorAll('[name=Programacion]');
    var Arte = document.querySelectorAll('[name=Arte]');
    if(button.id=='FilterArte'){  
        showcard(Arte);
        hidecard(Programacion)
    }else if(button.id=='FilterProgramacion'){  
        showcard(Programacion);
        hidecard(Arte)
    }else if(button.id=='FilterNone'){ 
        showcard(Arte); 
        showcard(Programacion);
    }
}
function showcard(cards)
{
    cards.forEach(card => {
        card.style.display="block";
    });
}
function hidecard(cards)
{
    cards.forEach(card => {
        card.style.display="none";
        
    });
}

/*function buttonmenu(button)
{
    var activeelement = document.getElementsByClassName("activebutton");
    activeelement[0].classList.remove("activebutton");
    button.classList.add("activebutton");
}*/
function $(x) {return document.getElementById (x);} 

const porfolio = $("Portafolio");
const card = $("card").content;


function createcard(titletext,descripciontext,imgname)
{
    var newcard = card.cloneNode(true);
    newcard.querySelector("img").src= "/static/Image/Home/"+imgname+".svg";
    newcard.querySelector("h2").textContent= titletext;
    newcard.querySelector("p").textContent= descripciontext;
    porfolio.appendChild(newcard);
}


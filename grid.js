function createcard(titletext,descripciontext)
{
    //Declarar elementos
    var lista = document.getElementById("Portafolio");

    var program = document.createElement("DIV");
    program.classList.add("program")

    var card = document.createElement("DIV");

    var image = document.createElement("DIV");
    image.classList.add("image")

    var titlediv = document.createElement("DIV");
    titlediv.classList.add("title")

    var title = document.createElement("H2");
    title.textContent = titletext;

    var descriptiondiv = document.createElement("DIV");
    descriptiondiv.classList.add("description")

    var description = document.createElement("P");
    description.textContent = descripciontext;

    //Estructurar elementos de menor al mayor

    //Level 3
    titlediv.appendChild(title);
    descriptiondiv.appendChild(description);
    //level 2
    card.appendChild(image);
    card.appendChild(titlediv);
    card.appendChild(descriptiondiv);
    //level1
    program.appendChild(card);
    //Level 0
    lista.appendChild(program)
}









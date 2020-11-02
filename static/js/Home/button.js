function buttonmenu(button)
{
    var activeelement = document.getElementsByClassName("activebutton");
    activeelement[0].classList.remove("activebutton");
    button.classList.add("activebutton");
}
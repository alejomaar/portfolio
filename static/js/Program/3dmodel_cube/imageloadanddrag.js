// Box Image Scope
const BoxInputImgOff = $("BoxInputImg").cloneNode(true);
const BoxOutputImgOff = $("BoxOutputImg").cloneNode(true);

//Get Box container of a image
var BoxInputImg = document.getElementById("BoxInputImg");

//javascript de mouse over con los elementos
BoxInputImg.addEventListener('dragover',(e)=>{
    e.preventDefault();
    BoxInputImg.style.opacity ="0.5";
})

BoxInputImg.addEventListener('dragleave',(e)=>{
    e.preventDefault();
    BoxInputImg.style.opacity ="1";
})

// Añadir elemento al soltarlo en la zona de drop
BoxInputImg.addEventListener('drop',(e)=>{
    e.preventDefault();
    BoxInputImg.style.opacity ="1";
    selectImage(e.dataTransfer.files[0])
})

//This function is called after to click (Select file) (NO MOUSE DROP)
function FileSelected (file)
{
    selectImage(file.files[0]);
} 

function selectImage(url)
{
    //Get Box container of images 
    var BoxInputOff =$("BoxInputImg");
    var BoxOutputOff =$("BoxOutputImg");

    //Remove all children inside of box 
    BoxInputOff.textContent = '';
    BoxOutputOff.textContent = '';

    //Set new style when image is active 
    BoxInputOff.classList.add("activeimage");
    BoxOutputOff.classList.add("activeimage");

    //get url image when is selected by the user
    var UrlImage = window.URL.createObjectURL(url);

    //Set image preview into BoxInput
    var imgnode = document.createElement("img");
    imgnode.src = UrlImage;
    BoxInputOff.appendChild(imgnode);

    startSketch(UrlImage);
}


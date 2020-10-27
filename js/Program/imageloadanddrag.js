// Archivo que genera las interacciones de drag over y de carga de imagen 

//Muestra la imagen cargada.

function selectimage (img)
{
    boximageactive();
    var imgOutput = document.getElementById("OutputImage"); //añadir imagen en la pantalla
    imgOutput.src = window.URL.createObjectURL(img.files[0]);
    
}  

function boximageactive()
{
    //Obtener elementos
    var BoxOutputImg = document.getElementById("BoxOutputImg");
    var TextOutputImg = document.getElementById("TextOutputImg");

    // Remover detalles del css cuando no se ha elegido
    BoxOutputImg.classList.add("activeimage");
    //Quitar el texto al añadir la imagen
    TextOutputImg.classList.add("offtext")

}

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

// Añadir elemento al soltarlo en la zona de drop
BoxInputImg.addEventListener('drop',(e)=>{
    boximageactive();
    BoxInputImg.style.opacity ="1";
    e.preventDefault();   
    document.getElementById("OutputImage").src= window.URL.createObjectURL(e.dataTransfer.files[0]);
})


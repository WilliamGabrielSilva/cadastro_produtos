const imageInput = document.getElementById("imageInput")
const simbolo = document.getElementById("simbolo")

imageInput.addEventListener('change', function(){
    const file = this.files[0]

    if(file){
        const reader = new FileReader()
        
        reader.onload = function(){
            const img = document.createElement("img")
            img.src = reader.result

            simbolo.innerHTML = ""
            simbolo.appendChild(img)
        }
        reader.readAsDataURL(file)
    }
})
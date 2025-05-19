const imageInput = document.getElementById("imageInput")
const uploadBox = document.getElementById("uploadBox")

imageInput.addEventListener('change', function(){
    const file = this.files[0]

    if(file){
        const reader = new FileReader()
        
        reader.onload = function(){
            const img = document.createElement("img")
            img.src = reader.result

            uploadBox.innerHTML = ""
            uploadBox.appendChild(img)
        }
        reader.readAsDataURL(file)
    }
})
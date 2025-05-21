import { supabase } from "./supabaseClient";

//carrega a lista de produtos do supabase
async function carregarListaProdutos(){
    const{data, error} = await supabase.from('cadastro_produtos').select('*')
    if(error){
        console.error('Erro ao carregar produtos:', error)
        return
    }
}

const input = document.getElementById('nomeProduto')

//Adiciona novo item a lista de produtos 
window.adicionarItem = async function (){
    const user = await getUser()
    console.log('nome:', input.value)

    const {data, error} = await supabase.from('cadastro_produtos').insert({
        nome: input.value
    })
}

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
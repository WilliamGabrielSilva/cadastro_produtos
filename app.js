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
window.adicionarItem() = async function (){
    const user = await getUser()
    console.log('nome:', input.value)

    const {data, error} = await supabase.from('cadastro_produtos').insert({
        nome: input.value
    })
}
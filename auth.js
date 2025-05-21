import { supabase } from "./supabaseClient";

window.login = async function (){
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const{data, error} = await supabase.auth.signInWithPassword({email, password: senha})
    if(error){
        alert('Erro no login: ' + error.message)
    } else {
        window.location.href = 'cadastroProduto.html'
    }
}
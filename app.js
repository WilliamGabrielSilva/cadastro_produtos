import { supabase } from './supabaseClient.js'

// Recupera o usuário logado. Redireciona para login se não estiver autenticado.
async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) window.location.href = 'login.html'
  return user
}

//Pega o id do usuario
const {
  data: {user},error
} = await supabase.auth.getUser()

const usuarioId = user.id

// Elementos do DOM
const lista = document.getElementById('lista')
const input = document.getElementById('nomeProduto')
const preco = document.getElementById('preco')

// Carrega a lista de compras do Supabase
async function carregarLista() {
  const { data, error } = await supabase.from('cadastro_produtos').select('*')
  if (error) {
    console.error('Erro ao carregar lista:', error)
    return
  }

  // Limpa a lista e renderiza os itens
  lista.innerHTML = ''
  data.forEach((item) => {
    const li = document.createElement('li')
    li.innerHTML = `${item.item} <button onclick="removerItem('${item.id}')" style="border: none; background-color: #fff; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>`
    lista.appendChild(li)
  })
  data.forEach((preco) => {
    const li = document.createElement('li')
    li.innerHTML = `${preco.preco} <button onclick="removerItem('${preco.id}')" style="border: none; background-color: #fff; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>`
    lista.appendChild(li)
  })
}

// Adiciona novo item à lista de compras
window.adicionarItem = async function () {
  const user = await getUser()
  console.log('Usuário:', user)
  console.log('nome:', input.value)
  console.log('preço:', preco.value)

  const { error } = await supabase.from('cadastro_produtos').insert({
    nome: input.value,
    preco: preco.value
  })

  if (error) return alert('Erro ao adicionar: ' + error.message)

  input.value = ''
  carregarLista()
}

// Remove item da lista pelo ID
window.removerItem = async function (id) {
  const { error } = await supabase.from('cadastro_produtos').delete().eq('id', id)
  if (error) return alert('Erro ao remover: ' + error.message)
  carregarLista()
}

// Realiza logout do usuário
window.logout = async function () {
  await supabase.auth.signOut()
  window.location.href = 'login.html'
}

// Inicializa: verifica se o usuário está logado e carrega a lista
getUser().then(carregarLista)

//adiciona um item quando a tecla enter é pressionada
document.addEventListener('keydown', function(){
  if(event.key === 'Enter'){
      adicionarItem()
  }
})

//Função para enviar imagem para o bucket

const imagem = document.getElementById('imageInput')
const file = imagem.src

async function adicionarImagem(file) {
  const {data, error} = await supabase.storage
    .from('foto-produtos')
    .upload(`fotos/${file.name}`, file, {
      cacheControl: '3600',
      upsert: false
    })

    if(error){
      console.error('Erro ao fazer upload:', error.message)
      return null
    } else {
      console.log('Upload feito com sucesso:', data)
      return data
    }
}

//função para gerar a URL da imagem 

const nomeUnico = `${Date.now()}_${file.name}`
await 
supabase.storage.from('foto-produtos').upload(`fotos/${nomeUnico}`, file)

const {publicURL} = supabase.storage
  .from('foto-produtos')
  .getPublicUrl(`fotos/${nomeUnico}`)

const filePath = `fotos/${nomeUnico}`

const {data, error} = supabase.storage
  .from('foto-produtos')
  .getPublicUrl(filePath)

//Salvar URL na tabela

async function salvarUrlNaTabela(id, urlPublica){
  const{data, error} = await supabase
  .from('cadastro-produtos')
  .update({imagem_url: urlPublica})

  .eq('id', id)

  if(error){
    console.error('Erro ao salvar URL na tabela:', error.message)
  } else {
    console.log('URL salva com sucesso na tabela:', data)
  }
}


const addImg = document.getElementById('cadastrar')
addImg.addEventListener('click', async () => {
  const fileInput = document.getElementById('imageInput')

  const file = fileInput.files[0]
  const resultadoUpload = await adicionarImagem(file)
})
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
const categoria = document.getElementById('categoria')
const descricao = document.getElementById('descricao')

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
    const conteudo = `
      <div class="produto-item">
        ${item.imagem_url ? `<img src="${item.imagem_url}" alt="${item.nome}" style="width: 100px; height: 100px; object-fit: cover;">` : ''}
        <div class="produto-info">
          <p><strong>Nome:</strong> ${item.nome}</p>
          <p><strong>Preço:</strong> R$ ${item.preco}</p>
          <p><strong>Categoria:</strong> ${item.categoria}</p>
          <p><strong>Descrição:</strong> ${item.descricao}</p>
        </div>
        <button onclick="removerItem('${item.id}')" style="border: none; background-color: #fff; cursor:pointer;">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `
    li.innerHTML = conteudo
    lista.appendChild(li)
  })
}

// Adiciona novo item à lista de compras
window.adicionarItem = async function () {
  const user = await getUser()
  const fileInput = document.getElementById('imageInput')
  const file = fileInput.files[0]
  
  let imagemUrl = null
  if (file) {
    const resultadoUpload = await adicionarImagem(file)
    if (resultadoUpload) {
      imagemUrl = resultadoUpload.publicUrl
    }
  }

  const { error } = await supabase.from('cadastro_produtos').insert({
    nome: input.value,
    preco: preco.value,
    categoria: categoria.value,
    descricao: descricao.value,
    imagem_url: imagemUrl
  })

  if (error) return alert('Erro ao adicionar: ' + error.message)

  input.value = ''
  preco.value = ''
  categoria.value = ''
  descricao.value = ''
  fileInput.value = ''
  uploadBox.innerHTML = '<span id="simbolo">+</span>'
  
  carregarLista()
}
// Adiciona novo item à lista de compras
window.adicionarItem = async function () {
  const user = await getUser()
  const fileInput = document.getElementById('imageInput')
  const file = fileInput.files[0]
  
  let imagemUrl = null
  if (file) {
    const resultadoUpload = await adicionarImagem(file)
    if (resultadoUpload) {
      imagemUrl = resultadoUpload.publicUrl
    }
  }

  const { error } = await supabase.from('cadastro_produtos').insert({
    nome: input.value,
    preco: preco.value,
    categoria: categoria.value,
    descricao: descricao.value,
    imagem_url: imagemUrl
  })

  if (error) return alert('Erro ao adicionar: ' + error.message)

  input.value = ''
  preco.value = ''
  categoria.value = ''
  descricao.value = ''
  fileInput.value = ''
  uploadBox.innerHTML = '<span id="simbolo">+</span>'
  
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
  try {
    // Upload do arquivo
    const { data, error } = await supabase.storage
      .from('foto-produtos')
      .upload(`fotos/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Erro ao fazer upload:', error.message)
      return null
    }

    // Gera a URL pública da imagem
    const { data: { publicUrl } } = supabase.storage
      .from('foto-produtos')
      .getPublicUrl(`fotos/${file.name}`)

    console.log('Upload feito com sucesso:', data)
    console.log('URL pública:', publicUrl)
    return { data, publicUrl }
  } catch (error) {
    console.error('Erro ao processar imagem:', error)
    return null
  }
}

/*
const addImg = document.getElementById('cadastrar')
addImg.addEventListener('click', async () => {
  const fileInput = document.getElementById('imageInput')

  const file = fileInput.files[0]
  const resultadoUpload = await adicionarImagem(file)
})
*/
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
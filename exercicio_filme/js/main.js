import ui from "./ui.js"
import api from "./api.js"

function removerEspacos(string) {
  return string.replaceAll(/\s+/g, '')
}

const regexNome = /^[a-zA-Z0-9\s ]*$/;
const regexGenero = /^[a-zA-Z\s ]*$/

function validarNome(nome){
  return regexNome.test(nome)
}

function validarGenero(genero) {
  return regexGenero.test(genero)
}

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarFilmes()

  const formularioFilme = document.getElementById("filme-form")
  const botaoCancelar = document.getElementById("botao-cancelar")
  const inputBusca = document.getElementById("campo-busca")

  formularioFilme.addEventListener("submit", manipularSubmissaoFormulario)
  botaoCancelar.addEventListener("click", manipularCancelamento)
  inputBusca.addEventListener("input", manipularBusca)
})

async function manipularSubmissaoFormulario(event) {
  event.preventDefault()
  const id = document.getElementById("filme-id").value
  const nome = document.getElementById("filme-nome").value
  const genero = document.getElementById("filme-genero").value
  const data = document.getElementById("filme-data").value

  const nomeSemEspacos = removerEspacos(nome)
  const generoSemEpacos = removerEspacos(genero)

  if(!validarNome(nomeSemEspacos)){
    alert("Nome: É permitida a inclusão de letras e entre 3 e 15 caracteres sem espaços")
    return
  }

  if(!validarGenero(generoSemEpacos)) {
    alert("Genero: É permitida a inclusão apenas de letras e espaços com no mínimo 10 caracteres")
    return
  }

  if(!validarData(data)) {
    alert("Não é permitido o cadastro de datas futuras. Selecione outra data.")
    return
  }


  try {
    if (id) {
      await api.editarFilme({ id, nome, genero, data})
    } else {
      await api.salvarFilme({ nome, genero, data})
    }
    ui.renderizarFilmes()
  } catch {
    alert("Erro ao salvar filme")
  }
}

function manipularCancelamento() {
  ui.limparFormulario()
}

async function manipularBusca() {
  const termoBusca = document.getElementById("campo-busca").value
  try {
    const filmesFiltrados = await api.buscarFilmesPorTermo(termoBusca)
    ui.renderizarFilmes(filmesFiltrados)
  } catch (error) {
    alert("Erro ao realizar busca")
  }
}

function validarData(data) {
  const dataAtual = new Date()
  const dataInserida = new Date(data)
  return dataInserida<= dataAtual

}
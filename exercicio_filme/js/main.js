import ui from "./ui.js"
import api from "./api.js"

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

  if(!validarData(data)) {
    alert("Não é permitido o cadastro de datas futuras. Selecione outra data.")
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
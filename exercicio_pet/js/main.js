import ui from "./ui.js"
import api from "./api.js"

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPets()

    const formularioPet = document.getElementById("pet-form")
    const botaoCancelar = document.getElementById("botao-cancelar")

    formularioPet.addEventListener("submit", manipularSubmissaoFormulario)
    botaoCancelar.addEventListener("click", manipularCancelamento)
})

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = document.getElementById("pet-id").value
    const nome = document.getElementById("pet-nome").value
    const especie = document.getElementById("pet-especie").value
    const raca = document.getElementById("pet-raca").value

    try {
        if(id) {
            await api.editarPet({ id, nome, especie, raca})
        } else {
            await api.salvarPet({nome, especie, raca})
        }
        ui.renderizarPets()
    } catch {
        alert("Erro ao salvar pet")
    }   
}

async function manipularCancelamento() {
    ui.limparFormulario();
}
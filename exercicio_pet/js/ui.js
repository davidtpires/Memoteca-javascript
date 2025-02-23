import api from "./api.js"

const ui = {
    async preencherFormulario(petId) {
        const pet = await api.buscarPetPorId(petId)
        document.getElementById("pet-id").value = pet.id
        document.getElementById("pet-nome").value = pet.nome
        document.getElementById("pet-especie").value = pet.especie
        document.getElementById("pet-raca").value = pet.raca

    },

    async renderizarPets() {
        const listaPets = document.getElementById("lista-pensamentos")
        const mensagemVazia = document.getElementById("mensagem-vazia");
        listaPets.innerHTML = ""

        try {
            const pets = await api.buscarPets()
            pets.forEach(ui.adicionarPetNaLista);
            if(pets.length === 0) {
                mensagemVazia.style.display = "block";
            } else {
                pets.forEach(ui.adicionarPetNaLista);
            }
        } catch {
            alert('Erro ao renderizar pets')
        }
    },

    adicionarPetNaLista(pet) {
        const listaPets = document.getElementById("lista-pensamentos")
        const li = document.createElement("li")
        li.setAttribute("data-id", pet.id)
        li.classList.add("li-pensamento")

        const iconePet = document.createElement("img")
        iconePet.src = "assets/imagens/pet.png"
        iconePet.alt = "Pet"
        iconePet.classList.add("icone-aspas")

        const petNome = document.createElement("div")
        petNome.textContent = pet.nome
        petNome.classList.add("pensamento-conteudo")

        const petRaca = document.createElement("div")
        petRaca.textContent = "raça: " + pet.especie + " | especie: " + pet.raca
        petNome.classList.add("pensamento-autoria")

        const botaoEditar = document.createElement("button")
        botaoEditar.src = "assets/imagens/icone-editar.png"
        botaoEditar.onclick = () => ui.preencherFormulario(pet.id)

        const iconeEditar = document.createElement("img")
        iconeEditar.src = "assets/imagens/icone-editar.png"
        iconeEditar.alt = "Editar"
        botaoEditar.appendChild(iconeEditar)

        const botaoExcluir = document.createElement("button")
        botaoExcluir.classList.add("botao-excluir")
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirPet(pet.id)
                ui.renderizarPets()
            } catch {
                alert("Erro ao excluir pet")
            }
        }

        const iconeExcluir = document.createElement("img")
        iconeExcluir.src = "assets/imagens/icone-excluir.png"
        iconeExcluir.alt = "Excluir"
        botaoExcluir.appendChild(iconeExcluir)

        const icones = document.createElement("div")
        icones.classList.add("icones")
        icones.appendChild(botaoEditar)
        icones.appendChild(botaoExcluir)

        li.appendChild(iconePet)
        li.appendChild(petNome)
        li.appendChild(petRaca)
        li.appendChild(icones)
        listaPets.appendChild(li)
    },

    limparFormulario() {
        document.getElementById("pet-form").reset();
    }
}


export default ui
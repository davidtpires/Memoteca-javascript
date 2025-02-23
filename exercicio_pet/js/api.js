const URL_BASE = "http://localhost:3001"

const api = {
    async buscarPets(){
        try {
            const response = await fetch(`${URL_BASE}/pets`)
            return await response.json()
        } catch {
            alert('Erro ao buscar pets')
            throw error
        }
    },

    async salvarPet(pet){
        try {
            const response = await fetch(`${URL_BASE}/pets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pet)
            })
            return await response.json()
        } catch {
            alert("Erro ao salvar pets")
            throw error
        }
    },

    async buscarPetPorId(id){
        try {
            const response = await fetch(`${URL_BASE}/pets/${id}`)
            return await response.json()
        } catch {
            alert('Erro ao buscar pet')
            throw error
        }
    },

    async editarPet(pet){
        try {
            const response = await fetch(`${URL_BASE}/pets/${pet.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pet)
            })
            return await response.json()
        } catch {
            alert("Erro ao editar pet")
            throw error
        }
    }, 

    async excluirPet(id) {
        try {
            const response = await fetch(`${URL_BASE}/pets/${id}`, {
                method: "DELETE"
            })
        } catch (error) {
            alert('Erro ao excluir um pet')
            throw error
        }
    }


}

export default api;
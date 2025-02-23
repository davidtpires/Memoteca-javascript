const url = "http://localhost:3001"

const converterStringParaData = (dataString) => {
  const [ano, mes, dia] = dataString.split("-")
  return new Date(Date.UTC(ano, mes - 1, dia))
}

const api = {
  async buscarFilmes() {
    try {
      const response = await axios.get(`${url}/filmes`)
      const filmes = await response.data

      return filmes.map(filme => {
        return {
          ...filme,
          data: new Date(filme.data)
        }
      })
    }
    catch {
      alert('Erro ao buscar filmes')
      throw error
    }
  },

  async salvarFilme(filme) {
    try {
      const data = converterStringParaData(filme.data)
      const response = await axios.post(`${url}/filmes`, {
        ...filme,
        data: data.toISOString()
      })
      return await response.data
    }
    catch {
      alert('Erro ao salvar filme')
      throw error
    }
  },

  async buscarFilmePorId(id) {
    try {
      const response = await axios.get(`${url}/filmes/${id}`)
      const filme = await response.data

      return {
        ...filme,
        data: new Date(filme.data)
      }
    }
    catch {
      alert('Erro ao buscar filme')
      throw error
    }
  },

  async editarFilme(filme) {
    try {
      const response = await axios.put(`${url}/filmes/${filme.id}`, filme)
      return await response.data
    }
    catch {
      alert('Erro ao editar filme')
      throw error
    }
  },

  async excluirFilme(id) {
    try {
      const response = await axios.delete(`${url}/filmes/${id}`)
    }
    catch {
      alert('Erro ao excluir um filme')
      throw error
    }
  },

  async buscarFilmesPorTermo(termo) {
    try {
      const filmes = await this.buscarFilmes()
      const termoEmMinusculas = termo.toLowerCase()

      const filmesFiltrados = filmes.filter(filme => {
        return (filme.nome.toLowerCase().includes(termoEmMinusculas)) || 
        filme.genero.toLowerCase().includes(termoEmMinusculas)
      })
      
      return filmesFiltrados
    } catch (error) {
      alert("Error ao filtrar filmes")
      throw error
    }
  },

  async atualizaFavorito(id, favorito) {
    try {
      const response = await axios.patch(`${url}/filmes/${id}`, {favorito})
      return response.data
    } catch (error) {
      alert("Erro ao atualizar favorito")
      throw error
    }
  }
}

export default api
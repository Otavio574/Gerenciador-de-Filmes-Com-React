import axios from 'axios'

const API_URL = '/movies'

// Função para obter todos os filmes
const getMovies = async (page = 1, moviesPerPage = 5) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        _page: page,
        _limit: moviesPerPage,
      },
    })
    return response.data // `axios` já retorna os dados na propriedade `data`
  } catch (error) {
    throw new Error('Erro ao buscar filmes')
  }
}
// Função para obter um filme pelo ID
const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Erro ao buscar filme')
  }
}

// Função para adicionar um novo filme
const addMovie = async (movie) => {
  try {
    const response = await axios.post(API_URL, movie)
    return response.data
  } catch (error) {
    throw new Error('Erro ao adicionar filme')
  }
}

// Função para atualizar um filme existente
const updateMovie = async (id, movie) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, movie)
    return response.data
  } catch (error) {
    throw new Error('Erro ao atualizar filme')
  }
}

// Função para deletar um filme
const deleteMovie = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
  } catch (error) {
    throw new Error('Erro ao excluir filme')
  }
}

export default {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
}

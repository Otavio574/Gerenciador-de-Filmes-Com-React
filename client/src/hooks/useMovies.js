import { useState, useEffect } from 'react'
import service from '../services/service'

const useMovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchMovies = async () => {
    setLoading(true)
    try {
      const moviesList = await service.getMovies()
      console.log('Filmes carregados:', moviesList)
      setMovies(moviesList)
    } catch (error) {
      console.error('Erro ao buscar filmes: ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const addMovie = async (newMovie) => {
    try {
      await service.addMovie(newMovie)
      console.log(`Filme adicionado: `, newMovie)
      fetchMovies()
    } catch (error) {
      console.error('Erro ao adicionar filme:', error)
    }
  }

  const deleteMovie = async (id) => {
    try {
      await service.deleteMovie(id)
      fetchMovies() // Atualiza a lista após deletar
    } catch (error) {
      console.error('Erro ao excluir filme:', error)
    }
  }

  const updateMovie = async (id, updatedMovie) => {
    try {
      await service.updateMovie(id, updatedMovie)
      fetchMovies() // Atualiza a lista após atualizar
    } catch (error) {
      console.error('Erro ao atualizar filme:', error)
    }
  }

  return { movies, addMovie, deleteMovie, updateMovie, loading }
}

export default useMovies

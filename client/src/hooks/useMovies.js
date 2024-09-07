import { useState, useEffect, useCallback } from 'react'
import service from '../services/service'

const useMovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchMovies = useCallback(async (page = 1, moviesPerPage = 5) => {
    setLoading(true)
    try {
      // Verifica se a página já foi carregada para evitar chamadas duplicadas
      const moviesList = await service.getMovies(page, moviesPerPage)
      
      // Se a lista de filmes retornada for menor que o tamanho da página, significa que não há mais filmes
      if (moviesList.length < moviesPerPage) {
        setHasMore(false)
      }
      
      // Atualiza o estado dos filmes
      setMovies((prevMovies) => {
        // Filtra filmes duplicados antes de atualizar o estado
        const newMovies = [...prevMovies, ...moviesList]
        const uniqueMovies = Array.from(new Set(newMovies.map(movie => movie.id)))
          .map(id => {
            return newMovies.find(movie => movie.id === id)
          })
        return uniqueMovies
      })
      
      return moviesList.length > 0 // Retorna true se houver mais filmes
    } catch (error) {
      console.error('Erro ao buscar filmes: ', error)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMovies(page)
  }, [page, fetchMovies])
  
  const addMovie = async (newMovie) => {
    try {
      const addedMovie = await service.addMovie(newMovie)
      setMovies((prevMovies) => [...prevMovies, addedMovie])
    } catch (error) {
      console.error('Erro ao adicionar filme:', error)
    }
  }
  

  const deleteMovie = async (id) => {
    try {
      await service.deleteMovie(id)
      setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== id))
    } catch (error) {
      console.error('Erro ao excluir filme:', error)
    }
  }

  const updateMovie = async (id, updatedMovie) => {
    try {
      await service.updateMovie(id, updatedMovie)
      setMovies((prevMovies) =>
        prevMovies.map((movie) => (movie.id === id ? updatedMovie : movie))
      )
    } catch (error) {
      console.error('Erro ao atualizar filme:', error)
    }
  }

  return { movies, addMovie, deleteMovie, updateMovie, fetchMovies, loading }
}

export default useMovies

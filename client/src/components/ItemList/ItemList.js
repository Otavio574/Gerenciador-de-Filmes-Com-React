import React, { useEffect, useState } from 'react'
import service from '../../services/service'
import './ItemList.css'

const ItemList = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesList = await service.getMovies()
        console.log('Filmes recebidos:', moviesList)
        setMovies(moviesList)
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      }
    }

    fetchMovies()

    const intervalId = setInterval(() => {
      fetchMovies()
    }, 10000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="item-list">
      {movies.map((movie) => (
        <div key={movie.id} className="item-list-item">
          <h2 className="item-list-title">{movie.nome}</h2>
          <p className="item-list-year">{movie.ano}</p>
        </div>
      ))}
    </div>
  )
}

export default ItemList

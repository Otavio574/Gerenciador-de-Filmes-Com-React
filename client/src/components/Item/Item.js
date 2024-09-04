import React, { useEffect, useState } from 'react'
import service from '../../services/service'
import './ItemList.css'

const ItemList = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesList = await service.getMovies() // Verifique o método correto para obter os filmes
        setMovies(moviesList)
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div className="item-list">
      {movies.map(movie => (
        <div key={movie.id} className="item-list-item">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="item-list-image"
          />
          <div className="item-list-content">
            <h2 className="item-list-title">{movie.title}</h2>
            <p className="item-list-description">{movie.description}</p>
            <p className="item-list-year">{movie.year}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ItemList

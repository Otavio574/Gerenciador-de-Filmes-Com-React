import React, { useState, useEffect } from 'react'
import './Form.css'
import service from '../../services/service'

const Form = () => {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    try {
      const movieList = await service.getMovies()
      //console.log(movieList)
      setMovies(movieList)
    } catch (error) {
      console.error('Erro ao buscar filmes: ', error)
    }
  }
  // Executa ao carregar o componente
  useEffect(() => {
    fetchMovies()

    const intervalId = setInterval(() => {
      fetchMovies()
    }, 10000)

    return () => clearInterval(intervalId)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title === `` || year === ``) {
      alert(`Preencha todos os campos`)
      return
    }

    const newMovie = {
      title,
      year: parseInt(year),
    }

    try {
      await service.addMovie(newMovie)
      alert(`Filme adicionado com sucesso!`)
      setTitle('')
      setYear('')
      fetchMovies()
    } catch (error) {
      console.error(`Erro a adicionar o filme: `, error)
    }
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   if (name === 'title') setTitle(value)
  //   if (name === 'year') setYear(value)
  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título do Filme:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título do filme"
          />
        </div>
        <div>
          <label>Ano de Lançamento:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Digite o ano de lançamento"
          />
        </div>
        <button onClick={handleSubmit}>Adicionar Filme</button>
      </form>

      <div className="movie-list">
        <h2>Filmes adicionados:</h2>
        <ul>
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <li key={index}>
                {movie.title} - {movie.year}
              </li>
            ))
          ) : (
            <li>Nenhum filme encontrado.</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Form

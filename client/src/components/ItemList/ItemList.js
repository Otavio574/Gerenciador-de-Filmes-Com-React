import React, { useState, useEffect, useCallback } from 'react'
import useMovies from '../../hooks/useMovies'
import './ItemList.css'
import useInfinityScroll from '../../hooks/useInfinityScroll'

const ItemList = () => {
  const { movies, addMovie, deleteMovie, updateMovie, fetchMovies, loading } = useMovies()
  const [editingMovie, setEditingMovie] = useState(null)
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newYear, setNewYear] = useState('')

  // Função para carregar mais filmes
  const fetchMoreMovies = useCallback(async (page) => {
    const moreDataAvailable = await fetchMovies(page)
    return moreDataAvailable
  }, [fetchMovies])

  // Configura o infinite scroll
  const { hasMore } = useInfinityScroll(fetchMoreMovies)

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    if (newTitle === '' || newYear === '') {
      alert('Preencha todos os campos para adicionar um filme')
      return
    }

    const newMovie = {
      title: newTitle,
      year: parseInt(newYear),
    }

    try {
      await addMovie(newMovie)
      setNewTitle('')
      setNewYear('')
    } catch (error) {
      console.error('Erro ao adicionar o filme: ', error)
    }
  }

  const handleEdit = (movie) => {
    setEditingMovie(movie)
    setTitle(movie.title)
    setYear(movie.year)
  }

  const handleChange = async (e) => {
    e.preventDefault()
    if (!editingMovie) return

    const updatedMovie = { ...editingMovie, title, year }
    await updateMovie(editingMovie.id, updatedMovie)
    setEditingMovie(null)
    setTitle('')
    setYear('')
  }

  const handleDelete = async (id) => {
    await deleteMovie(id)
  }

  return (
    <div className="item-list">
      {/* Formulário para adicionar um novo filme */}
      <form onSubmit={handleAddSubmit} className="add-form">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Título"
          required
        />
        <input
          type="number"
          value={newYear}
          onChange={(e) => setNewYear(e.target.value)}
          placeholder="Ano"
          required
        />
        <button type="submit">Adicionar Filme</button>
      </form>

      {/* Formulário para editar um filme existente */}
      {editingMovie && (
        <form onSubmit={handleChange} className="edit-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            required
          />
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Ano"
            required
          />
          <button type="submit">Salvar</button>
        </form>
      )}

      {/* Lista de filmes */}
      {movies.map((movie) => (
        <div key={movie.id} className="item-list-item">
          <div className="item-list-content">
            <h2 className="item-list-title">{movie.title}</h2>
            <p className="item-list-year">{movie.year}</p>
            <button onClick={() => handleEdit(movie)}>Editar</button>
            <button onClick={() => handleDelete(movie.id)}>Excluir</button>
          </div>
        </div>
      ))}

      {loading && <p>Carregando...</p>}
      {!hasMore && !loading && <p>Sem mais filmes para carregar</p>}
    </div>
  )
}

export default ItemList
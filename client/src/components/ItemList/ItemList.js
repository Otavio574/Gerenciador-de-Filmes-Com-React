import React, { useState, useEffect, useCallback } from 'react'
import useMovies from '../../hooks/useMovies'
import './ItemList.css'
import useInfinityScroll from '../../hooks/useInfinityScroll'

const ItemList = () => {
  const { movies, addMovie, deleteMovie, updateMovie, fetchMovies, loading } =
    useMovies()
  const [editingMovieId, setEditingMovieId] = useState(null) // Define o ID do filme sendo editado
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newYear, setNewYear] = useState('')
  const [successMessage, setSuccessMessage] = useState('') // Novo estado para mensagem de sucesso

  // Função para carregar mais filmes
  const fetchMoreMovies = useCallback(
    async (page) => {
      const moreDataAvailable = await fetchMovies(page)
      return moreDataAvailable
    },
    [fetchMovies]
  )

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
      alert('Filme adicionado com sucesso') // Mensagem de sucesso
    } catch (error) {
      console.error('Erro ao adicionar o filme: ', error)
    }
  }

  const handleEdit = (movie) => {
    setEditingMovieId(movie.id) // Armazena o ID do filme que está sendo editado
    setTitle(movie.title)
    setYear(movie.year)
  }

  const handleChange = async (e) => {
    e.preventDefault()
    if (!editingMovieId) return

    const updatedMovie = { id: editingMovieId, title, year }
    await updateMovie(editingMovieId, updatedMovie)
    setEditingMovieId(null)
    setTitle('')
    setYear('')
    alert('Filme editado com sucesso') // Mensagem de sucesso
    //setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleDelete = async (id) => {
    await deleteMovie(id)
    alert('Filme excluído com sucesso') // Mensagem de sucesso
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const cancelEdit = () => {
    setEditingMovieId(null)
    setTitle('')
    setYear('')
  }

  return (
    <div className="item-list">
      {/* Mensagem de sucesso */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

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

      {/* Lista de filmes */}
      {movies.map((movie) => (
        <div key={movie.id} className="item-list-item">
          <div className="item-list-content">
            {editingMovieId === movie.id ? (
              // Exibe o formulário de edição diretamente no item da lista
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
                <button type="button" onClick={cancelEdit}>
                  Cancelar
                </button>
              </form>
            ) : (
              // Exibe os detalhes do filme quando não está em modo de edição
              <>
                <h2 className="item-list-title">{movie.title}</h2>
                <p className="item-list-year">{movie.year}</p>
                <div className="item-list-actions">
                  <button onClick={() => handleEdit(movie)}>Editar</button>
                  <button onClick={() => handleDelete(movie.id)}>
                    Excluir
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {loading && <p>Carregando...</p>}
      {!hasMore && !loading && <p>Sem mais filmes para carregar</p>}
    </div>
  )
}

export default ItemList

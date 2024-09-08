// // src/hooks/useManageMovies.js
// import { useState, useCallback } from 'react'
// import useMovies from './useMovies'

// const useManageMovies = (fetchMoreMovies) => {
//   const { addMovie, deleteMovie, updateMovie, loading } = useMovies()
//   const [editingMovieId, setEditingMovieId] = useState(null)
//   const [title, setTitle] = useState('')
//   const [year, setYear] = useState('')
//   const [newTitle, setNewTitle] = useState('')
//   const [newYear, setNewYear] = useState('')
//   const [successMessage, setSuccessMessage] = useState('')

//   const handleAddSubmit = async (e) => {
//     e.preventDefault()
//     if (newTitle === '' || newYear === '') {
//       alert('Preencha todos os campos para adicionar um filme')
//       return
//     }

//     const newMovie = {
//       title: newTitle,
//       year: parseInt(newYear),
//     }

//     try {
//       await addMovie(newMovie)
//       setNewTitle('')
//       setNewYear('')
//       setSuccessMessage('Filme adicionado com sucesso')
//       setTimeout(() => setSuccessMessage(''), 3000)
//     } catch (error) {
//       console.error('Erro ao adicionar o filme: ', error)
//     }
//   }

//   const handleEdit = (movie) => {
//     setEditingMovieId(movie.id)
//     setTitle(movie.title)
//     setYear(movie.year)
//   }

//   const handleChange = async (e) => {
//     e.preventDefault()
//     if (!editingMovieId) return

//     const updatedMovie = { id: editingMovieId, title, year }
//     await updateMovie(editingMovieId, updatedMovie)
//     setEditingMovieId(null)
//     setTitle('')
//     setYear('')
//     setSuccessMessage('Filme editado com sucesso')
//     setTimeout(() => setSuccessMessage(''), 3000)
//   }

//   const handleDelete = async (id) => {
//     await deleteMovie(id)
//     setSuccessMessage('Filme excluído com sucesso')
//     setTimeout(() => setSuccessMessage(''), 3000)
//   }

//   const cancelEdit = () => {
//     setEditingMovieId(null)
//     setTitle('')
//     setYear('')
//   }

//   return {
//     editingMovieId,
//     title,
//     year,
//     newTitle,
//     newYear,
//     successMessage,
//     handleAddSubmit,
//     handleEdit,
//     handleChange,
//     handleDelete,
//     cancelEdit,
//     loading,
//     fetchMoreMovies
//   }
// }

// export default useManageMovies

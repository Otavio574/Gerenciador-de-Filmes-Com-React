const API_URL = '/movies';

const getMovies = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Erro ao buscar filmes');
  return response.json();
};

const getMovieById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar filme');
  return response.json();
};

const addMovie = async (movie) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  if (!response.ok) throw new Error('Erro ao adicionar filme');
  return response.json();
};

const updateMovie = async (id, movie) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  if (!response.ok) throw new Error('Erro ao atualizar filme');
  return response.json();
};

const deleteMovie = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao excluir filme');
};

export default {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};

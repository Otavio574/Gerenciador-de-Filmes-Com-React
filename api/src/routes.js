import express, { json } from 'express';
const app = express();
const PORT = 5000;

app.use(json());

let movies = [
  { id: 1, title: 'The Matrix', year: 1999 }
];

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.post('/movies', (req, res) => {
  const newMovie = req.body;
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.put('/movies/:id', (req, res) => {
  const { id } = req.params;
  const updatedMovie = req.body;
  movies = movies.map(movie => (movie.id === Number(id) ? updatedMovie : movie));
  res.json(updatedMovie);
});

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  movies = movies.filter(movie => movie.id !== Number(id));
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

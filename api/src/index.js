import express, { json } from 'express';
import cors from 'cors'; 
import routes from './routes'; 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json()); 
app.use(cors()); 

app.use('/movies', routes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

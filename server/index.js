import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import SearchMoviesRoutes from './routes/searchMovies.js';
import WatchlistRoutes from './routes/watchlist.js'
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/searchMovies', SearchMoviesRoutes);
app.use('/watchlist', WatchlistRoutes);
const CONNECTION_URL = "mongodb+srv://user1:user11234@cluster0.0jv46.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

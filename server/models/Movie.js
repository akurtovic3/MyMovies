import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    imdb_id: Number,
    title: String,
    img_src: String,
    vote_average: Number,
    watched: Boolean,
    added_to_watchlist: Boolean
})

var Movie = mongoose.models.movie || mongoose.model('movie', movieSchema);

export default Movie;
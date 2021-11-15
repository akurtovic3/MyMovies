import express from 'express';
import mongoose from 'mongoose';

import Movie from '../models/Movie.js';

const router = express.Router();


export const markMovieAsWatched = async (req, res) => {
    const { id } = req.params;
    const added_to_watchlist=true;
    const watched = true;
    const { imdb_id, title, poster_path, vote_average } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No movie with id: ${id}`);

    const updatedPost = {imdb_id, title, poster_path, vote_average,watched, added_to_watchlist, _id: id };

    await Movie.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const removeMovie = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No movie with id: ${id}`);

    await Movie.findByIdAndRemove(id);

    res.json({ message: "Movie removes successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Movie.findById(id);

    const updatedPost = await Movie.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}


export default router;
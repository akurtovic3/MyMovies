import express from 'express';
import mongoose from 'mongoose';
import request from "request"
import Movie from '../models/Movie.js';

const router = express.Router();

export const getMovies = async (req, res) => { 
    //const { id } = req.params;
      
          request("https://api.themoviedb.org/3/movie/popular?api_key=a301857115948862368f3d0885c2a99f&language=en-US&page=1", function (error, response, body) {
          if(error){
              res.status(404).json({ message: error.message });
          }   
          else{
              const data = JSON.parse(body);
              res.status(200).json(data);
          } 
      });   
  }


export const getMovie = async (req, res) => { 
  //const { id } = req.params;
    const id=req.params.id;
    
        request("https://api.themoviedb.org/3/movie/"+id+"?api_key=a301857115948862368f3d0885c2a99f&language=en-US", function (error, response, body) {
        if(error){
            res.status(404).json({ message: error.message });
        }   
        else{
            const data = JSON.parse(body);
            res.status(200).json(data);
        } 
    });   

}


export const addToWatchlist = async (req, res) => {
    const { imdb_id, title, image_src, vote_average} = req.body;
    const watched = false;
    const added_to_watchlist = true;
    const img_src="http://image.tmdb.org/t/p/w185"+image_src;
    const newMovie = new Movie({ imdb_id, title, img_src, vote_average, watched, added_to_watchlist })

    try {
        await newMovie.save();

        res.status(201).json(newMovie );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const searchMovies = async (req, res) => {
    const text = req.params.text;
    
    
    
        request("https://api.themoviedb.org/3/search/movie?api_key=a301857115948862368f3d0885c2a99f&query="+text, function (error, response, body) {
        if(error){
            res.status(404).json({ message: error.message });
        }   
        else{
            const data = JSON.parse(body);
            res.status(200).json(data);
        } 
    });   
    
}


export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Movie.findById(id);

    const updatedPost = await Movie.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}



export default router;
import express from 'express';

import * as routes from '../controllers/searchMovies.js';

const router = express.Router();

router.get('/getMovie/:id', routes.getMovie);
router.get('/search/:text', routes.searchMovies);
router.get('/popular', routes.getMovies);
router.post('/addToWatchList', routes.addToWatchlist)

export default router;
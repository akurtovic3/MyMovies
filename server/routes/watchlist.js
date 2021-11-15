import express from 'express';

import * as routes from '../controllers/watchlist.js';

const router = express.Router();


router.patch('/:id', routes.markMovieAsWatched);
router.delete('/:id', routes.removeMovie);

export default router;
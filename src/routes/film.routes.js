const { Router } = require('express');

const router = Router();

const express = require('express');

const app = express();

const cookieParser = require ('cookie-parser');

app.use(cookieParser("secretcode"))

const {
  createReview,
  deleteReview,
  getAMovie,
  createAccount,
  loginAccount,
  getMoviesPerPage,
  getMovies
} = require('../controllers/controllers');

router.get('/',getMovies)

router.post('/', getMoviesPerPage)

router.post('/search', getAMovie)

router.post('/review' , createReview)

/*router.put("/review/:id", updateReview)*/

router.delete('/:id', deleteReview)

router.post('/signin', createAccount);

router.post('/login', loginAccount);


module.exports = router;
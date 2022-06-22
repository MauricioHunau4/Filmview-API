const pool = require('../db')


const getMovies = async (req, res, next)=>{
    const movie = await pool.query('SELECT * FROM comments')
    res.json(movie.rows.length)
}

const getMoviesPerPage = async (req, res, next) => {
    const pages = [];
    const number = req.body.data.number;

    try {
        const result = await pool.query('SELECT * FROM comments ORDER BY id DESC')
        if (result.rows.length !== 0) {
            if (result.rows.length < 8)
                pages.push(1)
            else {
                for (let i = 1; i !== (Math.round(result.rows.length / 8) + 2); i++) {
                    pages.push(i)
                }
            }
            if (number === 1) {
                return res.json({
                    reviews: result.rows.slice(0, 8),
                    pagesLength: pages
                })
            }
            else {
                return res.json({
                    reviews: result.rows.slice(number - 1 * 8, number * 8),
                    pagesLength: pages
                })
            }
        }else{
            const response = "There are no reviews, be the first to share one"
            return res.json(response)
        }
    } catch (error) {
        next(error)
    }
}

const getAMovie = async (req, res, next) => {
        const pagesLength = []
        const research = req.body.search.movies;
    try {
        const search = await pool.query('SELECT * FROM comments WHERE movie = $1', [
            research
        ]);
        if (search.rows.length < 8)
            pagesLength.push(1)
        else {
            for (let i = 1; i !== (Math.round(search.rows.length / 8) + 2); i++) {
                pagesLength.push(i)
            }
        }
        if (search.rows.length !== 0) {
            res.json({
                 info: search.rows,
                pagesLength: pagesLength})
        } else {
            res.json("There is no review for this movie, be the first one to make it")
        }
    } catch (error) {
        next(error)
    }
}



const createReview = async (req, res, next) => {
    const { movie, person, rate, review } = req.body.data;
    try {
        const consulta = await pool.query(
            "INSERT INTO comments (movie, person, rate, review) VALUES ($1 ,$2, $3, $4) RETURNING *", [
            movie,
            person,
            rate,
            review,
        ]);
        res.json(consulta.rows[0]);
    } catch (error) {
        next(error)
    }
}


const deleteReview = async (req, res, next) => {
    const { id } = req.params;
    try {
         await pool.query('DELETE FROM comments WHERE id = $1 RETURNING *', [
            id])

        return res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}


const createAccount = async (req, res, next) => {
    const username = req.body.data.username;
    const passwords = req.body.data.password;

    try {
        const account = await pool.query("INSERT INTO users (username, passwords) VALUES ($1 ,$2) RETURNING *", [
            username,
            passwords,
        ])
        
        res.json("true")
    } catch (error) {
        next(error)
    }
}


const loginAccount = async (req, res, next) => {
    const username = req.body.data.username;
    const password = req.body.data.password;

    try {
        const check = await pool.query('SELECT * FROM users');
        for (const valor of check.rows) {
            const usuario = valor.username
            const contraseña = valor.passwords
            if (usuario === username && contraseña === password) {
                return res.json({boolean: "true",
                id: valor.id})
            }
        }
        return res.json("false")
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createReview,
    deleteReview,
    getAMovie,
    getMovies,
    getMoviesPerPage,
    createAccount,
    loginAccount,
}
const {body, validationResult} = require('express-validator')
const db = require("../db/queries")
const { title } = require('process')

const validateGame = [
    body("title").trim()
        .isString().withMessage("Title must be a string"),
    body("description").trim()
        .optional()
        .isString()
        .isLength({max: 200})
        .withMessage("Bio must be within 200 characters")
]

exports.genresListGet = async (req, res) => {
    const genres = await db.getAllGenres()
    console.log(genres)
    res.render("genres", {
        title: "Genres List",
        genres: genres,
    })
}

exports.gamesListGet = async (req, res) => {
    const { genre } = req.params;  // Extract genre from URL param

    try {
        const games = await db.getGenreSpecificGames(genre);
        res.render("games", {
            title: genre,
            games: games
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.genreCreateGet = (req, res) => {
    res.render("createGenre", {
        title: "Create Genre"
    })
}

exports.genreCreatePost = async (req, res) => {
    const {genre} = req.body
    await db.insertGenre(genre)
    res.redirect("/")
}

exports.gameCreateGet = async (req, res) => {
    const genres = await db.getAllGenres()
    res.render("createGame", {
        title: "Create Game",
        genres: genres
    })
}

exports.gameCreatePost = [
    validateGame,
    async (req, res) => {
        const errors = validationResult(req)
        const genres = await db.getAllGenres()
        if(!errors.isEmpty()){
            return res.status(400).render("createGame", {
                title: "Create Game",
                errors: errors.array(),
                genres: genres,
            })
        }
        const {title, release_date, description, genre} = req.body
        await db.insertGame(title, release_date, description, genre)
        res.redirect("/")
    }
]

exports.genreUpdateGet = async (req, res) => {
    const genre = await db.getGenre(req.params.genreId)
    console.log(genre)
    res.render("updateGenre", {
        title: "Update Genre",
        genre: genre,
    })
}

exports.genreUpdatePost = async (req, res) => {
    const {genre} = req.body
    const genreId = req.params.genreId
    await db.updateGenre(genre, genreId)
    res.redirect("/")
}

exports.gameUpdateGet = async (req, res) => {
    const game = await db.getGame(req.params.gameId)
    console.log(game)
    res.render("updateGame", {
        title: "Update Game",
        game: game
    })
}

exports.gameUpdatePost = async (req, res) => {
    const gameId = req.params.gameId;
    const {title, release_date, description} = req.body
    await db.updateGame(title, release_date, description, gameId)
    res.redirect("/");
}
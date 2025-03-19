const {Router} = require('express')
const gamesController = require('../controllers/gamesController')
const gamesRouter = Router();

gamesRouter.get('/', gamesController.genresListGet)
gamesRouter.get('/createGenre', gamesController.genreCreateGet)
gamesRouter.post('/createGenre', gamesController.genreCreatePost)
gamesRouter.get('/createGame', gamesController.gameCreateGet)
gamesRouter.post('/createGame', gamesController.gameCreatePost)
gamesRouter.get('/genres/:genreId/update', gamesController.genreUpdateGet)
gamesRouter.post('/genres/:genreId/update', gamesController.genreUpdatePost)
gamesRouter.get('/games/:gameId/update', gamesController.gameUpdateGet)
gamesRouter.post('/games/:gameId/update', gamesController.gameUpdatePost)
// gamesRouter.get('/:genreId/delete', gamesController.genreDeleteGet)
// gamesRouter.get('/:gameId/delete', gamesController.gameDeleteGet)
gamesRouter.get('/:genre', gamesController.gamesListGet)

module.exports = gamesRouter
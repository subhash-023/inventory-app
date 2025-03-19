const pool = require("./pool");

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

async function getGenre(genreId) {
  const { rows } = await pool.query("SELECT * FROM genres WHERE id = $1", [
    genreId,
  ]);
  return rows;
}

async function updateGenre(name, genreId) {
  await pool.query("UPDATE genres SET name = $1 WHERE id = $2;", [
    name,
    genreId,
  ]);
}
async function getGenreSpecificGames(genre) {
  const { rows } = await pool.query(
    "SELECT g.id, g.title, g.release_date, g.description FROM games g JOIN game_genres gg ON g.id = gg.game_id JOIN genres gen ON gg.genre_id = gen.id WHERE gen.name = $1;",
    [genre]
  );
  return rows;
}

async function insertGenre(genre) {
  await pool.query("INSERT INTO genres(name) VALUES ($1);", [genre]);
}

async function insertGame(title, release_date, description, genre) {
  await pool.query(
    "INSERT INTO games(title, release_date, description) VALUES($1, $2, $3)",
    [title, release_date, description]
  );
  const gameResult = await pool.query(
    "SELECT id FROM games WHERE title = $1;",
    [title]
  );
  const game_id = gameResult.rows[0]?.id;
  const genreResult = await pool.query(
    "SELECT id FROM genres WHERE name = $1;",
    [genre]
  );
  const genre_id = genreResult.rows[0]?.id;
  await pool.query(
    "INSERT INTO game_genres(game_id, genre_id) VALUES($1, $2)",
    [game_id, genre_id]
  );
}

const getGame = async (gameId) => {
    const { rows } = await pool.query("SELECT * FROM games WHERE id = $1;", [gameId])
    console.log(rows)
    return rows
}

async function updateGame (title, release_date, description, gameId) {
  await pool.query("UPDATE games SET title = $1, release_date = $2, description = $3 WHERE id = $4", [title, release_date, description, gameId])
}

module.exports = {
  getAllGenres,
  getGenreSpecificGames,
  insertGenre,
  insertGame,
  getGenre,
  updateGenre,
  getGame,
  updateGame,
};

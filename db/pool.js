const { Pool } = require('pg')

module.exports = new Pool({
    connectionString: "postgres://subhash:w3dzd4d2@localhost:5432/gameverse"
})
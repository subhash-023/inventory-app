const express = require('express');
const path = require('path');
const userRouter = require('./routes/gamesRouter');
const app = express()

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(userRouter)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () => console.log("Express application is listening on port 3000"));
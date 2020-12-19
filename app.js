const express = require('express');
const { graphqlHTTP } = require('express-graphql'); // we use it as middleware on a single route 
const schema = require('./schema/schema.js');

const cors = require('cors');

// connect to db - mlab 
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hagar:test123@cluster0.rqobx.mongodb.net/BooksDB?retryWrites=true&w=majority').then(() => console.log("Connection Successful"))
    .catch(err => console.log(err));
mongoose.connection.once('open', () => {
    console.log("connected to mongo DB")
})
const app = express();

// allow cross origin request 
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 5001;


if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'))
    }

app.listen(PORT, () => {
    console.log('server is listening on port 5000.... ')
})
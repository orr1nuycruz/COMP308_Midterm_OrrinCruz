//    Orrin Cruz - 300898431
//    February 25, 2019
//    Tom Tsiliopoulos
//    COMP308 Midterm

let mongoose = require('mongoose');

// create a model class
let gamesSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('books', gamesSchema);

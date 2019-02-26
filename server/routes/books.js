//    Orrin Cruz - 300898431
//    February 25, 2019
//    Tom Tsiliopoulos
//    COMP308 Midterm


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the bookModel model
let bookModel = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  bookModel.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE */
    res.render('books/details',{
      title: 'Add New Book',
      books: ""
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  console.log(req.body);

  /*****************
     * ADD CODE HERE */
    let newBook = bookModel({
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre" : req.body.genre
    })

    bookModel.create(newBook,(err, bookModel) => {
      if(err){
          console.log(err);
          res.end(err);
      }
      else{
          // refresh the contact list
          res.redirect('/books');
      }
  })


});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE */
    let id = req.params.id;
    console.log(id);
    bookModel.findById(id, (err, bookObject) =>{
      if(err){
          console.log(err);
          res.end(err);
      }
      else{
          //show the edit page
          res.render('books/details',{
            title: 'Add New Book',
            books: bookObject
        });
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

  let id = req.params.id;
    /*****************
     * ADD CODE HERE */
    let updateBook = bookModel({
      "_id": id,
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre" : req.body.genre
    })

    bookModel.update({_id:id}, updateBook, (err) => {
      if(err){
          console.log(err);
          res.end(err);
      }
      else{
          // refresh the contact list
          res.redirect('/books');
      }
  })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE */
    let id = req.params.id;

    bookModel.remove ({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            //refresh the contact list
            res.redirect('/books');
        }
    });
});


module.exports = router;

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// author is a reference to a single Author model object
// the same is true for genre
var BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Schema.ObjectId,
    ref: 'Author',
    required: true
  },
    summary: {
      type: String,
      required: true
    },
    isbn: {
      type: String,
      required: true
    },
    genre: [{
      type: Schema.ObjectId,
      ref: 'Genre'
    }]
});

// virtual book URL
BookSchema.virtual('url').get(function() {
  return '/catalog/book/' + this._id;
});

module.exports = mongoose.model('Book', BookSchema);

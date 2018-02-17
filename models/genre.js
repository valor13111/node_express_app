var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
  name: {
    type: String,
    min: [3, 'Too few characters ma maann.'],
    max: [100, 'Woah, now that is too many!'],
    required: true
  }
});

GenreSchema.virtual('/').get(function() {
  return '/catalog/genre/' + this._id;
});

module.exports = mongoose.model('Genre', GenreSchema);

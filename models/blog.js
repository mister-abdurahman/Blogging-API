const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const blogSchema = new Schema({
  id: ObjectId,
  title: { type: String, required: true},
  description: { type: String },
  author: { type: String, required: true}, 
  state: { type: String, default: 'draft', enum: ['draft', 'published'], required: true },
  read_count: { type: Number, default: 0},
  reading_time: { type: Number },
  tags: { type: String, required: true},
  body: {type: String, required: true}, 
  timestamp: {type: Date, default: Date.now()},
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
});

module.exports = mongoose.model('blogs', blogSchema);
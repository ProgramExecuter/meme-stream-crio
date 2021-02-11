const mongoose = require('mongoose');

let memeSchema = new mongoose.Schema({
    name: String,
    url: String,
    caption: String,
});

module.exports = mongoose.model("meme", memeSchema);
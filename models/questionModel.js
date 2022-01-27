const mongoose = require('mongoose');

//  Schema
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
    questionid: Number,
    question: String,
    answer1: String,
    points1: Number,
    answer2: String,
    points2: Number,
    answer3: String,
    points3: Number,
    answer4: String,
    points4: Number,
    answer5: String,
    points5: Number,
    answer6: String,
    points6: Number
})


// Model
const questions = mongoose.model('questions',QuestionSchema);

module.exports = questions;
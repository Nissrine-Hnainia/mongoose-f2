//require mongoose to create the schema
const mongoose = require('mongoose')

// const Schema = mongoose.Schema
const Person = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    favoriteFoods: {
        type: [String]
    }
})

module.exports = mongoose.model('Person', Person)
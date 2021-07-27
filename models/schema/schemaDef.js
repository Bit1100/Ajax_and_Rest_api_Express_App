// Importing the modules
const mongoose = require('mongoose');

// Defining the User API Schema
const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    age: {
        type: Number,
        min: 18,
        validate(v) {
            if (!(v <= 65)) {
                return "Age Must Be Less than or Equal to 65"
            }
        },
        // validate: {
        //     validator: function (v) {
        //         return v <= 65
        //     },
        //     message: "Age Must Be Less than or Equal to 65"
        // },
        required: true,
        index: true
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ["male", "female", "transgender"]
    },
    active: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// Creating a Model based on Schema
const User = new mongoose.model('User', user);

module.exports = { User };

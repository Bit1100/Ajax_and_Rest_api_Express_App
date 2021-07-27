const express = require('express');
const { User } = require('../models/schema/schemaDef');
const apiRouter = express.Router();

// POST Method
apiRouter.post('/:newUserData', async (req, res) => {
    try {
        let newUserData = req.params.newUserData.split(',');
        let userObject = {};
        userObject.name = newUserData[0];
        userObject.age = newUserData[1];
        userObject.gender = newUserData[2].toLowerCase();
        (newUserData[3].toLowerCase() == 'true') ? userObject.active = true : userObject.active = false;

        let newUser = new User(userObject);
        newUser = await newUser.save();
        res.status(200).json(newUser);
    } catch (e) {
        res.status(400).json({ message: "Invalid User Details" });
    }
})

// GET Method for All Users
apiRouter.get('/', async (req, res) => {
    try {
        // Array of objects => [{},{}]
        const result = await User.find();
        res.status(200).json(result);
        // { [{}, {}] }
    } catch (e) {
        res.status(400).json({ message: "Something Issue with DB" });
    }
})

// GET Method for 1 User
apiRouter.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await User.findById({ _id });
        res.status(200).json(result);
        // {{}}
    } catch (e) {
        res.status(400).json({ message: "Given UserId doesn't Exist" });
    }
})

// DELETE Method for 1 User
apiRouter.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await User.findByIdAndDelete({ _id });
        res.json(result);
    } catch (e) {
        res.status(400).json({ message: "Given UserId doesn't Exist" });
    }
})

// PATCH Method for 1 User
apiRouter.patch('/:id/:active', async (req, res) => {
    try {
        const _id = req.params.id;
        const activeStatus = req.params.active;
        const result = await User.findByIdAndUpdate({ _id }, { $set: { active: activeStatus } }, { new: true });
        res.json(result);
    } catch (e) {
        res.status(400).json({ message: "Given UserId doesn't Exist" });
    }
})

module.exports = apiRouter;
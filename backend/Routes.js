const express = require("express");
const { addLogin,  addUser, addInterviewExp,getData } = require("./usecontroller/UserController");

const router = express.Router();


router.get('/', (req, res) => {
    res.send("Default Page");
});


router.post('/login', addLogin);  

router.post('/signup', addUser);  
// router.get('/users', getLogin); 

router.post('/addInterview',addInterviewExp)

router.get('/all-interview-data', getData)

module.exports = router;

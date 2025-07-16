const express = require("express");
const { addLogin,  addUser, addInterviewExp,getData, likes, save , addUserData, getUserDetails } = require("./usecontroller/UserController");

const router = express.Router();


router.get('/', (req, res) => {
    res.send("Default Page");
});


router.post('/login', addLogin);  

router.post('/signup', addUser);  
// router.get('/users', getLogin); 

router.post('/addInterview',addInterviewExp)

router.get('/all-interview-data', getData)

router.post('/like',likes)

router.post('/save',save)

router.put('/addUserData',addUserData)

router.get('/getUser', getUserDetails);

module.exports = router;

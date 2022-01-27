const express = require ('express');

const router = express.Router();

const questions = require('../models/questionModel');

// ROUTES
router.get('/api', (req,res) =>{
 
    questions.find({  })
        .then((data) => {
           
            res.json(data);
        })
        .catch((error) => {
            console.log('error : ', error);
        })

       
});

module.exports = router;
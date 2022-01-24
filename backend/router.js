const express = require('express');
const router = express.Router();


router.get('/',(req,res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send('server is up');
});

module.exports = router;
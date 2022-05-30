const router = require('express').Router();
// const express = require()

const { getsongs, postsong } = require('../controller/song.controller')


// Get all Songs
router.get('/songs', getsongs)

// Add Song
router.post('/song', postsong)



module.exports = router;

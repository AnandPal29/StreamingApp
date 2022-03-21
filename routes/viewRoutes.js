const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const route = express.Router();

route.get('/', viewController.getLogin);
route.get('/signup', viewController.getSingup);
route.get('/home', authController.protect, viewController.getHome);
route.get('/player/:videoName', authController.protect, viewController.getVideoPlayer);
route.get('/myVideos',authController.protect, viewController.getMyVideos);
route.get('/videoDetails/:videoId',authController.protect, viewController.getVideoDetails);
route.get('/uploadVideo', authController.protect, viewController.getUploadVideo)


module.exports = route;
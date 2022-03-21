const express = require('express');
const videoController = require('../controllers/videoController');
const authController = require('../controllers/authController');
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null,'./public/uploads');
//     },
//     filename: function(req, file, cb) {
//         cb(null, req.body.name + '.' + 'mp4');
//     }
// })
const storage = multer.diskStorage({
    destination: function(req, file, cb){
       
        if(file.mimetype === 'video/mp4') {

            cb(null, './public/uploads');
        }
        else if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
           
            cb(null, './public/thumbnail')
        }
        else {
            cb({error: 'Error'})
        }
    },
    filename: function(req, file, cb) {
        if(file.mimetype === 'video/mp4') {
            cb(null, String(Date.now()) + '.' + 'mp4');
        }
        else if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
            console.log(Date.now())
            cb(null, String(Date.now()) + '.' + file.mimetype.split('/')[1])
        }
        else {
            cb({error: 'Error'})
        }
    }
})

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'video/mp4' || file.mimetype === 'image/png' || file.mimetype === 'video/jpeg'){
//         cb(null, true);
//     }
//     else{
//         cb(null, false);
//     }
// }

const upload = multer({storage})


const router = express.Router();

router.route('/')
    .get(videoController.getAllVideos)
    .post(authController.protect,upload.single('videoName'), videoController.createVideo);

router.route('/:id')
    .get(videoController.getVideo)
    .patch(authController.protect, videoController.updateVideo)
    .delete(authController.protect,videoController.deleteVideo)

router.route('/updateThumbnail/:id')
    .patch(authController.protect, upload.single('thumbnailName'), videoController.updateThumbnail);

module.exports = router;
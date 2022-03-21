const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/updatePassword', authController.protect, authController.updateMyPassword);
router.post('/updateMe', authController.protect, authController.updateMe);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
//router.post('/forgotPassword')

router
    .route('/')
    .get(userController.getUser)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getAllUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
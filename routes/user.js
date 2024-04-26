const router = require('express').Router();
const userController = require('../controllers/userController');

router.get("/",userController.getUser);

router.delete("/",userController.deleteUser);
router.get("/verify/:otp",userController.verifyAccount);
router.get("/verify_phone/:phone",userController.verifyPhone);


module.exports = router;
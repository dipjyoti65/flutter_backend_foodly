const router = require('express').Router();
const foodController = require('../controllers/foodController');

router.post("/",foodController.addFood);

router.get("/:id",foodController.getFoodByID);

// router.get("/random/:code",foodController.getRandomFood);
router.get("/recommendation/:code",foodController.getRandomFood);

router.get("/search/:search",foodController.searchFoods);

router.get("/restaurant-foods/:id",foodController.getFoodByRestaurant);

router.get("/:category/:code",foodController.getFoodsByCategoryAndCode);


module.exports = router;
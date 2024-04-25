const Restaurant = require('../models/Restaurant');

module.exports = {
  
  addRestaurant : async(req, res) =>{
    const{ title,time,imageUrl,owner,code,logoUrl,coords} = req.body;

    if( !title || !time || !imageUrl || !owner || !code || !logoUrl || !coords ||
        !coords.latitude || !coords.longitude || !coords.address || !coords.title){
          return res.status(400).json({status: false, message: "You have a missing field"});
        }

    try{
      const newRestaurant = new Restaurant(req.body);

      await newRestaurant.save();
      // Since we are creating a restaurant our response will be 201
      res.status(201).json({status: true, message:"Restaurant has been successfully added"});
    }catch(error){

    }
  },

  getRestaurantById: async(req,res)=>{
    const id = req.params.id;
    try{
      const restaurant = await Restaurant.findById(id);

      res.status(200).json(restaurant);
    }catch(error){
      res.status(500).json({status: false, message: error.message});
    }
  },

  getRandomRestaurants: async(req, res) =>{
    const code = req.params.code;
    try{
        let randomRestaurant = [];

        if(code){
          randomRestaurant = await Restaurant.aggregate([
            {$match : {code: code, isAvailable: true}},
            {$sample : {size: 5}},
            {$project : {_v: 0}}
          ]);
        }

        if(randomRestaurant.length === 0){
          randomRestaurant = await Restaurant.aggregate([
            {$match : {isAvailable: true}},
            {$sample: {size: 5}},
            {$project : {__v: 0}}
          ]);
        }

        res.status(200).json(randomRestaurant);
    }catch(error){
        res.status(500).json({status: false, message: error.message});
    }
  },

  getAllNearByRestaurants: async(req, res) =>{
    const code = req.params.code;
    try{
        let allNearbyRestaurants = [];

        if(code){
          allNearbyRestaurants = await Restaurant.aggregate([
            {$match : {code: code, isAvailable: true}},
            {$project : {_v: 0}}
          ]);
        }

        if(allNearbyRestaurants.length === 0){
          allNearbyRestaurants = await Restaurant.aggregate([
            {$match : {isAvailable: true}},
            {$project : {__v: 0}}
          ]);
        }

        res.status(200).json(allNearbyRestaurants);
    }catch(error){
      res.status(500).json({status: false, message: error.message});
    }
  }
}
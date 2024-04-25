const Food = require('../models/Food');

module.exports = {
  addFood:async(req,res)=>{
    const {title,foodTags,category,code,restaurant,description,time,price,additives,imageUrl} = req.body;

    if(!title || !foodTags || !category || !code || !restaurant || !description || !time || !price || !additives || !imageUrl){
      return res.status(400).json({status:false,message: "You have a missing field"});
    }

    try{
      const newFood = new Food(req.body);

      await newFood.save();

      res.status(201).json({status: true, message: "Food has been successfulldy added"});
    }catch(error){
      res.status(500).json({status: false, message: error.message});
    }
  },

  getFoodByID: async(req,res)=>{
    const id = req.params.id;

    try{
      const food = await Food.findById(id);
      
      res.status(200).json(food)
    }catch(error){
      res.status(500).json({status:false,message:error.message});
    }
  },

  getRandomFood: async(req,res) =>{
    // const code = req.params.code;

    try{
      // let foods;

      // if(req.params.code){
      //   foods = await Food.aggregate([
      //     {$match:{code:code,isAvailable: true}},
      //     {$sample:{size: 5}},
      //     {$project: {__v: 0}}
      //   ])
      // }

      // if(foods.length ===0){
      //   foods = await Food.aggregate([
      //     {$match: {isAvailable : true}},
      //     {$sample : {size: 5}},
      //     {$project : {__v: 0}}
      //   ])
      // }
      //   res.status(200).json(foods);

      let randomFoodList = [];
      // Check if the code is provided in the params
      if(req.params.code){
        randomFoodList = await Food.aggregate([
          {$match:{code:req.params.code}},
          {$sample:{size: 3}},
          {$project: {__v: 0}}
        ])
      }

      //If no code provided in params or no Foods match the 
      if(!randomFoodList.length){
        randomFoodList = await Food.aggregate([
          {$sample : {size: 5}},
          {$project : {__v: 0}}
        ])
      }

      //Respond with the results
      if(randomFoodList.length){
        res.status(200).json(randomFoodList);
      }else{
        res.status(404).json({status:false,message:'No Food Available'})
      }
    
    }catch(error){
      res.status(500).json({status: false, message: error.message});
    }
  },

  // Restaurant Menu
  getFoodByRestaurant:async(req,res) =>{
    const id= req.params.id;
    try{
      const foods = await Food.find({restaurant:id});

      res.status(200).json(foods);
    }catch(error){
      res.status(500).json({status:false, message: error.message});
    }
  },

  getFoodsByCategoryAndCode: async (req,res) =>{
    const {category,code} = req.params;
    try{
      const foods = await Food.aggregate([
        {$match: {category:category,code:code,isAvailable : true}},
        {$project:{__v:0}}
      ]);

      if(foods.length ===0){
        return res.status(200).json({status: false, message:"NO food found"});
      }

      res.status(200).json(foods);
    }catch(error){
      res.status(500).json({status:false,message:error.message});
    }
  },

  searchFoods: async(req,res) =>{
    const search = req.params.search;

    try{
      const results = await Food.aggregate([
        {
          $search:{
            // The index name should be same in Atlas dashboard and inside my nodejs code
            index:"foods",
            text:{
              query: search,
              path:"title"
            }
          }
        }
      ])

      res.status(200).json(results);
    }catch(error){
      res.status(500).json({status:false,message:error.message});
    }
  },

  getRandomFoodsByCategoryAndCode: async(req,res) =>{
    const {category,code}  = req.params;

    try{
      let foods;

      foods= await Food.aggregate([
        {$match: {category:category, code: code, isAvailable: true}},
        {$sample: {size: 10}},
      ])

      if(!foods || foods.length ===0){
        foods = await Food.aggregate([
          {$match:{code: code, isAvailable:true}},
          {$sample:{size: 10}},
        ])
      }else if(!foods || foods.length === 0){
        foods = await Food.aggregate([
          {$match : {isAvailable: true}},
          {$sample: {size: 10}},
        ])
      }
      res.status(200).json(foods);

    }catch(error){
      res.status(500).json({status: false, message: error.message})
    }
  }
};
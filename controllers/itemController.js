const Item = require('../models/itemModel');
const asyncHandler = require('express-async-handler'); // npm i express-async-handler

// const itemSchema = new mongoose.Schema(
//   {
//     description: {
//       type: String,
//       required: [true, 'Item description is required'],
//     },
//     quantity: {
//       type: Number,
//       required: [true, 'Item quantity is required']
//     },
//     packed: {
//       type: Boolean,
//       default: false
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     }
  
// })

//! Get all items
const getItems = asyncHandler(async(req, res) => {
  try {
    const items = await Item.find({}); // find method to get all the items
    res.status(200).json(items);
  } catch (err) {
    res.status(500);
    throw new Error(error.message);
  }
})

//! Get a single item
const getItem = asyncHandler(async(req, res) => {
  try {
    const item = await Item.findById(req.params.id); 
    res.status(200).json(item);
  } catch (err) {
    res.status(500);
    throw new Error(error.message);
  }
})

//! Create an item
const createItem = asyncHandler(async(req, res) => {
  try {
    const userId = req.user._id
    const newItem = await Item.create({...req.body, userId});
    res.status(200).json(newItem);
  } catch (err) {
    res.status(500);
    throw new Error(error.message);
  }
})

//! Update an item
const updateItem = asyncHandler(async(req, res) => {
  try{
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body);
    if(!item){
      res.status(404);
      throw new Error(`Item with ID: ${id} not found`);
    } 
    const updatedItem = await Item.findById(id);
    res.status(200).json(updatedItem);

  } catch (err) {
    res.status(500);
    throw new Error(error.message);
  }
})

//! Delete an item
const deleteItem = asyncHandler(async(req, res) => {
  try{
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    if(!deletedItem){
      res.status(404);
      throw new Error(`Item with ID: ${id} not found`);
    } 
    res.status(200).json(deletedItem);

  } catch (err) {
    res.status(500);
    throw new Error(error.message);
  }
})

//! Delete all items
const deleteAllItems = asyncHandler(async(req, res) => {
  try{
    const deletedItems = await Item.deleteMany({});
    res.status(200).json(deletedItems);

  } catch (err) {
    res.status(500);
    throw new Error(error.message);
  }
})

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, deleteAllItems }
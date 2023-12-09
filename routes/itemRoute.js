const express = require('express')
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem, deleteAllItems } = require('../controllers/itemController')


//! Get all items
router.get('/', getItems)

//! Get a single item
router.get('/:id', getItem)

//! Create an item
router.post('/', createItem)


//! Update an item
router.put('/:id', updateItem)


//! Delete an item
router.delete('/:id', deleteItem)

//!  Delete all items
router.delete('/', deleteAllItems)


module.exports = router;
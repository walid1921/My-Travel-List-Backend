const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Item description is required']
    },
    quantity: {
      type: Number,
      required: [true, 'Item quantity is required']
    },
    packed: {
      type: Boolean,
      default: false
    }
  
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
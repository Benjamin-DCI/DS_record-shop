const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },
  record: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Order", OrderSchema);
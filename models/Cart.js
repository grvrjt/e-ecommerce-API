const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, default: "" },
        quantity: { type: Number, default: 30 },
        title: { type: String, default: "" },
        img: { type: String, default: "" },
        desc: { type: String, default: "" },
        categories: { type: Array, default: [] },
        size: { type: String, default: "M" },
        color: { type: String, default: "" },
        price: { type: Number, default: 30 },
        quantity: { type: Number, default: 0 },
        inStock: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);

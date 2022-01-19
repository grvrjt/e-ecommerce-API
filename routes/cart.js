const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  // verifyToken added later
  const {
    _id,
    title,
    img,
    desc,
    categories,
    size,
    color,
    price,
    quantity,
    userId,
    inStock,
  } = req.body;

  const product = {
    productId: _id,
    title,
    img,
    desc,
    categories,
    size,
    color,
    price,
    quantity,
    inStock,
  };

  console.log("CART PRODUCT---->", req.body);
  try {
    const savedCart = await Cart.updateOne(
      { userId },
      { $push: { products: product } },
      { upsert: true }
    );

    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET All CART PRODUCTS
router.get("/products/:userId", async (req, res) => {
  // verifyToken added
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (cart) {
      const products = cart?.products;
      res.status(200).json(products);
    }
    res.status(200).json([]);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

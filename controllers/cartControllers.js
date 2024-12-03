const Cart = require("../models/cart");

const addCart = async (req, res) => {
  try {
    const { userId, title, description, image, price, productId } = req.body;
    const existingCartItem = await Cart.findOne({ userId, productId });
    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
      return res.json({ message: "Cart updated successfully", cart: existingCartItem });
    } else {
      const cart = new Cart({ userId, productId, title, description, image, price });
      await cart.save();
      return res.json({ message: "Cart added successfully", cart });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getAllCart = async (req, res) => {
  try {
    const { userId } = req.params; 
    const cart = await Cart.find({ userId }); 
    return res.status(200).json(cart); 
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" }); 
  }
};

const deleteCart = async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const cart = await Cart.findByIdAndDelete(cartId);
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.json({ message: "Something went wrong" });
  }
}

const deleteAllCart = async (req, res) => {
    try {
      const { userId } = req.params; 
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const result = await Cart.deleteMany({ userId });
  
      return res.status(200).json({ 
        message: "All cart items deleted successfully", 
        deletedCount: result.deletedCount 
      });
    } catch (error) {
      console.error(error); 
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  

module.exports = {
  addCart,
  getAllCart,
  deleteCart,
  deleteAllCart
};

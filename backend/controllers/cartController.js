import userModel from "../models/userModel.js"

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({
            _id: req.body.userId
        })
        let cartData = await userData.cartData;
        
    } catch (error) {
        console.log(error);
    }
}

// Remove Items from user cart
const removeFromCart = async (req, res) => {

}

// Get the items from the cart
const getCart = async (req, res) => {

}

export { addToCart, removeFromCart, getCart }
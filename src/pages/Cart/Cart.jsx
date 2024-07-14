import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";

const Cart = () => {
  const { cartItems, food_list, addToCart, removeFromCart, getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Add</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>&#8377; {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>&#8377;  {item.price * cartItems[item._id]}</p>
                  <p className="cross" onClick={() => {
                    addToCart(item._id);
                  }}>+</p>
                  <p className="cross" onClick={() => {
                    removeFromCart(item._id);
                  }}>x</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>&#8377; {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#8377; {2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>&#8377; {getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button>Proceed to Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code enter here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter Promo code" name="" id="" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

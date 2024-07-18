import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {

  const{ getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    mobile: ""
  })


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    
    let orderItems = [];
    food_list.map((item) => {
      if(cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place", orderData, {headers: {token}})
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token])

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name='first_name' onChange={onChangeHandler} value={data.first_name} placeholder="First Name" required />
          <input type="text" name='last_name' onChange={onChangeHandler} value={data.last_name} placeholder="Last Name" required />
        </div>
        <input type="text" name='email' onChange={onChangeHandler} value={data.email} placeholder="Enter Email" required />
        <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder="Street" required />
        <div className="multi-fields">
          <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder="City" required />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" required />
        </div>
        <div className="multi-fields" >
          <input type="text" name='zip' onChange={onChangeHandler} value={data.zipcode} placeholder="Zip Code" required />
          <input type="text" name='country' onChange={onChangeHandler} value={data.country}  placeholder="Country" required />
        </div>
        <input type="text" name='mobile' onChange={onChangeHandler} value={data.mobile} placeholder="Enter Mobile" required />
      </div>
      <div className="place-order-right">
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
              <p>&#8377; {getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>&#8377; {getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

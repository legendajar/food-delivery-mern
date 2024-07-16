import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";

  const [token, setToken] = useState("")

  const [food_list, setFoodList] = useState([]);

  // To add or increase the food item in the cart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url+"/api/cart/add",{itemId}, {headers: {
        token
      }})
    }
  };


  // To remove the food item in the cart
  const removeFromCart = async (itemId) => {
    if (cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId}, {headers: {
        token
      }})
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  

  // To get the food list from the backend
  const fetchFoodList = async () => {
    const res = await axios.get(`${url}/api/food/list`);
    setFoodList(res.data.data)
  }

  const loadCartData = async (token) => {
    const res = await axios.post(url+"/api/cart/get", {}, {headers: {token}});
    setCartItems(res.data.cartData);
  } 

  // to prevent logging out automatically on refresh
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if(localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    } loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url, 
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

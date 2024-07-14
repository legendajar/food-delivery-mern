import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    // To add or increase the food item in the cart
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]: 1}))
        }
        else {
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
        }
    }

    const decreaseFromCart = (itemId) => {
        if (cartItems[itemId] > 1) {
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
        }
        else {
            removeFromCart(itemId)
        }
    }

    // To remove the food item in the cart
    const removeFromCart = (itemId) => {
        if (cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]: 0}))
        }
    }

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems, 
        addToCart,
        decreaseFromCart,
        removeFromCart
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;
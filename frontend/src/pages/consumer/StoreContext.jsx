import React, { createContext, useState } from "react";
import { food_list } from "../../assets/consumer/assets";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart=(itemId)=>{
        if (!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]-1}))
    }
    
    const getTotalCartAmount =()=>{
         let totalAmount=0;
         for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=>product._id===item)
                totalAmount+=itemInfo.price* cartItems[item];
            }
            
         }
         return totalAmount; 
        }

    return (
        <StoreContext.Provider value={{ cartItems, food_list ,addToCart , removeFromCart, getTotalCartAmount }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;

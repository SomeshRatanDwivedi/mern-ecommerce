import { ADD_TO_CART, RESET_ADD_TO_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants"


export const addItemsToCart=(productObj, quantity)=>(dispatch, getState)=>{
    const product=productObj._id;
    const image=productObj.images[0];

    delete productObj["images"];
    delete productObj["_id"];
    const newCartItem = {...productObj, quantity, product, image};
   
     dispatch({
        type:ADD_TO_CART,
        payload:newCartItem
     })

     localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingInfo=(data)=>(dispatch)=>{
   dispatch({
      type:SAVE_SHIPPING_INFO,
      payload:data
   })

   localStorage.setItem("shippingInfo", JSON.stringify(data));
}

export const resetAddToCart=()=>(dispatch)=>{
   dispatch({type:RESET_ADD_TO_CART})
}
import { ADD_TO_CART, RESET_ADD_TO_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemAlreadyPresent = state.cartItems.find(ele => ele.product === item.product);
            if (isItemAlreadyPresent) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((ele) => {
                        return ele.product !== item.product ? ele : item
                    }),
                    success: true
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                    success: true
                }
            }
        case RESET_ADD_TO_CART:
            return {
                ...state,
                success: false
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        default:
            return state

    }

}
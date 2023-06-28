import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CLEAR_ERRORS, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL } from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };

        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};


export const myOrders = (state = {orders:[]}, action) => {
    switch (action.type) {
        case MY_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };

        case MY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const orderDetailReducer=(state={orderDetails:{}}, action)=>{
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                orderDetails: action.payload,
            };

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}
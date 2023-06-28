import axios from "axios";
import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstants";
import { API_ROOT } from "../constants/api";
import makeConfig from "../constants/apiConfig";

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = makeConfig(false)
        const { data } = await axios.post(`${API_ROOT}/order/new`, order, config);

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDER_REQUEST });

        const config = makeConfig(false)
        const { data } = await axios.get(`${API_ROOT}/order/me`, config);

        dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getOrderDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({type:ORDER_DETAILS_REQUEST});
        const config=makeConfig(false);
        const {data}=await axios.get(`${API_ROOT}/order/${id}`, config);
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data.order
        })

    }catch(error){
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrors=()=>(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}
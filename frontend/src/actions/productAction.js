import axios from 'axios'
import { API_ROOT } from '../constants/api'

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST
} from "../constants/productConstant"


export const getProducts = (page = 1, keyword = '', category = '', priceRange=[0, 25000]) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        })
        let url = `${API_ROOT}/product/products?page=${page}&price[gt]=${priceRange[0]}&price[lt]=${priceRange[1]}`;
        if(keyword){
            url=`${url}&keyword=${keyword}`;
        }

        if(category){
            url = `${url}&category=${category}`;
        }

        const { data } = await axios.get(url);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {

    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })
        const { data } = await axios.get(`${API_ROOT}/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newReview=(reviewData)=>async(dispatch)=>{
    try{
        dispatch({type:NEW_REVIEW_REQUEST});
        const {data}=await axios.post(`${API_ROOT}/`)

    }catch(error){
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}
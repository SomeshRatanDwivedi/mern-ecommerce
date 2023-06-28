import axios from "axios";
import {
    SIGNUP_REQUEST,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOAD_USER_FAIL, 
    LOAD_USER_SUCCESS,
    LOGOUT_USER,
    EDIT_PROFILE_FAIL,
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    CLEAR_ERRORS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    CLEAR_MESSAGE
} from "../constants/userConstants";
import { API_ROOT, LOCAL_STORAGE_TOKEN_KEY_NAME } from "../constants/api";
import jwt_decode from "jwt-decode";
import makeConfig from "../constants/apiConfig";





export const login = (userInfo) => async (dispatch) => {
    try {
         
        dispatch({ type: LOGIN_REQUEST })
        const { data } = await axios.post(`${API_ROOT}/user/login`, userInfo);
        const {user, token}=data.data;
        if (token) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME, token);
        }
        dispatch({
            type: LOGIN_SUCCESS,
            payload: user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}


export const signup = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SIGNUP_REQUEST });

        const config=makeConfig(true)

        const { data } = await axios.post(`${API_ROOT}/user/signup`, formData, config);
       

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: error.response.data.message
        })
    }
}


export const loadUser=()=>{
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME)
    if(token){
        const user=jwt_decode(token)
        return{
            type:LOAD_USER_SUCCESS,
            payload:user
        }
    }
    else{
        return{
            type:LOAD_USER_FAIL,
            payload:'Something went wrong, Please login'
        }
    }
}

export const logoutUser=()=>{
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
    return {
        type:LOGOUT_USER
    }
}



export const editProfile=(formData)=>async(dispatch)=>{
    try{
     
         dispatch({
            type:EDIT_PROFILE_REQUEST,
         });

        const config=makeConfig(true)
         
        const {data}=await axios.post(`${API_ROOT}/user/edit`,formData, config);
        const { token } = data.data;

        if (token) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME, token);
        }

        dispatch({
            type:EDIT_PROFILE_SUCCESS,
            payload:data.success
        });


    }catch(error){
        dispatch({
            type:EDIT_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updatePassword=(passwordInfo)=>async(dispatch)=>{
    try{
       
        dispatch({type:UPDATE_PASSWORD_REQUEST});
        const config = makeConfig(false)

        const {data}=await axios.put(`${API_ROOT}/user/update-password`, passwordInfo, config);

        const {token}=data.data;

        if(token){
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME, token)
        }

        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload:data.success
        })

    }catch(error){
    
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })

    }
}


export const forgotPassword=(value)=>async(dispatch)=>{
    try{
        dispatch({type:FORGOT_PASSWORD_REQUEST});
        const {data}=await axios.post(`${API_ROOT}/user/forgot-password`, value);
        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:data.message
        })

    }catch(error){
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}


export const resetPassword=(values, token)=>async(dispatch)=>{
    try{

        dispatch({type:RESET_PASSWORD_REQUEST});

        const {data}=await axios.put(`${API_ROOT}/user/reset-password/${token}`, values);

        dispatch({
            type:RESET_PASSWORD_SUCCESS,
            payload:data.message
        })

    }catch(error){
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.response.data.message
        })
    }
}


export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}

export const clearMessage=()=>async(dispatch)=>{
    dispatch({type:CLEAR_MESSAGE})
}

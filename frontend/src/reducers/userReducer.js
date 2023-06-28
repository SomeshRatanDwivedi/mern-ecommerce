
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
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,
    EDIT_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    CLEAR_ERRORS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_RESET,
    CLEAR_MESSAGE
} from "../constants/userConstants";


export const userReducer=(state={user:{}}, action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
            return{
                ...state,
                loading:true,
                isAuthenticated:false
            }
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload
            }
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            return{
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case LOAD_USER_FAIL:
            return{
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case LOGOUT_USER:
            return{
                loading:false,
                isAuthenticated:false,
                user:null,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }

        default:
            return state;
    }
}


export const profileReducer=(state={}, action)=>{
    switch(action.type){
        case FORGOT_PASSWORD_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case EDIT_PROFILE_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true
            }
        case EDIT_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload
            }
        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return{
                loading:false,
                message:action.payload
            }
        case FORGOT_PASSWORD_FAIL:
        case EDIT_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case EDIT_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return{
                ...state,
                isUpdated:false
            }
        case CLEAR_MESSAGE:
            return{
                ...state,
                message:null
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
        
    }
}

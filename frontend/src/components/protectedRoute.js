import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from './loader/Loader';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({Component}) => {
    const {isAuthenticated, loading}=useSelector(state=>state.user);
    const navigate=useNavigate();

    useEffect(()=>{
        if(isAuthenticated===false){
            navigate('/login-signup');
        }
    }, [isAuthenticated])

    if(loading){
        return <Loader/>
    }
     
    return (
        <>
            <Component/>
        </>
    );
}

export default ProtectedRoute;

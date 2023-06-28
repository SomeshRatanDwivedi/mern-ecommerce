import React, { useEffect } from 'react';
import './login.css'
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas';
import { toast } from 'react-toastify';
import { clearErrors } from '../../actions/productAction';
import { login } from '../../actions/userAction';
import { LOCAL_STORAGE_TOKEN_KEY_NAME } from '../../constants/api';
import { Link, Navigate } from 'react-router-dom';
import { CLEAR_ERRORS } from '../../constants/userConstants';





const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const initialValues = {
    email: "",
    password: ""
}

const Login = ({ setPage }) => {

    const dispatch = useDispatch();
    const { error, loading, isAuthenticated } = useSelector((state) => state.user);
    

    useEffect(() => {
        if (error !== 'Something went wrong, Please login') {
            toast.error(error);
            dispatch({type:CLEAR_ERRORS})
        }
    }, [dispatch, error])

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values, action) => {
            dispatch(login(values));
            action.resetForm();
        }
    })

    if (isAuthenticated) {
        return <Navigate to='/' />
    }


    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h1>Sign in to your account</h1>
            <div className='text-input-parent'>
                <label>Your email</label>
                <input type='text' name='email' placeholder='user@gmail.com' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                {errors.email && touched.email ? <p className='input-error'>{errors.email}</p> : null}
            </div>
            <div className='text-input-parent'>
                <label>Password</label>
                <input type='password' name='password' placeholder='******' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                {errors.password && touched.password ? <p className='input-error'>{errors.password}</p> : null}
            </div>
            <div className='check-box-input-parent'>
                <div>
                    <Checkbox {...label} defaultChecked color='success' />
                    <label>Remeber me</label>
                </div>
                <Link to='/forgot-password' className='forgot-password'>Forgot password?</Link>
            </div>
            <div className='login-signup-btn-parent'>
                <button disabled={loading} className='login-signup-btn' type='submit'>Sign in</button>
            </div>


            <p>
                Dont have account yet?
                <span onClick={() => setPage('signup')}>Sign up</span>
            </p>

        </form>
    );
}

export default Login;

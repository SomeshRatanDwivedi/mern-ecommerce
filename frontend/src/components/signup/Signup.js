import { Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { signupSchema } from '../../schemas';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Profile from '../../images/Profile.png'
import { signup } from '../../actions/userAction';



const initialValues={
    name:'',
    email:'',
    password:'',
    confirm_password:''
}

const Signup = ({ setPage }) => {

    const [file, setFile]=useState('')

    const dispatch=useDispatch();
    const {error, user, loading}=useSelector(state=>state.user);



    useEffect(()=>{
        if (error !== 'Something went wrong, Please login'){
            toast.error(error);
        }

        if (user && Object.keys(user).length !== 0) {
            toast.success('Signup successfully')
            setPage('login')
        }

    }, [dispatch, error, user])

    

    const {values, errors, touched, handleSubmit, handleChange, handleBlur}=useFormik({
        initialValues,
        validationSchema:signupSchema,
        onSubmit:(values, action)=>{
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('name', values.name);
            formData.append('password', values.password);
            formData.append('avatar', file);
            dispatch(signup(formData));
            setFile(null)
            action.resetForm()
        }

    })


    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h1>Create an account</h1>
            <div className='text-input-parent'>
                <label>Your name</label>
                <input type='text' name='name' placeholder='your name' onChange={handleChange} onBlur={handleBlur} value={values.name} />
                 {errors.name && touched.name ? <p className='input-error'>{errors.name}</p> : null}
            </div>
            <div className='text-input-parent'>
                <label>Your email</label>
                <input type='text' name='email' placeholder='user@gmail.com' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                 {errors.email && touched.email ? <p className='input-error'>{errors.email}</p> : null}
            </div>
            <div className='text-input-parent'>
                <label>Password</label>
                <input type='password' name='password' placeholder='******' onChange={handleChange} onBlur={handleBlur} value={values.password} />
                 {errors.password && touched.password ? <p className='input-error'>{errors.password}</p> : null}
            </div>
            <div className='text-input-parent'>
                <label>Confirm Password</label>
                <input type='password' name='confirm_password' placeholder='******' onChange={handleChange} onBlur={handleBlur} value={values.confirm_password} />
                 {errors.confirm_password && touched.confirm_password ? <p className='input-error'>{errors.confirm_password}</p> : null}
            </div>
            <div className='text-input-parent avatar-input-parent'>
                <img src={Profile} />
                <input id='avatar' type='file' onChange={(e) => setFile(e.target.files[0])} />
                <label htmlFor='avatar' >Choose a file</label>
            </div>
            <div className='login-signup-btn-parent'>
                <button disabled={loading} className='login-signup-btn' type='submit'>Sign up</button>
            </div>


            <p>
                Already have an account?
                <span onClick={() => setPage('login')}>Login here</span>
            </p>

        </form>
    );
}

export default Signup;

import React, { useEffect, useState } from 'react';
import './updateProfile.css'
import { useDispatch, useSelector } from 'react-redux';
import { profileUpdateSchema } from '../../schemas';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { editProfile, loadUser } from '../../actions/userAction';
import Profile from '../../images/Profile.png'
import Loader from '../../components/loader/Loader';
import { EDIT_PROFILE_RESET } from '../../constants/userConstants';



const UpdateProfile = () => {

   
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.user);
    const {isUpdated, error, loading}=useSelector(state=>state.profile)
    const [initialValues, setInitialValues]=useState({name:'', email:''});
    const [file, setFile]=useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        if (isAuthenticated === false) {
            navigate(-1);
        }
        setInitialValues({
            name:user.name,
            email:user.email,
        })
        if(isUpdated){
            dispatch(loadUser());
            dispatch({type:EDIT_PROFILE_RESET})
        }
    }, [dispatch, isAuthenticated, user, error, isUpdated])

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: profileUpdateSchema,
        onSubmit: (values, action) => {
            const formData=new FormData();
            formData.append('email', values.email);
            formData.append('name', values.name);
            formData.append('avatar', file);
            action.resetForm();
            dispatch(editProfile(formData));
            setFile(null)
        }
    })


    if(loading){
        return <Loader/>
    }
    return (
        <div className='login-signup-parent'>
            <div>
                <div className='login-signup-bottom'>
                    <h2>Update Profile</h2>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <div className='text-input-parent'>
                            <label>Your Name</label>
                            <input style={{border:errors.name?'2px solid tomato':''}} type='text' name='name' placeholder='Your name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                            {errors.name && touched.name ? <p className='input-error'>{errors.name}</p> : null}
                        </div>
                        <div className='text-input-parent'>
                            <label>Your email</label>
                            <input style={{ border: errors.email ? '2px solid tomato' : '' }} type='text' name='email' placeholder='user@gmail.com' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                            {errors.email && touched.email ? <p className='input-error'>{errors.email}</p> : null}
                        </div>
                        <div className='text-input-parent avatar-input-parent'>
                            <img src={user.avatar?user.avatar.url:Profile}/>
                            <input id='avatar' type='file' onChange={(e)=>setFile(e.target.files[0])} />
                            <label htmlFor='avatar' >Choose a file</label>
                        </div>
                        <div className='login-signup-btn-parent'>
                            <button className='login-signup-btn' type='submit' >Update</button>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    );
}

export default UpdateProfile;

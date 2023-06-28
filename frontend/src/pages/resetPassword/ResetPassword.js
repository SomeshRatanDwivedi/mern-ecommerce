import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordSchema } from '../../schemas';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, clearMessage, resetPassword } from '../../actions/userAction';
import Loader from '../../components/loader/Loader';

const initialValues={
    newPassword:'',
    confirmNewPassword:''
}

const ResetPassword = () => {
    const {token}=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {error, message, loading}=useSelector(state=>state.profile);

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(message){
            toast.success(message);
            dispatch(clearMessage());
            navigate('/login-signup')
        }
    }, [dispatch, error, message])

    const {values, errors, touched, handleChange, handleBlur, handleSubmit}=useFormik({
        initialValues,
        validationSchema:resetPasswordSchema,
        onSubmit:(values, action)=>{
            dispatch(resetPassword(values, token))
            action.resetForm();
        }
    })

    if(loading){
        return <Loader/>
    }
    return (
        <div className='login-signup-parent'>
            <div>

                <form className='login-form' onSubmit={handleSubmit}>
                    <h1>Reset Password</h1>
                    <div className='text-input-parent'>
                        <label>New Password</label>
                        <input type='password' name='newPassword' placeholder='******' value={values.newPassword} onChange={handleChange} onBlur={handleBlur} />
                        {errors.newPassword && touched.newPassword ? <p className='input-error'>{errors.newPassword}</p> : null}
                    </div>
                    <div className='text-input-parent'>
                        <label>Confirm New Password</label>
                        <input type='password' name='confirmNewPassword' placeholder='******' value={values.confirmNewPassword} onChange={handleChange} onBlur={handleBlur} />
                        {errors.confirmNewPassword && touched.confirmNewPassword ? <p className='input-error'>{errors.confirmNewPassword}</p> : null}
                    </div>
                    <div className='login-signup-btn-parent'>
                        <button className='login-signup-btn' type='submit'>Update Password</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ResetPassword;

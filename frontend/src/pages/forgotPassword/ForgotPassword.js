import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordSchema } from '../../schemas';
import { toast } from 'react-toastify';
import { clearErrors, clearMessage, forgotPassword } from '../../actions/userAction';
import Loader from '../../components/loader/Loader';

const initialValues={
    email:''
}

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user);

    const {error, loading, message}=useSelector(state=>state.profile);
    const navigate = useNavigate();
    console.log(message)

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate(-1);
        }

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(message){
            toast.success(message);
            dispatch(clearMessage())
        }
    }, [dispatch, isAuthenticated, error, message])

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema:forgotPasswordSchema,
        onSubmit: (values, action) => {
            dispatch(forgotPassword(values));
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
                    <h1>Forgot Password</h1>
                    <div className='text-input-parent'>
                        <label>Email</label>
                        <input type='email' name='email' placeholder='user@gmail.com' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        {errors.email && touched.email ? <p className='input-error'>{errors.email}</p> : null}
                    </div>
                    <div className='login-signup-btn-parent'>
                        <button className='login-signup-btn' type='submit'>Send Email</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;

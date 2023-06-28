import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { updatePasswordSchema } from '../../schemas';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
}

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user);
    const {isUpdated, error, loading}=useSelector(state=>state.profile);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated===false) {
            navigate(-1);
        }

        if(isUpdated){
            toast.success("Your password is updated")
            dispatch(loadUser());
            dispatch({type:UPDATE_PASSWORD_RESET});
        }

        if(error){
            console.log(error)
            toast.error(error)
        }
    }, [dispatch, isAuthenticated, isUpdated, error])

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: updatePasswordSchema,
        onSubmit: (values, action) => {
               dispatch(updatePassword(values));
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
                    <h1>Change Password</h1>
                    <div className='text-input-parent'>
                        <label>Old Password</label>
                        <input type='password' name='oldPassword' placeholder='******' value={values.oldPassword} onChange={handleChange} onBlur={handleBlur} />
                        {errors.oldPassword && touched.oldPassword ? <p className='input-error'>{errors.oldPassword}</p> : null}
                    </div>
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

export default UpdatePassword;

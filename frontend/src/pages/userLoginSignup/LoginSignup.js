import React, { useState } from 'react';
import './loginsignup.css'
import Login from '../../components/login/Login'
import Signup from '../../components/signup/Signup'

const LoginSignup = () => {

    const [page, setPage] = useState('login');

    return (
        <div className='login-signup-parent'>
            <div>
                <div className='login-signup-topbar'>
                    <div style={{
                        backgroundColor: page === 'login' && 'tomato',
                        color: page === 'login' && 'white'
                    }}
                        onClick={() => setPage('login')}
                    >
                        Login
                    </div>
                    <div style={{
                        backgroundColor: page === 'signup' && 'tomato',
                        color: page === 'signup' && 'white'
                    }}
                        onClick={() => setPage('signup')}
                    >
                        Signup
                    </div>

                </div>
                <div className='login-signup-bottom'>
                    {
                        page === 'login' ?
                            <Login setPage={setPage} /> :
                            <Signup setPage={setPage} />
                    }

                </div>
            </div>

        </div>
    );
}

export default LoginSignup;

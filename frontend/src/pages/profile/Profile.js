import React from 'react';
import './profile.css'
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import profile from '../../images/Profile.png'


const Profile = () => {

    const { user, isAuthenticated } = useSelector(state => state.user);

    if (isAuthenticated === false) {
        return <Navigate to='/login-signup' />
    }

    return (
        <div className='profile-parent'>
            <div>
                <h2>My Profile</h2>
                <img src={user.avatar ? user.avatar.url : profile} />
                <Link to='/update-profile'>
                    <button>Edit Profile</button>
                </Link>
            </div>
            <div>
                <div>
                    <h3>Full Name</h3>
                    <p>{user.name}</p>

                </div>
                <div>
                    <h3>Email</h3>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h3>Joined On</h3>
                    <p>{user.createdAt?.substr(0, 10)}</p>

                </div>

                <div>
                    <button>My Orders</button>
                    <Link to='/update-password'>
                        <button>Change Password</button>
                    </Link>

                </div>

            </div>
        </div>
    );
}

export default Profile;

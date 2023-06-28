import { Dashboard, ExitToApp, ListAlt, Person } from '@mui/icons-material';
import { Backdrop, SpeedDial, SpeedDialAction} from '@mui/material';
import Profile from "../../images/Profile.png"
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './userOptions.css'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/userAction';



const UserOptions = ({user}) => {

    const [open, setOpen] = useState(false);
    const dispatch=useDispatch();

    const navigate=useNavigate()

    const handleOpen=()=>{
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const orders=()=>{
      navigate('/orders')
      setOpen(false)
    
    }


    const accounts = () => {
       navigate('/profile')
       setOpen(false)
    }

    const logout = () => {
        dispatch(logoutUser())
        setOpen(false)
    }

    const dashboard=()=>{
        navigate('/dashboard')
        setOpen(false)

    }


    const actions = [
        {
            icon: <ListAlt />,
            name: "Orders",
            func: orders
        },
        {
            icon: <Person />,
            name: "Profile",
            func: accounts
        },
        {
            icon: <ExitToApp />,
            name: "Logout",
            func: logout
        }
    ]

    if(user.role==='admin'){
        actions.unshift({
            icon: <Dashboard />,
            name: "Orders",
            func: dashboard
        })
    }
    return (
       <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial controlled open example"
                onClose={handleClose}
                onOpen={handleOpen}
                style={{ zIndex: "11" }}
                open={open}
                direction="down"
                className="speedDial"
                icon={<img
                    src={user.avatar?user.avatar.url:Profile}
                    className="speedDialIcon"
                />}
                
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.func}

                    />
                ))}
            </SpeedDial>
       </>
    );
}

export default UserOptions;

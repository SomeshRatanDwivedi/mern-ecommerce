import { CheckCircle} from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div className='success-parent'>
            
            <div className='cart-no-products'>
                <CheckCircle className='no-shopping-cart-icon' />
                <h2>Your order has been Placed successfully</h2>
                <Link to='/orders'>
                    <button>View Orders</button>
                </Link>

            </div>
            
        </div>
    );
}

export default Success;

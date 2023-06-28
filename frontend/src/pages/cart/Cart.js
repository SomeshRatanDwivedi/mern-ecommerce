import React from 'react';
import "./cart.css"
import { useDispatch, useSelector } from 'react-redux';
import CartItems from './CartItems';
import { RemoveShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';



const Cart = () => {
    const { cartItems } = useSelector(state => state.cart);

    return (
        <div className='cart-parent'>
        {
            cartItems && cartItems.length===0?
            <div className='cart-no-products'>
                 <RemoveShoppingCart className='no-shopping-cart-icon'/>
                <h2>No Products in Your Cart</h2>
                <Link to='/Products'>
                        <button>View Products</button>
                </Link>
                
            </div>:
            <>
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems && cartItems.map(product => {
                                        return <CartItems key={product.product} product={product} />
                                    })
                                }
                                <tr>
                                    <td>

                                    </td>
                                    <td>
                                        Gross Total
                                    </td>
                                    <td style={{ fontWeight: 600 }}>
                                        ₹
                                        {
                                            cartItems.reduce((a, b, i) => {
                                                if (i == 1) {
                                                    return a.quantity * a.price + b.quantity * b.price;
                                                }
                                                else {
                                                    return a + b.quantity * b.price;
                                                }
                                            })
                                        }
                                    </td>
                                </tr>

                            </tbody>
                           
                        </table>
                        <div className='cart-button-parent'>
                        <Link to='/shipping'>
                                <button className='product-details-right-btns'>Check Out</button>
                        </Link>
                           
                        </div>
            </>
            
        }
        
        </div>
    );
}

export default Cart;

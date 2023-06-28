import React, { useEffect } from 'react';
import './confirmOrder.css'
import CheckOutSteps from '../../components/checkOutSteps/CheckOutSteps';
import { useSelector } from 'react-redux';
import { State } from 'country-state-city';
import { useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const {isAuthenticated, user}=useSelector(state=>state.user);
    const state=State.getStatesOfCountry(shippingInfo.country).filter(state=>state.isoCode===shippingInfo.state)[0].name;

    const navigate=useNavigate();
    

    const subTotal = cartItems.reduce((prev, curr, index) => {
        if (index == 1) {
            return prev.quantity * prev.price + curr.quantity * curr.price;
        }
        return prev + curr.quantity * curr.price;
    });

    const shippingCharges = subTotal>=1000?0:200;

    const GST=(subTotal*18)/100;

    const totalPrice=subTotal+shippingCharges+GST;

    const proceedToPayment=()=>{
        const data = {
            subTotal,
            shippingCharges,
            GST,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        navigate("/process/payment");
    }


    useEffect(()=>{
        if(isAuthenticated===false){
            navigate('/login-signup')
        }
    }, [isAuthenticated])
    return (
        <div className='confirm-order-parent'>
            <CheckOutSteps activePage={1} />
            <div className='confirm-order-data-parent'>
                <div className='confirm-order-left-div'>
                    <div className='confirm-order-left-div-upper'>
                        <h2>Shipping Info</h2>
                        <div>
                            <p>
                                <span>Name:</span>
                                <span>{user?.name}</span>
                            </p>
                            <p>
                                <span>Phone:</span>
                                <span>{shippingInfo.phone}</span>
                            </p>
                            <p>
                                <span>Adress:</span>
                                <span>{shippingInfo.address}, {shippingInfo.city}, {state}, {shippingInfo.pin}, {shippingInfo.country}</span>
                            </p>
                        </div>


                    </div>
                    <div className='confirm-order-left-div-bottom'>
                        <h2>Your Cart Items:</h2>
                        <ul>
                            {
                                cartItems && cartItems.map((product) => {
                                    return (
                                        <li key={product.product}>
                                            <div>
                                                <img src={product.image.url} />
                                                <span>{product.name}</span>

                                            </div>
                                            <div>
                                                {product.quantity} * {product.price} = ₹{product.quantity * product.price}

                                            </div>
                                        </li>
                                    )
                                })
                            }

                        </ul>

                    </div>

                </div>
                <div className='confirm-order-right-div'>
                    <div>
                        <h2>Order Summery</h2>
                        <hr/>
                        <div>
                            <p>
                                <span>Subtotal:</span>
                                <span>
                                    {
                                        subTotal
                                    }
                                </span>
                            </p>
                            <p>
                                <span>Shipping Charges:</span>
                                <span>₹ {shippingCharges}</span>
                            </p>
                            <p>
                                <span>GST:</span>
                                <span>₹ {GST}</span>
                            </p>
                            <hr/>
                            <p>
                                <span>Total:</span>
                                <span>{totalPrice}</span>
                            </p>

                        </div>
                        <button onClick={proceedToPayment}>Proceed To Payment</button>


                    </div>
                </div>
            </div>


        </div>
    );
}

export default ConfirmOrder;

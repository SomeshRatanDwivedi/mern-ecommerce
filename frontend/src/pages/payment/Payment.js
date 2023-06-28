import React, { useRef } from 'react';
import './payment.css'
import CheckOutSteps from '../../components/checkOutSteps/CheckOutSteps';
import {CreditCard, Event, VpnKey } from '@mui/icons-material';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import makeConfig from '../../constants/apiConfig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrder } from '../../actions/orderAction';
import { API_ROOT } from '../../constants/api';

const Payment = () => {
    const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"));
    const payBtn=useRef(null);

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user, isAuthenicated } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subTotal,
        taxPrice: orderInfo.GST,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler=async(e)=>{
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = makeConfig(false)
            const { data } = await axios.post(
                `${ API_ROOT }/payment/process`,
                paymentData,
                config
            );
            console.log(data)

            const client_secret = data.data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pin,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;

                toast.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(order));

                    navigate("/success");
                } else {
                    toast.error("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            console.log(error)
            payBtn.current.disabled = false;
            // toast.error(error.response.data.message);
        }

    }
    return (
        <div className='payment-parent'>
           <CheckOutSteps activePage={2}/>
           <div className='payment-data-parent'>
             <form onSubmit={submitHandler}>
                    <h2>Card Info</h2>
                <div className='payment-form-div'>
                    <CreditCard style={{color:"gray"}}/>
                    <CardNumberElement className='card-detail-input'/>
                </div>
                <div className='payment-form-div'>
                    <Event style={{color:"gray"}}/>
                    <CardExpiryElement className='card-detail-input'/>
                </div>
                <div className='payment-form-div'>
                    <VpnKey style={{color:"gray"}}/>
                    <CardCvcElement className='card-detail-input'/>
                </div>
            
                    <button ref={payBtn} type='submit'>
                            Pay - ₹ {orderInfo.totalPrice}
                    </button>
                
             </form>
           </div>

            
        </div>
    );
}

export default Payment;

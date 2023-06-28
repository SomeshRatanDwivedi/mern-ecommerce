import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import Loader from '../../components/loader/Loader';
import './orderDetail.css'


const OrderDetails = () => {
    const dispatch=useDispatch();
    const {error, loading, orderDetails}=useSelector(state=>state.orderDetails);
    const { id } = useParams();

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        console.log(loading)
        dispatch(getOrderDetails(id));
    }, [dispatch,error,id]);


    if(loading){
        return <Loader/>
    }
   

   
    return (
        <div className='confirm-order-parent'>
            <div className='confirm-order-data-parent order-detail-confirm-order-data-parent'>
               <h1>Order id #{id}</h1>
                <div className='confirm-order-left-div order-detail-confirm-order-left-div'>
                    <div className='confirm-order-left-div-upper'>
                        <h2>Shipping Info</h2>
                        <div>
                            <p>
                                <span>Name:</span>
                                <span>{orderDetails.user?.name}</span>
                            </p>
                            <p>
                                <span>Phone:</span>
                                <span>{orderDetails?.shippingInfo?.phone}</span>
                            </p>
                            <p>
                                <span>Adress:</span>
                                <span>{orderDetails?.shippingInfo?.address}, {orderDetails?.shippingInfo?.city}, {orderDetails?.state}, {orderDetails?.shippingInfo?.pin}, {orderDetails?.shippingInfo?.country}</span>
                            </p>
                        </div>


                    </div>
                    <div className='confirm-order-left-div-bottom'>
                        <h2>Your Cart Items:</h2>
                        <ul>
                            {
                                orderDetails.orderItems && orderDetails.orderItems.map((product) => {
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
            </div>


        </div>
    );
}

export default OrderDetails;

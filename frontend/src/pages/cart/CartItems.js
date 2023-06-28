import React, { useState } from 'react';
import { imgSrc } from '../../constants/cartConstants';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../actions/cartAction';

const CartItems = ({product}) => {
    const { name, price, image, Stock, quantity } = product;
    const dispatch=useDispatch();


    const increaseProductCount = () => {
        const { Stock } = product;

        if (quantity >= Stock) {
            return toast.error("You cant add product more then the stock")
        }
        dispatch(addItemsToCart(product, quantity+1))
    }

    const decreaseProductCount = () => {

        if (quantity <= 0) {
            return toast.error("You can add minimum 0 product")
        }
        dispatch(addItemsToCart(product, quantity-1))
    }

    return (
        <tr>
            <td>
                <img src={image.url} />
                <div className='cart-product-info'>
                    <p>{name}</p>
                    <p>Price ₹{price}</p>
                    <p>Review</p>
                </div>
            </td>
            <td>
                <div className='product-details-btns'>
                    <span onClick={decreaseProductCount}>-</span>
                    <span>{quantity}</span>
                    <span onClick={increaseProductCount} className='plus'>+</span>
                </div>
            </td>
            <td>
                ₹ {quantity*price}
            </td>
        </tr>
    );
}

export default CartItems;

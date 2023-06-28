import React from 'react';
import './review.css'
import profile from '../../images/Profile.png'
import ReactStars from "react-rating-stars-component";
const Review = ({review}) => {
    const options = {
        value: review.rating,
        readOnly: true,
        isHalf: true
    };
    return (
        <div className='review'>
        <div>
                <img src={profile} className='no-profile-img' />
                <h3>{review.name}</h3>
                <div>
                    <ReactStars {...options} />
                </div>
                
        </div>
            
            <p>{review.comment}</p>





        </div>
    );
}

export default Review;

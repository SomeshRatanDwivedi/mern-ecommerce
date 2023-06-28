import React, { useEffect, useState } from 'react';
import './productdetails.css'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import ReactStars from "react-rating-stars-component";
import Review from '../../components/review/Review';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import { addItemsToCart, resetAddToCart } from '../../actions/cartAction';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';

const ProductDetails = () => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();
    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success } = useSelector(state => state.cart);
    const [productCount, setProductCount] = useState(1);

    const options = {
        value: product.ratings,
        readOnly: true,
        isHalf: true
    };
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Your product is added in cart");
            dispatch(resetAddToCart())
        }

        dispatch(getProductDetails(id))
    }, [dispatch, id, success])


    const increaseProductCount = () => {
        const { Stock } = product;
        console.log(Stock)

        if (productCount >= Stock) {
            return toast.error("You cant add product more then the stock")
        }
        setProductCount(productCount + 1)
    }

    const decreaseProductCount = () => {

        if (productCount <= 0) {
            return toast.error("You can add minimum 0 product")
        }
        setProductCount(productCount - 1)
    }


    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        // dispatch(newReview(myForm));
        console.log(myForm)

        setOpen(false);
    };



    if (loading) {
        return <Loader />
    }
    return (
        <>
            <div className='product-details'>
                <div className='product-details-left'>
                    <Carousel>
                        {
                            product.images &&
                            product.images.map((item, i) => {
                                return <img
                                    className='CarouselImage'
                                    key={item.url}
                                    src={item.url}
                                />

                            })
                        }
                    </Carousel>
                </div>
                <div className='product-details-right'>
                    <div className=' product-details-right-upper'>
                        <h3>{product.name}</h3>
                        <p className='small-paragraph'>Product # {id}</p>
                        <hr className='first-hr' />
                        <div>
                            <ReactStars {...options} />
                            <span className='number-of-reviews'>({product.numOfReviews} Reviews)</span>

                        </div>

                        <hr />

                    </div>

                    <div className=' product-details-right-mid'>
                        <h2>
                            {product.price}
                        </h2>

                        <div className='product-details-btns'>
                            <span onClick={decreaseProductCount}>-</span>
                            <span>{productCount}</span>
                            <span onClick={increaseProductCount} className='plus'>+</span>
                            <button className='product-details-right-btns' onClick={() => dispatch(addItemsToCart(product, productCount))}>Add to cart</button>
                        </div>
                        <hr />

                    </div>
                    <div className=' product-details-right-lower'>
                        <div className='product-details-right-status'>
                            <span>Status:</span>
                            <span style={{ color: product.Stock > 0 ? 'green' : 'red' }}>{product.Stock > 0 ? 'In stock' : 'Out of stock'}</span>

                        </div>
                        <hr />
                        <div>
                            <h4>Description:</h4>
                            <p className='small-paragraph'>This is a sample product</p>
                            <button onClick={submitReviewToggle} className='product-details-right-btns'>Submit Review</button>
                        </div>

                    </div>

                    <Dialog
                        open={open}
                        aria-labelledby="simple-dialog-title"
                        onClose={submitReviewToggle}
                        

                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className='submitDialog'>
                            <Rating
                                onChange={(e) => setRating(+e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>

                    </Dialog>


                </div>

            </div>

            <div className='reviews-parent'>
                <p className='review-heading'>REVIEWS</p>

                <div className='reviews'>
                    {
                        product && product.reviews ?
                            product.reviews.map(review => {
                                return <Review review={review} key={review._id} />
                            }) :
                            <h3 className='no-reviews'>No reviews</h3>
                    }

                </div>



            </div>
        </>

    );
}

export default ProductDetails;

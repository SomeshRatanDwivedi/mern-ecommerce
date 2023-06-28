import React, { useContext, useEffect } from 'react';
import { Mouse } from '@mui/icons-material';
import './home.css'
import ProductCard from './ProductCard';
import MetaData from '../../components/MetaData';
import { getProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { myContext } from '../../context';


const Home = () => {
    const dispatch=useDispatch();
    const {loading, error, products}=useSelector(
        (state)=>state.products
        )

    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(()=>{
       if(error){
        return toast.error(error)
       }
       dispatch(getProducts())
    }, [dispatch, error])

    if(!isAuthenticated){
        return <Navigate to='/login-signup'/>
    }

    return (
       <>
        {
            loading?<Loader/>:
                    <>
                        <MetaData title={'SASTASAMAN'} />
                        <div className="banner">
                            <p>Welcome to Ecommerce</p>
                            <h1>FIND AMAZING PRODUCTS BELOW</h1>

                            <a href="#container">
                                <button>
                                    Scroll <Mouse className='mouse' />
                                </button>
                            </a>
                        </div>
                        <h2 className="homeHeading">Featured Products</h2>

                        <div className="container" id="container">
                            {products &&
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                        </div>
                    </>
        }
       </>
    );
}

export default Home;

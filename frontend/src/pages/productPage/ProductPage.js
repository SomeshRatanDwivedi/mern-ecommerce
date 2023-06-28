import React, { useEffect, useState } from 'react';
import './productPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getProducts } from '../../actions/productAction';
import Loader from '../../components/loader/Loader';
import ProductCard from '../HomePage/ProductCard';
import Pagination from "react-js-pagination";
import Search from '../../components/searchBox/Search';
import { Slider } from '@mui/material';
import { Navigate } from 'react-router-dom';

const categories=[
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
]


const ProductPage = () => {

    const [activePage, setActivePage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [priceRange, setPriceRange]=useState([0, 25000]);
    const [category, setCategory]=useState('')




    const dispatch = useDispatch();
    const { products, loading, error,filteredProductsCount } = useSelector(state => state.products);

    const {isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProducts(activePage, searchKeyword, category, priceRange));
    }, [dispatch, error, activePage, searchKeyword, category, priceRange])


    const handlePageChange = (e) => {
        setActivePage(e)
    }

    const handleSearch = (keyword) => {
        setActivePage(1)
        setSearchKeyword(keyword.trim());
    }

    const handlepriceRangeChange=(event, newPriceRange)=>{
        setActivePage(1)
        setPriceRange(newPriceRange)

    }

    const handleCategoryChange=(newCategory)=>{
        setActivePage(1)
        setCategory(newCategory)

    }


    if (loading) {
        return <Loader />
    }

    if(!isAuthenticated){
        <Navigate to='/login-signup'/>
    }


    return (
        <div className='product-page-parent' >
            <Search handleSearch={handleSearch} />

            <h1>Products</h1>

            <div className='product-page-parent-div'>
                {
                    products.map(product => {
                        return <ProductCard key={product._id} product={product} />
                    })

                }
            </div>
            <div className='slider-parent'>
                <h3>Price</h3>

                <Slider
                    getAriaLabel={() => 'price Range'}
                    value={priceRange}
                    onChange={handlepriceRangeChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={25000}
                />

                <h3>Categories</h3>
                <ul className='categories'>
                    {
                        categories.map(catg => {
                            return (
                                <li style={{ color: category === catg && 'blue' }} key={catg} onClick={() =>handleCategoryChange(catg)}>
                                    {catg}
                                </li>
                            )
                        })
                    }
                </ul>

            </div>
            {
               

                     filteredProductsCount >8 &&
                    <div className='pagination-box'>
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={8}
                            totalItemsCount={filteredProductsCount}
                            pageRangeDisplayed={3}
                            prevPageText='Prev'
                            nextPageText='Next'
                            firstPageText='1st'
                            lastPageText='Last'
                            onChange={handlePageChange}

                        />

                    </div>
            }

        </div>
    );
}

export default ProductPage;

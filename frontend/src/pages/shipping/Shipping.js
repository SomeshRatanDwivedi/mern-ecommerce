import React, { useEffect, useState } from 'react';
import './shipping.css'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { BabyChangingStation, Home, LocationCity, Phone, PinDrop, Public } from '@mui/icons-material';
import { Country, State } from 'country-state-city'
import { toast } from 'react-toastify';
import { saveShippingInfo } from '../../actions/cartAction';
import CheckOutSteps from '../../components/checkOutSteps/CheckOutSteps';



const Shipping = () => {
    const { shippingInfo } = useSelector((state) => state.cart);


    const dispatch=useDispatch()
    const [country, setCountry] = useState(shippingInfo?.country ? shippingInfo?.country :"");
    const [state, setState] = useState(shippingInfo?.state ? shippingInfo?.state :"");
    const [address, setAdress] = useState(shippingInfo?.adress ? shippingInfo?.adress :"");
    const [city, setCity] = useState(shippingInfo?.city ? shippingInfo?.city :"");
    const [pin, setPin] = useState(shippingInfo?.pin ? shippingInfo?.pin :"");
    const [phone, setPhone] = useState(shippingInfo?.phone ? shippingInfo?.phone :"");
    const navigate=useNavigate();
   

    const { isAuthenticated, user } = useSelector(state => state.user);


    useEffect(() => {
        if (isAuthenticated === false) {
            <Navigate to='/login-signup' />
        }

    }, [isAuthenticated])


    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phone.length < 10 || phone.length > 10) {
            toast.error("Phone number is not correct")
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pin, phone })
        );
        setCountry('');
        setCity('');
        setState('');
        setAdress('');
        setPin('');
        setPhone('');
        toast.success("Your shipping details are saved");
        navigate('/order/confirm');
    };

    return (
        <div className='shipping-parent'>
            <h1>Shipping Details</h1>
            <CheckOutSteps activePage={0}/>
            <form onSubmit={shippingSubmit}>
                <div>
                    <Home className='shipping-icon-color' />
                    <input type='text' name='adresss' placeholder='Adress' value={address} onChange={(e)=>setAdress(e.target.value)} />
                </div>
                <div>
                    <LocationCity className='shipping-icon-color' />
                    <input type='text' name='city' placeholder='City' value={city} onChange={(e)=>setCity(e.target.value)} />
                </div>
                <div>
                    <PinDrop className='shipping-icon-color' />
                    <input type='number' name='pin' placeholder='Pin Code' value={pin} onChange={(e)=>setPin(e.target.value)} />
                </div>
                <div>
                    <Phone className='shipping-icon-color' />
                    <input type='number' maxLength='10' name='phone' placeholder='Phone number' value={phone} onChange={(e)=>setPhone(e.target.value)} />
                </div>
                <div>
                    <Public className='shipping-icon-color' />
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value=''>Country</option>
                        {
                            Country && Country.getAllCountries().map(country => {
                                return <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                            })
                        }
                    </select>
                </div>
                {
                    country && (

                        <div>
                            <BabyChangingStation className='shipping-icon-color' />
                                    <select
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    >
                                        <option value="">State</option>
                                        {
                                            State && State.getStatesOfCountry(country).map(ele => {
                                                return <option key={ele.isoCode} value={ele.isoCode}>{ele.name}</option>
                                            })
                                        }
                                    </select>

                        </div>
                    )
                }
                <div>
                    <button className='login-signup-btn' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Shipping;

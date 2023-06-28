import React from 'react';
import './footer.css'
import Appstore from '../../images/Appstore.png'
import playstore from '../../images/playstore.png'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer-parent'>
            <div className='footer-left'>
                  <h3>DOWNLOAD OUR APP</h3>

                  <p>Download app for Andoid and IOS mobile phone</p>

                  <img src={Appstore}/>
                 <img src={playstore} />
            </div>
            <div className='footer-mid'>
                  <h1>SASTASAMAN</h1>

                  <p>High Quality is our first priority.</p>
                  <p>Copyright 2023 @ sastasaman.com</p>
 
            </div>
            <div className='footer-right'>

              <h3>Follow Us</h3>
                <p className='footer-follow-links'>
               <Link>LinkedIn</Link>
                <Link>Facebook</Link>
                <Link>Youtube</Link>

                </p>

            </div>
        </div>
    );
}

export default Footer;

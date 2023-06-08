import React, { useState } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa';
//import  from '@mui/icons-material/Facebook';
import { FaArrowCircleUp } from 'react-icons/fa';
import './footer.css';

const headerImg = '../amazon.png';
export default function Footer() {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);
  return (
    <div>
      <div className="container footer-space mt-4">
        <Row>
          <Col md={3}>
            <Link to="/" onClick={scrollToTop}>
              <Navbar.Brand >
              <span className="brand-footer">
              Amazon{' '}
              <img className="img-logo" src={headerImg} alt={headerImg} /> Store
            </span>
              </Navbar.Brand>
            </Link>

            <div>
              <p>
                Make your business shine online with a custom Glossycode website
                designed just for you by a professional designer.
              </p>
            </div>
          </Col>
          <Col md={1}></Col>
          
          <Col md={2}>
            <h4 className="footer-title d-flex">Contact Us</h4>
            <div className="d-flex my-2 ">
              <i className="fa fa-location-arrow colorInfo p-2"></i>
              523C+68M, College of Science, Kerkuk St, Erbil, Iraqi Kurdistan
            </div>
            <div className="d-flex  my-2">
              <i className="fa fa-envelope colorInfo p-2 center"></i>
              info@glossycode.com
            </div>
            <div className="d-flex my-2">
              <i className="fa fa-phone colorInfo p-2"></i>
              00964 750 000 0000
            </div>
          </Col>
          <Col md={1}></Col>
          <Col md={2}>
          <h4 className="footer-title d-flex">Information</h4>
            <div className="d-flex my-2 ">
              {/* <i className="fa fa-location-arrow colorInfo p-2"></i> */}
             About Us
            </div>
            <div className="d-flex  my-2">
              {/* <i className="fa fa-envelope colorInfo p-2 center"></i> */}
              Contact Us
            </div>
            
          </Col>
          <Col md={1}></Col>
          <Col md={2}>
            <h4 className=" footer-title d-flex">Follow Us</h4>
            <div className="media-footer">
              <Link to="/">
                <FaFacebook className="media-footer" />
              </Link>
              <Link to="/">
                <FaInstagramSquare className="media-footer" />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
      <div className="scroll-button">
        <FaArrowCircleUp
          onClick={scrollToTop}
          style={{ display: visible ? 'inline' : 'none' }}
        />
      </div>
      <div className="row-footer">
        <div className="row-line  mt-5">
          <div className="footer-copy w-100">
            © 2022 Copyright: All rights reserved
          </div>
        </div>
      </div>
      {/* <div className="container">
        <div className="row footer-center">
          <div className="col-sm my-2">
            <div>
              <LinkContainer to="/">
                <Navbar.Brand className="footer-brand">
                  <span>
                    <img className="img-logo" src={headerImg} alt={headerImg} />
                  </span>
                </Navbar.Brand>
              </LinkContainer>
            </div>
            <div className="category-footer">
              <div className="d-flex my-2">
                <LocationOnOutlinedIcon />
                Erbil, Kirkuk Road, Kurdistan
              </div>
              <div className="d-flex my-2 ">
                <EmailOutlinedIcon />
                info@amazon.com
              </div>
              <div className="d-flex my-2">
                <PhoneIphoneOutlinedIcon />
                00964 750 000 0000
              </div>
            </div>
          </div>
          <div className="col-sm my-3">
            <h4>Infomation</h4>
            <div className="category-footer">
              <div className="my-2">About Us</div>
              <div className="my-2">Contact Us</div>
              <div className="my-2">Shipping & Delivery</div>
              <div className="my-2">Accessories</div>
            </div>
          </div>
          <div className="col-sm my-3">
            <h4>Useful links</h4>
            <div className="category-footer">
              <div className="my-2">My Account</div>
              <div className="my-2">Wishlist</div>
              <div className="my-2">Shopping Cart</div>
            </div>
          </div>
          <div className="col-sm my-3">
            <h4>Follow us</h4>
            <div>
              <FacebookOutlinedIcon className="media-footer" />
              <InstagramIcon className="media-footer" />
              <TwitterIcon className="media-footer" />
            </div>
            
          </div>
        </div>
      </div>
      <div className="text-center">© 2022 Copyright: All rights reserved</div> */}
    </div>
  );
}

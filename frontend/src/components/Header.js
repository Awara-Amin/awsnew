import React from 'react';
// import TextAnimation from './TextAnimation';
// import headerImg from '../images/bannermain.png';

export default function Header() {
  const headerImg = '../images/banner1.jpg';
  return (
    <div>
      <div className="imgHeader">
        <img
          className="bg-image d-flex w-100"
          src={headerImg}
          alt="banner"
        ></img>
        <div className="container">
          <div className="row">
            <div className="content d-wrap">
              <h6>{/* <TextAnimation /> */}</h6>
              <p>Amazon Bookstore</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/esm/Button';

export default function Slider() {
  return (
    
      <Carousel >
        <Carousel.Item>
          <img
            className="d-flex w-100 carousel"
            src="./images/banner1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 className="titlebanner">First slide label</h1>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <Button className="button-banner">SHOP NOW</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-flex w-100 carousel"
            src="./images/banner2.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h1 className="titlebanner">Second slide label</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Button className="button-banner">SHOP NOW</Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-flex w-100 carousel"
            src="./images/banner3.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h1 className="titlebanner">New Arrival Collection</h1>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
            <Button className="button-banner">View Collection</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    
  );
}

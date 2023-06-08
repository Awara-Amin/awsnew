import React from 'react';
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/esm/Button';
import { shades } from "../theme";

export default function Slider() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    
      <Carousel className="carousel">
        <Carousel.Item>
          <img
            className="d-flex w-100 carousel"
            src="./images/banner1.jpg"
            alt="First slide"
          />
          {/* <Carousel.Caption>
            <h1 className="titlebanner">First slide label</h1>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <Button className="button-banner">SHOP NOW</Button>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-flex w-100 carousel"
            src="./images/banner2.jpg"
            alt="Second slide"
          />

          {/* <Carousel.Caption>
            <h1 className="titlebanner">Second slide label</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Button className="button-banner">SHOP NOW</Button>
          </Carousel.Caption> */}
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-flex w-100 carousel"
            src="./images/banner3.jpg"
            alt="Third slide"
          />

<Box
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="left"
            backgroundColor="rgb(0, 0, 0, 0.4)"
            position="absolute"
            top="46%"
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "240px"}
          >
            <Typography color={shades.secondary[200]}>-- NEW ITEMS</Typography>
            <Typography variant="h1">Summer Sale</Typography>
            <Typography
              fontWeight="bold"
              color={shades.secondary[300]}
              sx={{ textDecoration: "underline" }}
            >
              Discover More
            </Typography>
          </Box>
        </Carousel.Item>
      </Carousel>
    
  );
}

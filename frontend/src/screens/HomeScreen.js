import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import Product from '../components/ProductCart/Product';
import Categories from '../components/Categories';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate, Link } from 'react-router-dom';
import MainCarousel from '../components/MainCarousel';
import Carousel from 'react-multi-carousel';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import 'react-multi-carousel/lib/styles.css';
import './HomeScreen.css';
import { socket } from '../App';
import ProductImage from '../components/ProductCart/ProductImage';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 6, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  //const [firstProducts, setFirstProducts] = useState(products.slice(0, 12));
  const firstProducts = products.slice(0, 12);
  const isNonMobile = useMediaQuery('(min-width:600px)');
  console.log(products);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
    socket.on('addProduct', (data) => {
      //setproducts(data.product)
      // const fetchData = async () => {
      //   dispatch({ type: 'FETCH_REQUEST' });
      //   try {
      //     const result = await axios.get('/api/products');
      //     dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      //   } catch (err) {
      //     dispatch({ type: 'FETCH_FAIL', payload: err.message });
      //   }
      // };
      // fetchData();
      toast(`Product Added ${data.name}`);
    });
  }, []);
  // socket.on('addProduct', (data) => {
  //   // const fetchData = async () => {
  //   //   dispatch({ type: 'FETCH_REQUEST' });
  //   //   try {
  //   //     const result = await axios.get('/api/products');
  //   //     dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
  //   //   } catch (err) {
  //   //     dispatch({ type: 'FETCH_FAIL', payload: err.message });
  //   //   }
  //   // };
  //   // fetchData();
  //   toast(`Product Added ${data.name}`);
  // });

  // useEffect(() => {
  //   socket.on('addProduct', (data) => {
  //     // const fetchData = async () => {
  //     //   dispatch({ type: 'FETCH_REQUEST' });
  //     //   try {
  //     //     const result = await axios.get('/api/products');
  //     //     dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
  //     //   } catch (err) {
  //     //     dispatch({ type: 'FETCH_FAIL', payload: err.message });
  //     //   }
  //     // };
  //     // fetchData();
  //     toast(`Product Added ${data.name}`);
  //   });

  //   // Clean up on unmount
  //   return () => {
  //     socket.off('addProduct');
  //   };
  // }, []);

  return (
    <div>
      {/* <Helmet>
     Ecommerce
      </Helmet> */}
      {/* <Header /> */}
      <MainCarousel />
      {/* <Slider /> */}
      <Categories />
      <div className="feature">
        <h2>Featured Products</h2>
      </div>
      <div className="container products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row className="list-products">
            {firstProducts.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={2} className="mb-0 p-1">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <div className="feature">
        <Link to={`/search`} style={{ textDecoration: 'none' }}>
          <h5>
            {' '}
            View All <KeyboardArrowRightIcon />{' '}
          </h5>
        </Link>

        {/* onSubmit={submitHandler} */}
      </div>

      <div className="container-fluid container-adv">
        <div className="row d-flex">
          <div className="col-md-6 ">
            <img
              src="./images/mainbanner.png"
              alt="./images/mainbanner.png"
              className="img-adv"
            ></img>
          </div>
          <div className="col-md-6 title-text">
            {/* <h3>Why People Choose Us?</h3> */}
            <h1>
              <strong> There is no friend as loyal as BOOK.</strong>
            </h1>

            <Button className="btn-primary ">SHOP NOW</Button>
          </div>
        </div>
      </div>
      <div className="feature">
        <h2>Best Seller</h2>
      </div>
      <div
        className="container"
        style={{
          // maxWidth: 1200,
          marginLeft: 'auto',
          marginRight: 'auto',
          // marginBottom: 64,
        }}
      >
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          // ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay={this.props.deviceType !== 'mobile' ? true : false}
          // autoPlaySpeed={1000}
          // centerMode={true}
          // focusOnSelect={true}
          keyBoardControl={true}
          customTransition="all .5"
          // transitionDuration={500}
          containerClass="carousel-container"
          // removeArrowOnDeviceType={['tablet', 'mobile']}
          // deviceType={this.props.deviceType}
          // dotListClass="custom-dot-list-style"
          // itemClass="carousel-item-padding-40-px"
        >
          {firstProducts.map((product) => (
            <div key={product.slug} className="carousel-products">
              <Product product={product}></Product>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="bgabout-image">
        <Container className="d-flex">
          <Row>
            <Col sm={6}></Col>
            <Col sm={6}>
              <div className="agency-right container-fluid">
                <h1 className="text-justify">
                  <strong>
                    “A reader lives a thousand lives before he dies. The man who
                    never reads lives only one.”
                  </strong>
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="feature">
        <h2>New Arrivals</h2>
      </div>
      <div
        className="container"
        style={{
          // maxWidth: 1200,
          marginLeft: 'auto',
          marginRight: 'auto',
          // marginBottom: 64,
        }}
      >
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay={props.deviceType !== 'mobile' ? true : false}
          // autoPlaySpeed={500}
          // centerMode={true}
          focusOnSelect={true}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          // containerClass="carousel-container"
          // removeArrowOnDeviceType={['tablet', 'mobile']}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {firstProducts.map((product) => (
            <div key={product.slug} className="carousel-products-image">
              <ProductImage product={product}></ProductImage>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="container container-adv-img">
        <div className="row d-flex">
          <div className="col-md-3 ">
            <img
              src="./images/s1.jpg"
              alt="./images/mainbanner.png"
              className="img-container-adv"
            ></img>
          </div>
          <div className="col-md-3 ">
            <img
              src="./images/s2.jpg"
              alt="./images/mainbanner.png"
              className="img-container-adv"
            ></img>
          </div>
          <div className="col-md-3 ">
            <img
              src="./images/s3.jpg"
              alt="./images/mainbanner.png"
              className="img-container-adv"
            ></img>
          </div>
          <div className="col-md-3 ">
            <img
              src="./images/s4.jpg"
              alt="./images/mainbanner.png"
              className="img-container-adv"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeScreen;

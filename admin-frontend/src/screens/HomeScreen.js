import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';

import Sidebar from '../components/sidebar/Sidebar';

import './home/home.scss';

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

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
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
  }, []);
  return (
    // <div className="home">
    <Container>
      {/* <Helmet>Ecommerce</Helmet> */}
      {/* <Slider /> */}
      {/* <Sidebar /> */}
      <Row>
        <Col sm={8}>
          <Categories />
        </Col>
        <Col sm={8}>
          <div className="feature">
            <h2>Featured Products</h2>
          </div>
        </Col>
        <Col sm={8}>
          <div className="container products">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <Row>
                {products.map((product) => (
                  <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Col>

        <div className="container-fluid container-adv">
          <div className="row d-flex">
            <div className="col-md-4 ">
              <img
                src="./images/b1.png"
                alt="./images/b1.png"
                className="img-adv"
              ></img>
            </div>
            <div className="col-md-4 title-text">
              <h3>Why People Choose Us?</h3>
              <h1>
                <strong> Go ahead, Try One!</strong>
              </h1>
              <p>
                We are always willing to make our customers happy and are ready
                to support your most bold and creative ideas in hairstyle.
              </p>
              <Button className="button-banner-category ">SHOP NOW</Button>
            </div>
            <div className="col-md-4">Column three</div>
          </div>
        </div>
      </Row>
    </Container>
  );
}
export default HomeScreen;

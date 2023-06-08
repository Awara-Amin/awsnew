import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-multi-carousel';

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
export default function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="box-category">
      <div className="feature">
        <h2>Sell by categories</h2>
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
          //  showDots={true}
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
          //  dotListClass="custom-dot-list-style"
          //  itemClass="carousel-item-padding-40-px"
        >
          {/* {categories.map((category) => ( */}
          <Col className="w-100 p-1">
            <div className="item-category">
              <img className="img-category" src="./images/bl1.jpg" alt=""></img>
              {/* <div className="box-content-category">
                  <h3 className="title-category">{category}</h3>
                </div> */}
              <div className="box-content-category">
                <Link
                  className="button-banner-category"
                   to={`/search?category`}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </Col>
          <Col className="w-100 p-1">
            <div className="item-category">
              <img className="img-category" src="./images/c2.jpg" alt=""></img>
              {/* <div className="box-content-category">
                  <h3 className="title-category">{category}</h3>
                </div> */}
              <div className="box-content-category">
                <Link
                  className="button-banner-category"
                  to={`/search?category`}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </Col>
          <Col className="w-100 p-1">
            <div className="item-category">
              <img className="img-category" src="./images/art.jpg" alt=""></img>
              {/* <div className="box-content-category">
                  <h3 className="title-category">{category}</h3>
                </div> */}
              <div className="box-content-category">
                <Link
                  className="button-banner-category"
                  to={`/search?category`}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </Col>
          <Col className="w-100 p-1">
            <div className="item-category">
              <img
                className="img-category"
                src="./images/music.jpg"
                alt=""
              ></img>
              {/* <div className="box-content-category">
                  <h3 className="title-category">{category}</h3>
                </div> */}
              <div className="box-content-category">
                <Link
                  className="button-banner-category"
                  to={`/search?category`}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </Col>
          <Col className="w-100 p-1">
            <div className="item-category">
              <img
                className="img-category"
                src="./images/history.jpg"
                alt=""
              ></img>
              {/* <div className="box-content-category">
                  <h3 className="title-category">{category}</h3>
                </div> */}
              <div className="box-content-category">
                <Link
                  className="button-banner-category"
                  to={`/search?category`}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </Col>
          <Col className="w-100 p-1">
            <div className="item-category">
              <img
                className="img-category"
                src="./images/english.jpg"
                alt=""
              ></img>
              {/* <div className="box-content-category">
                  <h3 className="title-category">{category}</h3>
                </div> */}
              <div className="box-content-category">
                <Link
                  className="button-banner-category"
                  to={`/search?category`}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </Col>

          {/* ))} */}
        </Carousel>
      </div>
      {/* <Row className="category">
        <div className="feature">
          <h2>Categories</h2>
        </div>
        {categories.map((category) => (
          <Col key={category} sm={6} md={4} lg={2} className="h-100">
            <div className="box-category">
              <img className="img-category" src="./images/bl1.jpg" alt=""></img>
              <div className="box-content-category">
                <h3 className="title-category">{category}</h3>
              </div>
              <div className="box-content-category">
                <Link
                  className="button-banner-category"
                  to={`/search?category=${category}`}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </Col>
        ))}
      </Row> */}
    </div>
    // <div className="category container">
    //   <div className="row ">
    //     {categories.map((category) => (
    //       <div key={category} className="col-lg-2 col-md-4 col-sm-6">
    //         <div className="box-category">
    //           <img className="img-category" src="./images/bl1.jpg" alt=""></img>
    //           <div className="box-content-category">
    //             <h3 className="title-category">{category}</h3>
    //             <Link
    //               className="button-banner-category"
    //               to={`/search?category=${category}`}
    //             >
    //               SHOP NOW
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //     {/* <div className="col-md-2 col-sm-4">
    //       <div className="box-category">
    //       <img className="img-category" src="./images/c2.jpg" alt=""></img>
    //       <div className="box-content-category">
    //             <h3 className="title-category">Science</h3>
    //             <Link
    //               className="button-banner-category"
    //               to={`/`}
    //             >
    //               SHOP NOW
    //             </Link>
    //           </div>
    //       </div>
    //     </div>
    //     <div className="col-md-2 col-sm-4">
    //       <div className="box-category">
    //       <img className="img-category" src="./images/c2.jpg" alt=""></img>
    //       <div className="box-content-category">
    //             <h3 className="title-category">Science</h3>
    //             <Link
    //               className="button-banner-category"
    //               to={`/`}
    //             >
    //               SHOP NOW
    //             </Link>
    //           </div>
    //       </div>
    //     </div>
    //     <div className="col-md-2 col-sm-4">
    //       <div className="box-category">
    //       <img className="img-category" src="./images/c2.jpg" alt=""></img>
    //       <div className="box-content-category">
    //             <h3 className="title-category">Science</h3>
    //             <Link
    //               className="button-banner-category"
    //               to={`/`}
    //             >
    //               SHOP NOW
    //             </Link>
    //           </div>
    //       </div>
    //     </div>
    //     <div className="col-md-2 col-sm-4">
    //       <div className="box-category">
    //       <img className="img-category" src="./images/c2.jpg" alt=""></img>
    //       <div className="box-content-category">
    //             <h3 className="title-category">Science</h3>
    //             <Link
    //               className="button-banner-category"
    //               to={`/`}
    //             >
    //               SHOP NOW
    //             </Link>
    //           </div>
    //       </div>
    //     </div>
    //     <div className="col-md-2 col-sm-4">
    //       <div className="box-category">
    //       <img className="img-category" src="./images/c2.jpg" alt=""></img>
    //       <div className="box-content-category">
    //             <h3 className="title-category">Science</h3>
    //             <Link
    //               className="button-banner-category"
    //               to={`/`}
    //             >
    //               SHOP NOW
    //             </Link>
    //           </div>
    //       </div>
    //     </div> */}
    //      {/*<div className="col-md-3 col-sm-4">
    //       <div className="box-category">
    //         <img className="img-category" src="./images/pl1.jpg" alt=""></img>
    //         <div className="box-content-category">
    //           <h3 className="title-category">Miranda Roy</h3>
    //           <Button className="button-banner-category ">SHOP NOW</Button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-md-3 col-sm-4">
    //       <div className="box-category">
    //         <img className="img-category" src="./images/j1.jpg" alt=""></img>
    //         <div className="box-content-category">
    //           <h3 className="title-category">Miranda Roy</h3>
    //           <Button className="button-banner-category ">SHOP NOW</Button>
    //         </div>
    //       </div>
    //     </div> */}
    //   </div>
    // </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";

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
    <div className="category container">
      <div className="row">
        {categories.map((category) => (
          <div key={category} className="col-md-3 col-sm-4">
            <div className="box-category">
              <img className="img-category" src="./images/bl1.jpg" alt=""></img>
              <div className="box-content-category">
                <h3 className="title-category">{category}</h3>
                <Link
                  className="button-banner-category"
                  // to={`/search?category=${category}`}
                  to={`/searchcategory=${category}`}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* <div className="col-md-3 col-sm-4">
          <div className="box-category">
            <img className="img-category" src="./images/n1.jpg" alt=""></img>
            <div className="box-content-category">
              <h3 className="title-category">Miranda Roy</h3>
              <Button className="button-banner-category ">SHOP NOW</Button>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-4">
          <div className="box-category">
            <img className="img-category" src="./images/pl1.jpg" alt=""></img>
            <div className="box-content-category">
              <h3 className="title-category">Miranda Roy</h3>
              <Button className="button-banner-category ">SHOP NOW</Button>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-4">
          <div className="box-category">
            <img className="img-category" src="./images/j1.jpg" alt=""></img>
            <div className="box-content-category">
              <h3 className="title-category">Miranda Roy</h3>
              <Button className="button-banner-category ">SHOP NOW</Button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

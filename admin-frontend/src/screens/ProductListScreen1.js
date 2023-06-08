import React, { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { Store } from "../Store";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  // Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import FormControl from "react-bootstrap/FormControl";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Search from "@mui/icons-material/Search";
import CloseIcon from "@material-ui/icons/Close";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function ProductListScreen() {
  const [
    {
      loading,
      error,
      products,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  // search part
  const [query, setquery] = useState();
  const [focus, setFocus] = useState();
  const [productsInitial, setProductsInitial] = useState([]);
  const [searchedProduct, setSearchedProduct] = useState([]);
  console.log("searchForProducts inside productListScreen 55");
  console.log(searchedProduct);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {}
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm("Are you sure to create?")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          "/api/products",
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success("product created successfully");
        dispatch({ type: "CREATE_SUCCESS" });
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    }
  };

  const deleteHandler = async (product) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("product deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  useEffect(() => {
    setSearchedProduct(products);
    return () => {
      setFocus();
    };
  }, [products]);

  const handleChange = (e) => {
    console.log("searchForProducts inside productListScreen 44");
    console.log(searchedProduct);

    setquery(e.target.value);
    const filteredData = searchedProduct.filter(
      (item) => {
        if (e.target.value === "") return searchedProduct;
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
      }
      //   item.name.toLowerCase().includes(query)
    );
    setProductsInitial(filteredData);
  };
  // useEffect(() => {
  //   console.log("searchForProducts inside productListScreen 44");
  //   // searchForProducts(productsSearch);
  //   setProductsInitial(products);
  //   // setProductsSearch(products);
  //   // console.log(productsSearch);
  // }, [query]);

  // useEffect(() => {
  //   // console.log("searchForProducts inside productListScreen 77");
  //   // setProductsSearch(products);

  //   // searchForProducts(productsSearch);
  //   const searchForProducts = (any) => {
  //     // console.log("searchForProducts inside productListScreen 22");
  //     // console.log(searchedProduct);
  //     // console.log("searchForProducts inside productListScreen 33");
  //     // console.log(any);
  //     const filteredData = any.filter((item) =>
  //       item.name.toLowerCase().includes(query)
  //     );
  //     // var filterdData = "";
  //     // if (any) {
  //     //   console.log("searchForProducts inside productListScreen 88");
  //     //   console.log(any);
  //     //   filterdData = any.filter((item) =>
  //     //     item.name.toLowerCase().includes(query)
  //     //   );
  //     // } else {
  //     //   filterdData = any;
  //     // }

  //     return setSearchedProduct(filteredData);
  //   };
  //   searchForProducts(searchedProduct);

  //   return () => {
  //     setSearchedProduct(productsInitial);
  //     // setQuery();
  //   };
  // }, [query]);

  // const searchForProducts = (any) => {
  //   console.log("searchForProducts inside productListScreen 22");
  //   console.log(productsSearch);
  //   console.log("searchForProducts inside productListScreen 33");
  //   console.log(any);
  //   const data = any.filter((item) => item.name.toLowerCase().includes(query));
  //   // var filterdData = "";
  //   // if (any) {
  //   //   console.log("searchForProducts inside productListScreen 88");
  //   //   console.log(any);
  //   //   filterdData = any.filter((item) =>
  //   //     item.name.toLowerCase().includes(query)
  //   //   );
  //   // } else {
  //   //   filterdData = any;
  //   // }

  //   setProductsSearch(data);
  // };
  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };
  console.log("inside productListScreen---1");
  console.log(products);
  console.log("inside productListScreen---11");
  console.log(query);
  console.log("inside productListScreen---111");
  console.log(productsInitial);
  return (
    // <div className="container">
    <Box m="1.5rem 2.5rem">
      <Helmet>
        <title>Products</title>
      </Helmet>
      <h1 className="mt-3">Products</h1>
      <Row>
        <Col>
          {/* <div className=""> */}
          {/* <Form onSubmit={submitHandler}> */}
          <Form>
            <InputGroup>
              <FormControl
                type="text"
                name="q"
                id="q"
                className="search-bar"
                value={query}
                // onChange={(e) => setQuery(e.target.value)}
                onChange={handleChange}
                placeholder="search products..."
                aria-label="Search Products"
                aria-describedby="button-search"
                onFocus={openList}
              ></FormControl>
              {focus === true ? (
                <Button
                  className="search-btn"
                  variant="outline-primary"
                  type="submit"
                  id="button-search"
                  onPress={onBlur}
                >
                  <CloseIcon />
                </Button>
              ) : null}

              <Button
                className="search-btn"
                variant="outline-primary"
                type="submit"
                id="button-search"
                onPress={openList}
              >
                <Search />
              </Button>
            </InputGroup>
          </Form>
          {/* </div> */}
          {/* <h1 className="mt-3">Products</h1> */}
        </Col>
        <Col className="col text-end">
          <div className="mt-3">
            <Button type="button" onClick={createHandler}>
              Create Product
            </Button>
          </div>
        </Col>
      </Row>

      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {/* <table className="table"> */}
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                {/* <th>ID</th> */}
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                {/* <th>BRAND</th> */}
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {query
                ? productsInitial.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}.</td>
                      {/* <td>{product._id}</td> */}
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      {/* <td>{product.brand}</td> */}
                      <td>
                        <Button
                          style={{ width: 70 }}
                          type="button"
                          // variant="light"
                          variant="outline-secondary"
                          size="sm"
                          onClick={() =>
                            navigate(`/admin/product/${product._id}`)
                          }
                        >
                          Edit
                        </Button>
                        &nbsp;
                        <Button
                          style={{ width: 70 }}
                          type="button"
                          // variant="light"
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteHandler(product)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                : products.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}.</td>
                      {/* <td>{product._id}</td> */}
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      {/* <td>{product.brand}</td> */}
                      <td>
                        <Button
                          style={{ width: 70 }}
                          type="button"
                          // variant="light"
                          variant="outline-secondary"
                          size="sm"
                          onClick={() =>
                            navigate(`/admin/product/${product._id}`)
                          }
                        >
                          Edit
                        </Button>
                        &nbsp;
                        <Button
                          style={{ width: 70 }}
                          type="button"
                          // variant="light"
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteHandler(product)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              {/* {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}.</td>
                  
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  
                  <td>
                    <Button
                      style={{ width: 70 }}
                      type="button"
                      
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      style={{ width: 70 }}
                      type="button"
                      
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))} */}
            </tbody>
            {/* </table> */}
          </Table>

          <div className="text-center">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? "btn text-bold" : "btn"}
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </Box>
  );
}

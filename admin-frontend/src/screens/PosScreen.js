import React, { useEffect, useRef, useState, useReducer } from 'react';
import MainLayout from '../layouts/MainLayout';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';

import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Search from '@mui/icons-material/Search';
import CloseIcon from '@material-ui/icons/Close';
import { Box } from '@mui/material';

import './posScreen.css';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

function PosScreen() {
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalSub, setTotalSub] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const discount = 10;

  const [categories, setCategories] = useState([]);
  const [initialState, setInitialState] = useState([]);

  const [active, setActive] = useState();

  // search part
  const [query, setQuery] = useState('');
  const [manualDiscount, setManualDiscount] = useState('');
  // const [searchedData, setSearchedData] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [productsSearch, setProductsSearch] = useState([]);
  const [focus, setFocus] = useState();

  const [fullName, setFullName] = useState('add name');
  const [address, setAddress] = useState('add address');
  const [city, setCity] = useState('add city name');
  const [country, setCountry] = useState('add country name');
  const [postalCode, setPostalCode] = useState('444');
  // const [shippingAddress1, setShippingAddress1] = useState("not exist" || "");
  const [shippingAddress1, setShippingAddress1] = useState('');

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { cart } = state;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { pos, userInfo, holding } = state;
  const {
    holding: { holdingItems },
  } = state;
  // const {
  //   pos: { shippingAddress },
  // } = state;
  // console.log("pos-1 one");
  // console.log(pos);
  // console.log("pos-1 one-1");
  // console.log(pos.posItems);
  // console.log("holding-1 arrrived again");
  // console.log(holdingItems);

  const {
    moveBackholding: { moveBackholdingItems },
  } = state;

  const kkk = () => {
    moveBackholdingItems.map((i) => console.log(i));
  };
  console.log('movebackholdingItems-1ppppp arrrived from move back again');
  kkk();

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    setFocus(false);
    const result = await axios.get(`/api/products`);
    console.log(result.data);
    setProducts(await result.data);
    setInitialState(await result.data);
    setProductsCtg(await result.data);
    setProductsSearch(await result.data);
    setIsLoading(false);
  };

  const addToCartHandler = async (item) => {
    // const existItem = cart.cartItems.find((x) => x._id === item._id);
    const existItem = pos.posItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      // window.alert('Sorry. Product is out of stock');
      toast(`Product is out of stock`, toastOptions);
      return;
    }
    ctxDispatch({
      type: 'POS_ADD_ITEM',
      payload: { ...item, quantity },
    });
    toast(`Added ${item.name} to pos`, toastOptions);
  };

  // const addProductToCart = async (product) => {
  //   // check if the adding product exist
  //   let findProductInCart = await cart.find((i) => {
  //     return i.id === product.id;
  //   });

  //   if (findProductInCart) {
  //     let newCart = [];
  //     let newItem;

  //     cart.forEach((cartItem) => {
  //       if (cartItem.id === product.id) {
  //         newItem = {
  //           ...cartItem,
  //           quantity: cartItem.quantity + 1,
  //           totalAmount: cartItem.price * (cartItem.quantity + 1),
  //         };
  //         newCart.push(newItem);
  //       } else {
  //         newCart.push(cartItem);
  //       }
  //     });

  //     setCart(newCart);
  //     toast(`Added ${newItem.name} to cart`, toastOptions);
  //   } else {
  //     let addingProduct = {
  //       ...product,
  //       quantity: 1,
  //       totalAmount: product.price,
  //     };
  //     setCart([...cart, addingProduct]);
  //     toast(`Added ${product.name} to cart`, toastOptions);
  //   }
  // };

  // const removeProduct = async (product) => {
  //   const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
  //   setCart(newCart);
  // };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'POS_REMOVE_ITEM', payload: item });
    // ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  useEffect(() => {
    fetchProducts();

    return () => {
      setFocus();
    };
  }, []);

  useEffect(() => {
    let newTotalAmount = 0;
    // cart.cartItems.forEach((icart) => {
    // newTotalAmount = cart.cartItems.reduce(
    newTotalAmount = pos.posItems.reduce((a, c) => a + c.price * c.quantity, 0);
    //console.log(icart);
    setTotalAmount(newTotalAmount);
  }, [pos]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(err);
      }
    };
    fetchCategories();
  }, []);
  console.log('categories 2222222');
  console.log(categories);
  console.log(products);
  console.log('query 3333333');
  console.log(query);
  // const changeCtg = (ctg) => {
  //   if (ctg === "all") {
  //     setProductsCtg(initialState);
  //     setActive(true);
  //   } else
  //     setProductsCtg(
  //       products.filter((i) => i.category._id === ctg),
  //       setActive(true)
  //     );
  // };

  const filterResult = (anyCat) => {
    console.log('anyCat');
    console.log(anyCat);
    // setQuery();
    // setProducts(products);
    const result = productsCtg.filter((currentProduct) => {
      return currentProduct.category === anyCat;
    });
    // setProducts();
    setProductsCtg(result);
  };

  //
  // useEffect(() => {
  //   console.log("test1");
  //   products.filter((eachProduct) => console.log(eachProduct.name));
  //   // console.log(eachProduct);
  // }, [products]);

  useEffect(() => {
    search(productsSearch);
  }, [query]);

  const search = (any) => {
    const data = any.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query)
    );
    return setProductsSearch(data);
  };

  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      // type: "CART_ADD_ITEM",
      type: 'POS_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      // type: "SAVE_SHIPPING_ADDRESS",
      type: 'SAVE_SHIPPING_ADDRESS_POS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
        // location: shippingAddress.location,
        location: shippingAddress1,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
        // location: shippingAddress.location,
        location: shippingAddress1,
      })
    );

    // navigate("/payment");
  };
  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        '/api/orders',
        {
          // orderItems: cart.cartItems,
          orderItems: pos.posItems,
          shippingAddress: pos.shippingAddress,
          // shippingAddress: address,
          // paymentMethod: pos.paymentMethod,
          paymentMethod: 'from pos part',
          // itemsPrice: pos.itemsPrice,
          itemsPrice: totalAmount,
          // shippingPrice: pos.shippingPrice,
          shippingPrice: 0,
          // taxPrice: pos.taxPrice,
          taxPrice: 0,
          // totalPrice: pos.totalPrice,
          totalPrice: manualDiscount
            ? pos.posItems.reduce((a, c) => a + c.price * c.quantity, 0) -
              (pos.posItems.reduce((a, c) => a + c.price * c.quantity, 0) *
                manualDiscount) /
                100
            : totalAmount,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'POS_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('posItems');
      // navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  const addToHoldingHandler = async (item) => {
    // const favexistItem = favorite.favoriteItems.find(
    //   (x) => x._id === product._id
    // );
    // const quantity = favexistItem ? favexistItem.quantity : 1;
    // const { data } = await axios.get(`/api/products/${item._id}`);
    // if (data.countInStock < quantity) {
    //   window.alert('Sorry. Product is out of stock');
    //   return;
    // }
    ctxDispatch({
      // type: "FAV_ADD_ITEM",
      type: 'HOL_ADD_ITEM',
      // payload: { ...item, quantity },
      payload: { ...item },
    });
  };
  return (
    <Box m="1.5rem 1rem">
      <Helmet>
        <title>Point Of Sell</title>
      </Helmet>
      <h4 className="ml-20">Point Of Sell</h4>

      {/* <div>
          <input
            type="text"
            placeholder="Search for products"
            className="search"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div> */}
      <div className="row sides">
        <div className="col-lg-7">
          {/* <div className="search-bar w-80"> */}
          <div className="row">
            {/* <Form onSubmit={submitHandler}> */}
            <Form>
              <InputGroup>
                <FormControl
                  type="text"
                  name="q"
                  id="q"
                  className="search-bar"
                  onChange={(e) => setQuery(e.target.value)}
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
          </div>
          <div className="containerPOS">
            {categories.map((eachCat, index) => (
              <div key={index}>
                <button
                  className="btn btn-warning m-1"
                  onClick={() => {
                    filterResult(eachCat);
                  }}
                >
                  {eachCat}
                </button>
              </div>
            ))}
          </div>
          {isLoading ? (
            'Loading'
          ) : query ? (
            <div className="row scrollable-div">
              {productsSearch.map((product, key) => (
                <div key={key} className="col-lg-2 mb-2 mt-2">
                  <div
                    className="pos-item  text-center justify-content border"
                    onClick={() => addToCartHandler(product)}
                  >
                    <img
                      src={product.image}
                      className="img-fluid"
                      alt={product.name}
                    />
                    <div style={{ fontSize: 10, marginTop: '10px' }}>
                      {product.name}
                    </div>
                    <div style={{ fontSize: 12, marginBottom: '5px' }}>
                      ${product.price}
                    </div>
                  </div>
                </div>
                // <div key={key} className="col-lg-2 mb-2 mt-2">
                //   <div
                //     className="pos-item  text-center border"
                //     onClick={() => addToCartHandler(product)}
                //   >
                //     <img src={product.image} alt={product.name} />
                //     <p
                //       className="mt-2"
                //       style={{ fontSize: 10, marginTop: '2px' }}
                //     >
                //       {product.name}
                //     </p>
                //     <p>${product.price}</p>
                //   </div>
                // </div>
              ))}
            </div>
          ) : (
            <div className="row scrollable-div">
              {productsCtg.map((product, key) => (
                <div key={key} className="col-lg-2 mb-2 mt-2">
                  <div
                    className="pos-item  text-center justify-content border"
                    onClick={() => addToCartHandler(product)}
                  >
                    <img
                      src={product.image}
                      className="img-fluid"
                      alt={product.name}
                    />
                    <div style={{ fontSize: 10, marginTop: '10px' }}>
                      {product.name}
                    </div>
                    <div style={{ fontSize: 12, marginBottom: '5px' }}>
                      ${product.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-lg-5">
          <div style={{ display: 'none' }}>
            <ComponentToPrint
              // cart={cart.cartItems}
              cart={pos.posItems}
              totalAmount={totalAmount}
              ref={componentRef}
            />
          </div>
          <div className="table-responsive bg-light">
            <table className="table table-responsive table-light table-hover">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td className="text-center ">Qty</td>
                  <td>Total</td>
                  <td>Action</td>
                  <td>Hold</td>
                </tr>
              </thead>
              <tbody>
                {/* {cart.cartItems */}
                {pos.posItems
                  ? // ? cart.cartItems.map((cartProduct, key) => (
                    pos.posItems.map((posProduct, key) => (
                      <tr key={key}>
                        <td className="pt-3">{posProduct.id}</td>
                        <td className="pt-3">{posProduct.name}</td>
                        <td className="pt-3">{posProduct.price}</td>
                        <td>
                          <div
                            className="input-group "
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <Button
                              className="p-1 m-0"
                              bsSize="sm"
                              variant="dark"
                              disabled={posProduct.quantity === 1}
                              // className="m-1"
                              onClick={() =>
                                updateCartHandler(
                                  posProduct,
                                  posProduct.quantity - 1
                                )
                              }
                            >
                              <i className="fas fa-minus-circle"></i>
                            </Button>
                            <span className="p-2 m-1">
                              {' '}
                              {posProduct.quantity}
                            </span>
                            <Button
                              className="p-1 m-0"
                              bsSize="sm"
                              variant="dark"
                              disabled={
                                posProduct.quantity === posProduct.countInStock
                              }
                              // className="m-1"
                              onClick={() =>
                                updateCartHandler(
                                  posProduct,
                                  posProduct.quantity + 1
                                )
                              }
                            >
                              <i className="fas fa-plus-circle"></i>
                            </Button>
                          </div>
                        </td>
                        <td className="pt-3">
                          {posProduct.price * posProduct.quantity}
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeItemHandler(posProduct)}
                          >
                            Remove
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            // onClick={() => addToHoldingHandler(posProduct)}
                            // onClick={() => addToHoldingHandler(pos.posItems)}
                          >
                            Hold
                          </button>
                        </td>
                      </tr>
                    ))
                  : moveBackholdingItems.map((x, key) => (
                      <tr key={key}>
                        <td className="pt-3">{x.id}</td>
                        <td className="pt-3">{x.name}</td>
                        <td className="pt-3">{x.price}</td>
                        <td>
                          <div
                            className="input-group "
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <Button
                              className="p-1 m-0"
                              bsSize="sm"
                              variant="dark"
                              disabled={x.quantity === 1}
                              onClick={() =>
                                updateCartHandler(x, x.quantity - 1)
                              }
                            >
                              <i className="fas fa-minus-circle"></i>
                            </Button>
                            <span className="p-2 m-1"> {x.quantity}</span>
                            <Button
                              className="p-1 m-0"
                              bsSize="sm"
                              variant="dark"
                              disabled={x.quantity === x.countInStock}
                              onClick={() =>
                                updateCartHandler(x, x.quantity + 1)
                              }
                            >
                              <i className="fas fa-plus-circle"></i>
                            </Button>
                          </div>
                        </td>
                        <td className="pt-3">{x.price * x.quantity}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeItemHandler(x)}
                          >
                            Remove
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            // onClick={() => addToHoldingHandler(x)}
                            // onClick={() => addToHoldingHandler(pos.posItems)}
                          >
                            Hold
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
            <h5 className="px-2 text-black">
              Total Amount: $
              {/* {cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} */}
              {pos.posItems.reduce((a, c) => a + c.price * c.quantity, 0)}
            </h5>
            <div className="">
              {/* <Form onSubmit={submitHandler}> */}
              <h2>Manual Discount</h2>
              <Form.Control
                type="text"
                placeholder="Large text"
                onChange={(e) => setManualDiscount(e.target.value)}
              />
            </div>
            <h5 className="px-2 text-black">Discount amount: 10%</h5>
            <h4 className="px-2 text-black">
              Total After Discount: $
              {pos.posItems.reduce((a, c) => a + c.price * c.quantity, 0) -
                (pos.posItems.reduce((a, c) => a + c.price * c.quantity, 0) *
                  10) /
                  100}
            </h4>
            {manualDiscount ? (
              <div>
                <h4 className="px-2 text-black">
                  Total After Manulal Discount: $
                  {pos.posItems.reduce((a, c) => a + c.price * c.quantity, 0) -
                    (pos.posItems.reduce(
                      (a, c) => a + c.price * c.quantity,
                      0
                    ) *
                      manualDiscount) /
                      100}
                </h4>
              </div>
            ) : null}
          </div>
          {/* <Form onSubmit={submitHandler}> */}
          <h1 className="my-3">Client's Information</h1>
          <Form onSubmit={submitHandler}>
            <div className="d-flex justify-content-between">
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label className="d-flex justify-content-center">
                  Full Name
                </Form.Label>
                <Form.Control
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label className="d-flex justify-content-center">
                  Address
                </Form.Label>
                <Form.Control
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between">
              <Form.Group className="mb-3" controlId="city">
                <Form.Label className="d-flex justify-content-center">
                  City
                </Form.Label>
                <Form.Control
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label className="d-flex justify-content-center">
                  Postal Code
                </Form.Label>
                <Form.Control
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-around">
              <Form.Group className="mb-3" controlId="country">
                <Form.Label className="d-flex justify-content-center">
                  Country
                </Form.Label>
                <Form.Control
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            {/* <div className="mb-3">
                <Button
                  id="chooseOnMap"
                  type="button"
                  variant="light"
                  onClick={() => navigate("/map")}
                >
                  Choose Location On Map
                </Button>
                {shippingAddress.location && shippingAddress.location.lat ? (
                  <div>
                    LAT: {shippingAddress.location.lat}
                    LNG:{shippingAddress.location.lng}
                  </div>
                ) : (
                  <div>No location</div>
                )}
              </div> */}
            <div className="mb-3">
              <Button variant="primary" type="submit">
                Save Cliant Info
              </Button>
            </div>
          </Form>
          <div className="mt-3">
            {totalAmount !== 0 ? (
              <div>
                {/* <button className="btn btn-primary" onClick={handlePrint}>
                    Pay Now
                  </button> */}
                <button
                  className="btn btn-primary"
                  onClick={placeOrderHandler}
                  disabled={pos.posItems.length === 0}
                >
                  Pay Now
                </button>
              </div>
            ) : (
              'Please add a product to the cart'
            )}
          </div>
          <div>
            <button
              className="btn btn-danger btn-sm"
              // onClick={() => addToHoldingHandler(posProduct)}
              onClick={() => addToHoldingHandler(pos.posItems)}
            >
              Hold
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default PosScreen;

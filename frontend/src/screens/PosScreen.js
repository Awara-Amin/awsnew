import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';

function PosScreen() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalSub, setTotalSub] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get(`/api/products`);
    setProducts(await result.data);
    setIsLoading(false);
  };

  const addToCartHandler = async (item) => {
    const existItem = cart.cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      // window.alert('Sorry. Product is out of stock');
      toast(`Product is out o stock`, toastOptions);
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
    toast(`Added ${item.name} to cart`, toastOptions);
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
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
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
  }, []);

  useEffect(() => {
    let newTotalAmount = 0;
    // cart.cartItems.forEach((icart) => {
    newTotalAmount = cart.cartItems.reduce(
      (a, c) => a + c.price * c.quantity,
      0
    );
    //console.log(icart);
    setTotalAmount(newTotalAmount);
  }, [cart]);

  return (
    <MainLayout>
      <div className="row">
        <div className="col-lg-6">
          {isLoading ? (
            'Loading'
          ) : (
            <div className="row">
              {products.map((product, key) => (
                <div key={key} className="col-lg-3 mb-2">
                  <div
                    className="pos-item px-1 text-center border"
                    onClick={() => addToCartHandler(product)}
                  >
                    <p>{product.name}</p>
                    <img
                      src={product.image}
                      className="img-fluid"
                      alt={product.name}
                    />
                    <p>${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-lg-6">
          <div style={{ display: 'none' }}>
            <ComponentToPrint
              cart={cart.cartItems}
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
                  <td>Qty</td>
                  <td>Total</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems
                  ? cart.cartItems.map((cartProduct, key) => (
                      <tr key={key}>
                        <td>{cartProduct.id}</td>
                        <td>{cartProduct.name}</td>
                        <td>{cartProduct.price}</td>
                        <td>{cartProduct.quantity}</td>
                        <td>{totalSub}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeItemHandler(cartProduct)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  : 'No Item in Cart'}
              </tbody>
            </table>
            <h2 className="px-2 text-black">
              Total Amount: $
              {cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
            </h2>
          </div>

          <div className="mt-3">
            {totalAmount !== 0 ? (
              <div>
                <button className="btn btn-primary" onClick={handlePrint}>
                  Pay Now
                </button>
              </div>
            ) : (
              'Please add a product to the cart'
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PosScreen;

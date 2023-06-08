import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import Preview from '@mui/icons-material/Preview';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function Product(props) {
  const { product } = props;
  const renderTooltipv = (props) => <Tooltip {...props}>View Product</Tooltip>;
  const renderTooltipr = (props) => (
    <Tooltip {...props}>Remove from Wishlist</Tooltip>
  );
  const renderTooltipf = (props) => (
    <Tooltip {...props}>Add to Wishlist</Tooltip>
  );
  const renderTooltipc = (props) => (
    <Tooltip {...props}>Add to Cart</Tooltip>
  );

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, favorite } = state;

  const addToCartHandler = async (item) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    console.log(existItem);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const favexistItem = favorite.favoriteItems.find(
    (x) => x._id === product._id
  );
  const removeToFavoriteHandler = async (item) => {
    const favexistItem = favorite.favoriteItems.find(
      (x) => x._id === product._id
    );
    const quantity = favexistItem ? favexistItem.quantity : 0;

    ctxDispatch({
      type: 'FAV_REMOVE_ITEM',
      payload: { ...item, quantity },
    });
  };

  const addToFavoriteHandler = async (item) => {
    const favexistItem = favorite.favoriteItems.find(
      (x) => x._id === product._id
    );
    const quantity = favexistItem ? favexistItem.quantity : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'FAV_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="container box d-flex w-100 col-md-3 col-sm-4">
      {/* <Link to={`/product/${product.slug}`}> */}
      <div className="box-img">
        <img src={product.image} className="card-img-top" alt={product.name} />
        {/* <div className="box-content">
          <span>{product.name}</span>
        </div> */}
        <ul className="icon">
          <OverlayTrigger placement="left" overlay={renderTooltipv}>
            <li className="preview-color">
              <Link
                className="preview-color-link"
                to={`/product/${product.slug}`}
              >
                <Preview />
              </Link>
            </li>
          </OverlayTrigger>
          <li className="preview-color">
            {favexistItem ? (
              <OverlayTrigger placement="left" overlay={renderTooltipr}>
                <li>
                  <Favorite onClick={() => removeToFavoriteHandler(product)} />
                </li>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger placement="left" overlay={renderTooltipf}>
                <li>
                  <FavoriteBorderIcon
                    onClick={() => addToFavoriteHandler(product)}
                  />
                </li>
              </OverlayTrigger>
            )}
          </li>
          <OverlayTrigger placement="left" overlay={renderTooltipc}>
          <li className="preview-color" >
            {product.countInStock === 0 ? (
              <AddShoppingCart
                onClick={() => addToCartHandler(product)}
                disabled
              />
            ) : (
              <AddShoppingCart onClick={() => addToCartHandler(product)} />
            )}
            
          </li>
          </OverlayTrigger>
        </ul>
      </div>
      {/* </Link> */}
      <Card.Body className="center">
        <Link className="text-color" to={`/product/${product.slug}`}>
          <div>{product.name}</div>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          <div className="price-color">${product.price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Product;

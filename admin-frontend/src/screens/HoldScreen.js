import { useContext, useState } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageBox from "../components/MessageBox";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function FavoriteScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  // const {
  //   favorite: { favoriteItems },
  // } = state;

  const {
    holding: { holdingItems },
  } = state;

  //   const updateCartHandler = async (item, quantity) => {
  //     const { data } = await axios.get(`/api/products/${item._id}`);
  //     if (data.countInStock < quantity) {
  //       window.alert('Sorry. Product is out of stock');
  //       return;
  //     }
  //     ctxDispatch({
  //       type: 'CART_ADD_ITEM',
  //       payload: { ...item, quantity },
  //     });
  //   };
  const [m, setM] = useState(holdingItems);
  const [k, setK] = useState("");
  const removeItemHandler = (item) => {
    // ctxDispatch({ type: "FAV_REMOVE_ITEM", payload: item });
    ctxDispatch({ type: "HAL_REMOVE_ITEM", payload: item });
  };
  console.log("holdingItems inside HoldScreen admin side 7777777-4");
  console.log(m);
  console.log(holdingItems);

  const addToHoldingHandler = async (item) => {
    console.log("item inside HoldScreen  8888888888888");
    console.log(item);
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
      type: "HOL_REMOVE_ITEM",
      // payload: { ...item, quantity },
      payload: { ...item },
    });
  };
  // console.log(m[0]["0"].name);
  // MyObject[0]["0"].id
  // console.log(m.length);
  // console.log("holdingItems inside HoldScreen admin side 7777777-3");
  // const arr = [];
  // const w = m.map((i) => arr.push(i));
  // console.log(arr[0].length);
  // console.log("holdingItems inside HoldScreen admin side 7777777-3");
  // const xx = m.map((el) => el["1"].name);
  // const w = m.map((i) => arr.push(i));
  // console.log(xx);

  // console.log("holdingItems inside HoldScreen admin side 7777777-5");
  // const j = Object.keys(m[0]);
  // console.log(j);
  // const t = Object.keys(holdingItems).map((key) => ({ [key]: state[key] }));

  // console.log("holdingItems inside HoldScreen admin side 7777777-2");
  // console.log(holdingItems);
  // // console.log(holdingItems.name);
  // console.log("here");
  // console.log(holdingItems[0]);
  // console.log("here-111");
  // const c = Object.keys(holdingItems).map(function (property) {
  //   return holdingItems[property[0].key];
  // });
  // console.log(c);
  // console.log("here-222");
  // const x = Object.keys(holdingItems).forEach((key) => console.log[key]);
  // console.log(x);
  // console.log("here-2222");
  // const arr = [];
  // Object.keys(holdingItems).forEach((key) =>
  //   arr.push({ name: key, value: [holdingItems[key]] })
  // );
  // // console.log(arr[0].name, arr[0].value);
  // console.log([arr[0]["2"].value].length);
  // console.log(arr[0].value["0"]);
  // arr[0].value["0"].map((x) => console.log(x.name));
  return (
    <div className="container">
      <Helmet>
        <title>Holding Items</title>
      </Helmet>
      <h1 className="mt-3">Holding Items</h1>
      <Row>
        <Col md={8}>
          {/* {favoriteItems.length === 0 ? ( */}
          {holdingItems.length === 0 ? (
            <MessageBox>
              Holding basket is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {/* {favoriteItems.map((item) => ( */}
              {holdingItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>

                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    test kaka
                    {/* Subtotal (
                    {favoriteItems.reduce((a, c) => a + c.quantity, 0)} items) :
                    $
                    {favoriteItems.reduce(
                      (a, c) => a + c.price * c.quantity,
                      0
                    )} */}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid"></div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
        <button
          className="btn btn-danger btn-sm"
          // onClick={() => addToHoldingHandler(posProduct)}
          onClick={() => addToHoldingHandler(holdingItems)}
        >
          Hold
        </button>
      </div>
    </div>
  );
}

import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Box } from '@mui/material';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Search from '@mui/icons-material/Search';
import CloseIcon from '@material-ui/icons/Close';
import Table from 'react-bootstrap/Table';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};
export default function OrderListScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, orders, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;
  // search part
  const [query, setquery] = useState('');
  const [focus, setFocus] = useState();
  const [ordersInitial, setOrdersInitial] = useState([]);
  const [searchedOrders, setSearchedOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const deleteHandler = async (order) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/orders/${order._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('order deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  useEffect(() => {
    // setSearchedProduct(products);
    setOrdersInitial(orders);

    return () => {
      setFocus();
    };
  }, [orders]);

  const handleChange = (e) => {
    setquery(e.target.value);
    // const filteredData = searchedProduct.filter((item) => {
    const filteredData = ordersInitial.filter((item) => {
      if (e.target.value === '') return ordersInitial;
      return item.user.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchedOrders(filteredData);
  };

  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  return (
    <Box m="1.5rem 1.5rem">
      {/* <div className="container"> */}
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <h3 className="mt-3">Orders</h3>
      <Row className="py-2">
        <Col>
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
        </Col>
        <Col></Col>
      </Row>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {query
              ? searchedOrders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user ? order.user.name : 'DELETED USER'}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    {/* <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td> */}
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : 'No'}
                    </td>
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : 'No'}
                    </td>
                    <td>
                      <Button
                        style={{ width: 70 }}
                        type="button"
                        // variant="light"
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {
                          navigate(`/order/${order._id}`);
                        }}
                      >
                        Details
                      </Button>
                      &nbsp;
                      <Button
                        style={{ width: 70 }}
                        type="button"
                        // variant="light"
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteHandler(order)}
                      >
                        Delete
                      </Button>
                      {/* <Button
                    type="button"
                    variant="light"
                    onClick={() => deleteHandler(order)}
                  >
                    Delete
                  </Button> */}
                    </td>
                  </tr>
                ))
              : orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user ? order.user.name : 'DELETED USER'}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    {/* <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td> */}
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : 'No'}
                    </td>
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : 'No'}
                    </td>
                    <td>
                      <Button
                        style={{ width: 70 }}
                        type="button"
                        // variant="light"
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {
                          navigate(`/order/${order._id}`);
                        }}
                      >
                        Details
                      </Button>
                      &nbsp;
                      <Button
                        style={{ width: 70 }}
                        type="button"
                        // variant="light"
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteHandler(order)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      )}
    </Box>
  );
}

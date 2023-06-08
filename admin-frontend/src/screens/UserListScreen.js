import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Table from 'react-bootstrap/Table';
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
} from '@mui/material';
import FormControl from 'react-bootstrap/FormControl';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Search from '@mui/icons-material/Search';
import CloseIcon from '@material-ui/icons/Close';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        users: action.payload,
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
export default function UserListScreen() {
  const navigate = useNavigate();
  const [{ loading, error, users, loadingDelete, successDelete }, dispatch] =
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
  const [usersInitial, setUsersInitial] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users`, {
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
  }, [page, userInfo, successDelete]);

  const deleteHandler = async (user) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('user deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (error) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };
  const createHandler = async () => {
    alert('see prooductList file if you wanted');
    // if (window.confirm("Are you sure to create?")) {
    //   try {
    //     dispatch({ type: "CREATE_REQUEST" });
    //     const { data } = await axios.post(
    //       "/api/products",
    //       {},
    //       {
    //         headers: { Authorization: `Bearer ${userInfo.token}` },
    //       }
    //     );
    //     toast.success("product created successfully");
    //     dispatch({ type: "CREATE_SUCCESS" });
    //     navigate(`/admin/product/${data.product._id}`);
    //   } catch (err) {
    //     toast.error(getError(error));
    //     dispatch({
    //       type: "CREATE_FAIL",
    //     });
    //   }
  };

  useEffect(() => {
    // setSearchedProduct(products);
    setUsersInitial(users);

    return () => {
      setFocus();
    };
  }, [users]);

  const handleChange = (e) => {
    setquery(e.target.value);
    // const filteredData = searchedProduct.filter((item) => {
    const filteredData = usersInitial.filter((item) => {
      if (e.target.value === '') return usersInitial;
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchedUsers(filteredData);
  };

  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  return (
    // <div className="container">
    // <div style={{ width: "100%", marginTop: 40 }}>
    <Box m="1.5rem 1.5rem">
      <Helmet>
        <title>Users</title>
      </Helmet>
      <h3 className="mt-3">Users</h3>
      <Row  className="py-2">
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
        <Col className="col text-end">
          <div>
            <Button className="button-banner-category" type="button" onClick={createHandler}>
              Create User
            </Button>
          </div>
        </Col>
      </Row>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        // <table className="table">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              {/* <th>ID</th> */}
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {query
              ? searchedUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}.</td>
                    {/* <td>{user._id}</td> */}
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                    {/* <td></td> */}
                    <td>
                      <Button
                        style={{ width: 70 }}
                        type="button"
                        // variant="light"
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => navigate(`/admin/user/${user._id}`)}
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
                        onClick={() => deleteHandler(user)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              : users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}.</td>
                    {/* <td>{user._id}</td> */}
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                    {/* <td></td> */}
                    <td>
                      <Button
                        style={{ width: 70 }}
                        type="button"
                        // variant="light"
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => navigate(`/admin/user/${user._id}`)}
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
                        onClick={() => deleteHandler(user)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>

          {/* </table> */}
        </Table>
      )}
    </Box>
  );
}

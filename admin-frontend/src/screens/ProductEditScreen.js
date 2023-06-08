import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import { Box } from '@mui/material';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

      case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
      case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    default:
      return state;
  }
};
export default function ProductEditScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: productId } = params;
  console.log("glasgow-6-3")
  console.log(productId)


  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState("");
  const [catDatabase, setCatDatabase] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (productId !== undefined)  {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        setDiscount(data.discount);
        setCatDatabase(data.catDatabase);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData()
  }
  }, [productId]);

  // ///////
  useEffect(() => {
    axios
      .get(`/api/categories`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error));
  }, []);
  console.log("glasgow-products-7");
  console.log(categories);
// //////////


  const submitHandler = async (e) => {
    e.preventDefault();
    if (productId !== undefined) {try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          images,
          category,
          brand,
          countInStock,
          description,
          discount,
          catDatabase,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Product created successfully');
      navigate('/admin/products');
    } 
    catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }}

    if (productId === undefined) {try {
      dispatch({ type: 'CREATE_REQUEST' });
      await axios.post(
        "/api/products",
        {
          name,
          slug,
          price,
          image,
          images,
          category,
          brand,
          countInStock,
          description,
          discount,
          catDatabase,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } 
    catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'CREATE_FAIL' });
    }}


    
  };

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success('Image uploaded successfully. click Update to apply it');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    toast.success('Image removed successfully. click Update to apply it');
  };
  return (
    // <Container className="small-container">
    <Box m="1rem 1.5rem">
      {/* <Helmet>
        <title>Edit Product ${productId?productId:null}</title>
      </Helmet> */}
      <h3 className="mt-3">Add Product</h3>

      {/* {loading ? (
        <LoadingBox></LoadingBox>
      ) :  */}
      {error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Container>
        <Row>
          <Col xs={6} md={4}>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="slug">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="discount">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
            />
          </Form.Group>

              {/* <Form.Group className="mb-3" controlId="imageFile">
          <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={uploadFileHandler} />
            {loadingUpload && <LoadingBox></LoadingBox>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="additionalImage">
            <Form.Label>Additional Images</Form.Label>
            {images.length === 0 && <MessageBox>No image</MessageBox>}
            <ListGroup variant="flush">
              {images.map((x) => (
                <ListGroup.Item key={x}>
                  {x}
                  <Button variant="light" onClick={() => deleteFileHandler(x)}>
                    <i className="fa fa-times-circle"></i>
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Form.Group> */}

              {/* <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Label>Select Category</Form.Label>
            <Form.Control
              as="select"
              className="selectpicker"
              value={catDatabase}
              closeMenuOnSelect={true}
              placeholder='insert your category'
              onChange={(e) => {
                console.log("e.target.value", e.target.value);
                setCatDatabase(e.target.value);
              }}
            >
               <option disabled={true} value="">
          --Choose a category--
        </option>
              {categories.map((ctg) => (
                <option  key={ctg._id} value={ctg._id} label={ctg.name}>
                  {ctg.name}
                </option>
              ))}
               {/* <button >Get color</button> */}
            </Form.Control>
          </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  as="textarea"
                  rows="2"
                />
              </Form.Group>
              
          <Row className="py-2 "  >
          {productId ?(<Col >
       
       <div className="d-grid gap-2">
         
         
         <Button disabled={loadingUpdate}  variant="secondary" size="lg"   type="submit" >
           Update 
         </Button>
         {loadingUpdate && <LoadingBox></LoadingBox>}
        
       </div>
     </Col>):(<Col >
       
       <div className="d-grid gap-2">
         
         <Button disabled={loadingUpdate}   variant="primary" size="lg"   type="submit" >
           Create 
         </Button>
         
         {loadingUpdate && <LoadingBox></LoadingBox>}
        
       </div>
     </Col>)}
        {/* <Col >
       
          <div className="d-grid gap-2">
            
            <Button disabled={loadingUpdate}   variant="primary" size="lg"   type="submit" >
              Create
            </Button>
            <Button disabled={loadingUpdate}  variant="secondary" size="lg"   type="submit" >
              Update
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
           
          </div>
        </Col> */}
      </Row>
              {/* <div className="mb-3">
                <Button disabled={loadingUpdate} type="submit">
                  Update
                </Button>
                {loadingUpdate && <LoadingBox></LoadingBox>}
              </div> */}
            </Form>
          </Col>
          <Col xs={6} md={4}>
            <Row>
              <Col >
                <img src={image} className="imageBig" alt={image} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="imageFile">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" onChange={uploadFileHandler} />
                  {loadingUpload && <LoadingBox></LoadingBox>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image File</Form.Label>
                  <Form.Control
                    value={image || ''}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="additionalImageFile">
              <Form.Label>Upload Aditional Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => uploadFileHandler(e, true)}
              />
              {loadingUpload && <LoadingBox></LoadingBox>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="additionalImage">
              <Form.Label>Additional Images</Form.Label>
              {images.length === 0 && <MessageBox>No image</MessageBox>}
              {/* <ListGroup variant="flush"> */}
              <div className=" container container-main">
              <Row xs={1} md={4} className="g-1 mt-4">
                {images && images.map((x) => (
                   
              <Col  key={x}> 
                       <Card>
                    <Card.Img variant="top" src={x} alt={"img"} />
                    <Button
                      variant="light"
                      onClick={() => deleteFileHandler(x)}
                    >
                      <i className="fa fa-times-circle"></i>
                    </Button>
                </Card>
                 </Col> 
                ))}
                  </Row>
            </div>
            </Form.Group>
          </Col>
        </Row>
        </Container>
      )}
    </Box>
  );
}

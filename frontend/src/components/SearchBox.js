import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import Search from '@mui/icons-material/Search';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <div className="search-bar">
      <Form onSubmit={submitHandler}>
        <InputGroup>
          <FormControl
            type="text"
            name="q"
            id="q"
            // className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search products..."
            aria-label="Search Products"
            aria-describedby="button-search"
          ></FormControl>
          <Button
            className="search-btn"
            variant="outline-primary"
            type="submit"
            id="button-search"
          >
            <Search />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

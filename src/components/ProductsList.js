import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DropdownButton, Dropdown, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "..//css/ProductsList.css";

const ProductsList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "https://fakestoreapi.com/products"
    })
      .then(res => {
        setData(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const sortDataByPrice = (order) => {
    const sortedData = [...data].sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setData(sortedData);
    setSortOrder(order);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredData = selectedCategory ? data.filter((product) => product.category === selectedCategory) : data;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li key={number} className="page-item">
        <button className="page-link" onClick={() => setCurrentPage(number)}>
          {number}
        </button>
      </li>
    );
  });

  return (
    <div className="container-fluid my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <DropdownButton id="category-dropdown" title="Select a category" variant="outline-secondary">
              <Dropdown.Item onClick={() => handleCategorySelect(null)}>All Categories</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategorySelect('electronics')}>Electronics</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategorySelect('jewelery')}>Jewelery</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategorySelect("men's clothing")}>Men</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategorySelect("women's clothing")}>Women</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="sort-dropdown" title={`Sort by price (${sortOrder === 'asc' ? 'asc' : 'desc'})`} variant="outline-dark">
              <Dropdown.Item onClick={() => sortDataByPrice('asc')}>Price (asc)</Dropdown.Item>
              <Dropdown.Item onClick={() => sortDataByPrice('desc')}>Price (desc)</Dropdown.Item>
            </DropdownButton>
          </div>
          {loading && <h1>Loading...</h1>}
          <Container>
            <Row>

    {currentItems.map(product => (
      <Col key={product.id} md={4}>
        <Card className="h-100 shadow-sm">
          <Card.Img variant="top" src={product.image} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              {product.description.length > 100
                ? product.description.substring(0, 100) + "..."
                : product.description}
            </Card.Text>
            <ul className="list-unstyled">
              <li>
                <strong>Price:</strong> ${product.price}
              </li>
              <li>
                <strong>Category:</strong> {product.category}
              </li>
            </ul>
            <Link to={`/products/${product.id}`} className="btn btn-light">
              See More
            </Link>
            <Button variant="success">Add to Cart</Button>{' '}
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>

                        <div className="d-flex justify-content-center mt-4">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination">
                              {renderPageNumbers}
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
);
};

export default ProductsList;

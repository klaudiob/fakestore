import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import "..//css/ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `https://fakestoreapi.com/products/${productId}`,
    })
      .then((res) => {
        setProduct(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [productId]);

  return (
    <div className="container my-4">
      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : product ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">{product.title}</h2>
            <p className="mb-3">{product.description}</p>
            <ul className="list-unstyled mb-3">
              <li>
                <strong>Price:</strong> ${product.price.toFixed(2)}
              </li>
              <li>
                <strong>Category:</strong> {product.category}
              </li>
            </ul>
          <Button variant="success">Add to Cart</Button>{' '}
          <Button variant="danger">Buy</Button>{' '}
          </div>
        </div>
      ) : (
        <h1 className="text-center">Product not found</h1>
      )}
    </div>
  );
};

export default ProductDetail;

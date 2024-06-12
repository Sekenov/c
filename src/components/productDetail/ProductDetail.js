import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/catalog/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail">
      <h1>{product.model}</h1>
      <img src={`data:image/jpeg;base64,${product.photo}`} alt={product.model} />
      <p>Country: {product.country}</p>
      <p>Year: {product.year_of_release}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}

export default ProductDetail;

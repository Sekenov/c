import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Catalog.css';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);

    axios.get('http://localhost:3000/api/catalog')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  return (
    <div>
      <h1>Catalog</h1>
      {role === 'admin' && <button onClick={handleAddProduct}>Add Product</button>}
      <div className="catalog">
        {products.map(product => (
          <div key={product.id} className="product">
            <img src={`data:image/jpeg;base64,${product.photo}`} alt={product.model} />
            <h2>{product.model}</h2>
            <p>Country: {product.country}</p>
            <p>Year: {product.year_of_release}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Catalog.css';
import { CartContext } from '../cart/CartContext';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

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

  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:3000/api/catalog/${id}`)
      .then(response => {
        setProducts(products.filter(product => product.id !== id));
        alert('Product deleted successfully');
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
      });
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
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            {role === 'admin' && (
              <div>
                <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;

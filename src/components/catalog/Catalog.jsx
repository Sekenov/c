import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Catalog.css';
import { CartContext } from '../cart/CartContext';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(null);
  const [sortCriterion, setSortCriterion] = useState(''); // Хранение выбранного критерия сортировки
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);

    axios.get('http://localhost:3000/api/catalog')
      .then(response => {
        // Сортировка по умолчанию от новых к старым
        const sortedProducts = response.data.sort((a, b) => b.id - a.id);
        setProducts(sortedProducts);
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

  const handleSortChange = (e) => {
    setSortCriterion(e.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortCriterion) {
      case 'year':
        return a.year_of_release - b.year_of_release;
      case 'model':
        return a.model.localeCompare(b.model);
      case 'price':
        return a.price - b.price;
      default:
        return b.id - a.id; // Сортировка по умолчанию от новых к старым
    }
  });

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <h1>Catalog</h1>
      {role === 'admin' && <button onClick={handleAddProduct}>Add Product</button>}
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortCriterion} onChange={handleSortChange}>
          <option value="">Select</option>
          <option value="year">Year of Release</option>
          <option value="model">Model</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="catalog">
        {sortedProducts.map(product => (
          <div key={product.id} className="product" onClick={() => handleProductClick(product.id)}>
            <img src={`data:image/jpeg;base64,${product.photo}`} alt={product.model} />
            <h2>{product.model}</h2>
            <p>Country: {product.country}</p>
            <p>Year: {product.year_of_release}</p>
            <p>Price: ${product.price}</p>
            <button onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
            {role === 'admin' && (
              <div>
                <button onClick={(e) => { e.stopPropagation(); handleEditProduct(product.id); }}>Edit</button>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;

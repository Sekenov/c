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
    <div className="catalog-container">
      <h1>Каталог</h1>
      <div className="catalog-header">
        {role === 'admin' && <button className="add-product-button" onClick={handleAddProduct}>Добавить продукт</button>}
        <div className="sort-container">
          <label htmlFor="sort">Сортировать по:</label>
          <select id="sort" value={sortCriterion} onChange={handleSortChange}>
            <option value="">Выбрать</option>
            <option value="year">Год выпуска</option>
            <option value="model">Модель</option>
            <option value="price">Цена</option>
          </select>
        </div>
      </div>
      <div className="catalog">
        {sortedProducts.map(product => (
          <div key={product.id} className="product" onClick={() => handleProductClick(product.id)}>
            <h2 className="product-title">{product.model}</h2>
            <div className="product-details">
              <div className="product-image-container">
                <img src={`data:image/jpeg;base64,${product.photo}`} alt={product.model} className="product-image" />
              </div>
              <div className="product-info">
                <p>Страна: <strong>{product.country}</strong></p>
                <p>Год выпуска: <strong>{product.year_of_release}</strong></p>
                <p>Модель: <strong>{product.model}</strong></p>
                <p>Цена: <strong>{product.price}$</strong></p>
              </div>
              <div className="product-actions">
                {role === 'client' && <button onClick={(e) => { e.stopPropagation(); addToCart(product); }}>В корзину</button>}
                {role === 'admin' && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); handleEditProduct(product.id); }}>Редактировать</button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }}>Удалить</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;

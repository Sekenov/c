import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { CartContext } from '../cart/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

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
    <div className="product-detail-container">
      <h1>{product.model}</h1>
      <div className="product-detail-card">
       
        <div className="product-info">
        <div className='info'><img src={`data:image/jpeg;base64,${product.photo}`} alt={product.model}  className='img'/>
          <div><h2>Характеристики:</h2>
          <p>Страна: <strong>{product.country}</strong></p>
          <p>Год выпуска: <strong>{product.year_of_release}</strong></p>
          <p>Модель: <strong>{product.model}</strong></p>
          <p>Цена: <strong>{product.price}$</strong></p></div></div>
          <div className="product-actions">
            <button onClick={() => addToCart(product)}>В корзину</button>
            <button onClick={() => navigate(`/edit-product/${product.id}`)}>Редактировать</button>
            <button onClick={() => {
              axios.delete(`http://localhost:3000/api/catalog/${product.id}`)
                .then(response => {
                  alert('Product deleted successfully');
                  navigate('/catalog');
                })
                .catch(error => {
                  console.error('There was an error deleting the product!', error);
                });
            }}>Удалить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

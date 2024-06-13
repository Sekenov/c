import React, { useState, useEffect, useContext  } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { CartContext } from '../cart/CartContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);

    axios.get(`http://localhost:3000/api/catalog/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]);

  const handleEditProduct = () => {
    navigate(`/edit-product/${id}`);
  };

  const handleDeleteProduct = () => {
    axios.delete(`http://localhost:3000/api/catalog/${id}`)
      .then(response => {
        alert('Product deleted successfully');
        navigate('/catalog');
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
       
      <div className="product-detail-card"><div className="back-button">
        {" "}
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="back"
          onClick={() => navigate("/catalog")}
        />
      </div>
      <div className="product-info">
        <div className="info">
          <img src={`data:image/jpeg;base64,${product.photo}`} alt={product.model} className="img" />
        
        <div className=""><h2>Характеристики:</h2>
          <p>Страна: <strong>{product.country}</strong></p>
          <p>Год выпуска: <strong>{product.year_of_release}</strong></p>
          <p>Модель: <strong>{product.model}</strong></p>
          <p>Цена: <strong>{product.price}$</strong></p></div></div>
          {role === 'admin' && (
            <div className="product-actions">
              <button onClick={() => addToCart(product)}>В корзину</button>
              <button onClick={handleEditProduct}>Редактировать</button>
              <button onClick={handleDeleteProduct}>Удалить</button>
            </div>
          )}
          {role === 'client' && (
            <div className="product-actions">
              <button onClick={() => addToCart(product)}>В корзину</button>
            </div>
          )}
        
      </div>
    </div>
    </div>
  );
}

export default ProductDetail;

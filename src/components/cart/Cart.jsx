import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);

    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = savedOrders.filter(order => order.username === storedUsername);
    setOrders(userOrders.sort((a, b) => b.id - a.id));
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      setError('Корзина пуста. Пожалуйста, добавьте товары в корзину перед оформлением заказа.');
      return;
    }

    if (password === '') {
      setError('Пожалуйста, введите ваш пароль для оформления заказа.');
      return;
    }

    const newOrder = {
      id: Date.now(),
      username: username, // Сохранение имени пользователя
      status: 'Новый',
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify([...updatedOrders, ...orders.filter(order => order.username !== username)])); // Сохранение заказов в localStorage

    clearCart();
    setPassword(''); // Очистить поле пароля
    setError(''); // Очистить сообщение об ошибке
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: 'Отменён' } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify([...updatedOrders, ...orders.filter(order => order.username !== username)])); // Обновление заказов в localStorage
  };

  return (
    <div className="cart-container">
       <div className="back-button">
        {" "}
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="back"
          onClick={() => navigate("/catalog")}
        />
      </div>
      <h1>Ваша корзина</h1>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Ваша корзина пуста.</p>
        ) : (
          cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={`data:image/jpeg;base64,${product.photo}`} alt={product.model} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{product.model}</h2>
                <p>{product.price}$</p>
                <div className="cart-item-quantity">
                  <button onClick={() => removeFromCart(product.id)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => addToCart(product)}>+</button>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(product.id)}>Убрать</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-summary">
        <p>Общая стоимость: {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}$</p>
        <input
          type="password"
          placeholder="Ваш пароль"
          value={password}
          onChange={handlePasswordChange}
          className="password-input"
        />
        <button className="place-order-button" onClick={handlePlaceOrder}>Сформировать заказ</button>
        {error && <p className="error">{error}</p>}
      </div>
      <h2>Ваши заказы</h2>
      <div className="orders">
        {orders.map((order) => (
          <div key={order.id} className="order">
            <h3>Заказ {order.id}</h3>
            <p>Статус: {order.status}</p>
            <p>Количество товаров: {order.items.length}</p>
            <p>Общая стоимость: {order.total}$</p>
            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <h4>{item.model}</h4>
                  <p>{item.price}$</p>
                </div>
              ))}
            </div>
            {role === 'admin' && order.status !== 'Отменён' && (
              <button className="cancel-order-button" onClick={() => handleCancelOrder(order.id)}>Отменить заказ</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;

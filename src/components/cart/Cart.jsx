import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import './Cart.css';

function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

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
      id: Date.now(), // Вы можете использовать более надежный метод для генерации уникального ID
      status: 'Новый',
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    setOrders([...orders, newOrder]);
    clearCart();
    setPassword(''); // Очистить поле пароля
    setError(''); // Очистить сообщение об ошибке
  };

  return (
    <div className="cart-container">
      <h1>Ваша корзина</h1>
      <div className="cart-items">
        {cart.map((product) => (
          <div key={product.id} className="cart-item">
            <img src={`data:image/jpeg;base64,${product.photo}`} alt={product.model} />
            <h2>{product.model}</h2>
            <p>{product.price}$</p>
            <button onClick={() => removeFromCart(product.id)}>Убрать</button>
            <div className="cart-item-quantity">
              <button onClick={() => removeFromCart(product.id)}>-</button>
              <span>{product.quantity}</span>
              <button onClick={() => addToCart(product)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Общая стоимость: {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}$</p>
        <input
          type="password"
          placeholder="Ваш пароль"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handlePlaceOrder}>Сформировать заказ</button>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;

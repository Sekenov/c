import React, { useEffect, useState } from 'react';
import './Order.css';

function Order() {
  const [userOrders, setUserOrders] = useState([]);
  const [otherOrders, setOtherOrders] = useState([]);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
    setRole(localStorage.getItem("role"));

    const userOrders = savedOrders.filter(order => order.username === storedUsername);
    const otherOrders = savedOrders.filter(order => order.username !== storedUsername);

    setUserOrders(userOrders.sort((a, b) => b.id - a.id));
    setOtherOrders(otherOrders.sort((a, b) => b.id - a.id));
  }, []);

  const handleDeleteOrder = (orderId) => {
    const updatedUserOrders = userOrders.filter(order => order.id !== orderId);
    const updatedOtherOrders = otherOrders.filter(order => order.id !== orderId);
    const updatedOrders = [...updatedUserOrders, ...updatedOtherOrders];

    setUserOrders(updatedUserOrders);
    setOtherOrders(updatedOtherOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders)); // Обновление заказов в localStorage
  };

  return (
    <div className="order-container">
      <h1>Ваши заказы</h1>
      {userOrders.length === 0 ? (
        <p>У вас нет заказов.</p>
      ) : (
        userOrders.map(order => (
          <div key={order.id} className="order">
            <h3>Заказ {order.id}</h3>
            <p>Статус: {order.status}</p>
            <p>Количество товаров: {order.items.length}</p>
            <p>Общая стоимость: {order.total}$</p>
            <div className="order-items">
              {order.items.map(item => (
                <div key={item.id} className="order-item">
                  <h4>{item.model}</h4>
                  <p>{item.price}$</p>
                </div>
              ))}
            </div>
            {role === 'admin' && (
              <button className="delete-button" onClick={() => handleDeleteOrder(order.id)}>Удалить заказ</button>
            )}
          </div>
        ))
      )}
      {role === 'admin' && otherOrders.length > 0 && (
        <>
          <h2>Заказы других пользователей</h2>
          {otherOrders.map(order => (
            <div key={order.id} className="order">
              <h3>Заказ {order.id}</h3>
              <p>Пользователь: {order.username}</p>
              <p>Статус: {order.status}</p>
              <p>Количество товаров: {order.items.length}</p>
              <p>Общая стоимость: {order.total}$</p>
              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <h4>{item.model}</h4>
                    <p>{item.price}$</p>
                  </div>
                ))}
              </div>
              <button className="delete-button" onClick={() => handleDeleteOrder(order.id)}>Удалить заказ</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Order;

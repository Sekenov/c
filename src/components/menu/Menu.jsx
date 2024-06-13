import React, { useState, useEffect, useContext } from "react";
import "./Menu.css";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from '../cart/CartContext';

export default function Menu() {
  const [role, setRole] = useState(null);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);

    const handleStorageChange = () => {
      const newRole = localStorage.getItem("role");
      setRole(newRole);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new Event('storage')); // Триггер события для обновления состояния
    navigate('/'); // Перенаправление на главную страницу
  };

  const handleAdminLogin = () => {
    navigate('/login?admin=true'); // Перенаправление на страницу входа с параметром admin
  };

  return (
    <nav className="menu">
      <ul>
        <Link to="/catalog">Каталог</Link>
        {role === 'admin' ? (
          <>
            <Link to="/about">О нас</Link>
            <Link to="/order">Заказ</Link>
            <Link to="/map">Карта</Link>
            <Link to="/cart">Корзина ({cart.length})</Link>
            <span className="pocket">Админ</span>
            <button className="pocket" onClick={handleLogout}>Выход</button>
          </>
        ) : role === 'client' ? (
          <>
            <Link to="/about">О нас</Link>
            <Link to="/order">Заказ</Link>
            <Link to="/map">Карта</Link>
            <Link to="/cart">Корзина ({cart.length})</Link>
            <span className="pocket">Клиент</span>
            <button className="pocket" onClick={handleLogout}>Выход</button>
            <button className="pocket" onClick={handleAdminLogin}>Войти как админ</button>
          </>
        ) : (
          <>
            <span className="pocket">Посетитель</span>
            <Link className="pocket" to="/login">Вход</Link>
            <Link className="pocket" to="/register">Регистрация</Link>
          </>
        )}
      </ul>
    </nav>
  );
}

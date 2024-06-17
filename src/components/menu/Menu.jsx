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
		<nav className='menu'>
			<ul>
				<Link to='/about'>О нас</Link>
				<Link to='/catalog'>Каталог</Link>
				{role === 'admin' ? (
					<>
						<Link to='/cart'>Корзина </Link>
						<Link to='/order'>Заказы</Link>
						<Link to='/map'>Где нас найти?</Link>
						<Link to='/room'>Комната Админа</Link>
						<span className='role'>Админ</span>
						<button className='pocket' onClick={handleLogout}>
							Выход
						</button>
					</>
				) : role === 'client' ? (
					<>
						<Link to='/cart'>Корзина</Link>
						<Link to='/order'>Заказы</Link>
						<Link to='/map'>Где нас найти?</Link>
						<span className='role'>Клиент</span>
						<button className='pocket' onClick={handleLogout}>
							Выход
						</button>
						<button className='pocket' onClick={handleAdminLogin}>
							Войти как админ
						</button>
					</>
				) : (
					<>
						<span className='role'>Посетитель</span>
						<Link className='pocket' to='/login'>
							Вход
						</Link>
						<Link className='pocket' to='/register'>
							Регистрация
						</Link>
					</>
				)}
			</ul>
		</nav>
	)
}
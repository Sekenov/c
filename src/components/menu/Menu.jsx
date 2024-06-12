import React, { useState } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import RegistrationModal from "../register/Register";


export default function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="menu">
        <ul>
          <Link to="/about">О нас</Link>
          <Link to="/cart">Корзина</Link>
          <Link to="/order">Заказ</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/map">Карта</Link>
          <Link className="pocket">Выход</Link>
          <Link className="pocket">Вход</Link>
          <button className="pocket" onClick={openModal}>Регистрация</button>
        </ul>
      </nav>
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

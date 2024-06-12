import React, { useState } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";



export default function Menu() {
 
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
          <Link to="/login" className="pocket">Вход</Link>
          <Link to="/register" className="pocket" >Регистрация</Link>
        </ul>
      </nav>
      
    </>
  );
}

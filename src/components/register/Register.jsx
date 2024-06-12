import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegistrationModal.css";
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/register', formData)
      .then(response => {
        alert(response.data.message); // предполагая, что сервер возвращает сообщение
        localStorage.setItem("user", JSON.stringify(response.data.user)); // сохраняем информацию о пользователе
        window.dispatchEvent(new Event('storage')); // триггер события storage для обновления состояния в Menu
        navigate('/'); // перенаправление на главную страницу после успешной регистрации
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="form" onSubmit={handleSubmit}>
          <p id="heading">Регистрация</p>
          <div className="field">
            <input
              autoComplete="off"
              placeholder="Имя"
              className="input-field"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              autoComplete="off"
              placeholder="Фамилия"
              className="input-field"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              autoComplete="off"
              placeholder="Отчество"
              className="input-field"
              type="text"
              name="patronymic"
              value={formData.patronymic}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <input
              autoComplete="off"
              placeholder="Логин"
              className="input-field"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              autoComplete="off"
              placeholder="Email"
              className="input-field"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              placeholder="Пароль"
              className="input-field"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              placeholder="Подтвердите Пароль"
              className="input-field"
              type="password"
              name="confirmPassword"
              required
            />
          </div>
          <div className="btn">
            <button type="submit" className="button1">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Регистрация&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
            <Link to={"/login"} type="button" className="button2">Войти</Link>
          </div>
          <button type="button" className="button3" onClick={() => navigate('/')}>
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

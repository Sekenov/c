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
    password: '',
    confirmPassword: '' // Добавлено поле confirmPassword
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios.post('http://localhost:3000/register', formData)
      .then(response => {
        alert(response.data); // предполагая, что сервер возвращает сообщение
        localStorage.setItem("role", "client"); // Установка роли client в localStorage
        window.dispatchEvent(new Event('storage')); // Вызов события storage для обновления состояния
        navigate('/'); // перенаправление на главную страницу после успешной регистрации
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert('Registration failed: ' + (error.response ? error.response.data : error.message));
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
              required
            />
          </div>
          <div className="field">
            <input
              autoComplete="off"
              placeholder="Имя пользователя"
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
              autoComplete="off"
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
              autoComplete="off"
              placeholder="Подтвердите пароль"
              className="input-field"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="btn">
          <Link to={"/login"} type="button" className="button1">Войти</Link>
            <button className="button2" type="submit">Зарегистрироваться</button>
          </div>
          <button type="submit" className="button3" onClick={() => navigate('/')}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Назад&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
        </form>
      </div>
    </div>
  );
}

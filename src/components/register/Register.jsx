import React from "react";
import "./RegistrationModal.css";

export default function RegistrationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="form" id="form" action="/register" >
          <p id="heading">Регистрация</p>
          <div className="field">
            <input
              autocomplete="off"
              placeholder="Имя"
              className="input-field"
              type="text"
            />
          </div>
          <div className="field">
            <input
              autocomplete="off"
              placeholder="Фамилия"
              className="input-field"
              type="text"
            />
          </div>
          <div className="field">
            <input
              autocomplete="off"
              placeholder="Отчество"
              className="input-field"
              type="text"
            />
          </div>
          <div className="field">
            
            <input
              autocomplete="off"
              placeholder="Логин"
              className="input-field"
              type="text"
            />
          </div>
          <div className="field">
          
            <input
              autocomplete="off"
              placeholder="Email"
              className="input-field"
              type="email"
            />
          </div>
          <div className="field">
            
            <input
              placeholder="Password"
              className="input-field"
              type="password"
            />
          </div>
          <div className="field">
            <input
              placeholder="Confirm Password"
              className="input-field"
              type="password"
            />
          </div>
          <div className="btn">
            <button className="button1">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Регистрация&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
            <button className="button2">Войти</button>
          </div>
          <button onClick={onClose} className="button3">
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

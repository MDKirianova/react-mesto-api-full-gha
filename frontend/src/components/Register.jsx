import React from "react";
import WindowWithForm from "./WindowWithForm.jsx";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
    return (
      <WindowWithForm
        title={"Регистрация"}
        onSubmit={onRegister}
        buttonText={"Зарегистрироваться"}
      >
      <p className="window-form__question">Уже зарегистрированы?
          <Link to="/sign-in" className="window-form__login-link">Войти</Link></p>
    </WindowWithForm>
  )
}
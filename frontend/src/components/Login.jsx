import React from "react";
import WindowWithForm from "./WindowWithForm.jsx";

export default function Login({ onLogin }) {
  return (
    <WindowWithForm
      title={"Вход"}
      onSubmit={onLogin}
      buttonText={"Войти"}
    />
  );
}
import React from "react";

export default function WindowWithForm({
  title,
  onSubmit,
  buttonText,
  children,
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <div className="">
      <div className="window-form__container">
        <h1 className="window-form__title">{title}</h1>
        <form className="window-form__fieldset" onSubmit={handleSubmit}>
          <input
            className="window-form__input"
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChangeEmail}
            value={email}
          />
          <input
            className="window-form__input"
            name="password"
            type="password"
            placeholder="Пароль"
            required
            minLength={6}
            onChange={handleChangePassword}
            value={password}
          />
          <button type="submit" className="window-form__save-btn">
            {buttonText}
          </button>
          {children}
        </form>
      </div>
    </div>
  );
}
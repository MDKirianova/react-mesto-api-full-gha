import logo from '../images/header__logo.svg';
import { Link } from 'react-router-dom';

export default function Header({email, title, onSignOut, route }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип места Россия" className="header__logo" />
      <div className="header__info">
        <p className="header__navbar">{email}</p>
        <Link className="header__navbar header__navbar_type_link" onClick={onSignOut} to={route} >{title}</Link>
      </div>
    </header>
  )
}
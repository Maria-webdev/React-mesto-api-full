import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChange(evt) {
    evt.preventDefault();
    if (evt.target.name === "email") {
      setEmail(evt.target.value);
    } else if (evt.target.name === "password") {
      setPassword(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <main className="content">
      <section className="login">
        <div className="login__content">
          <h2 className="login__title">Регистрация</h2>
          <form className="login__form" name="login__form" onSubmit={handleSubmit}>
            <input className="login__email" id="email" type="email" placeholder="Email" value={email} onChange={handleChange} name="email" required minLength="2" maxLength="40"/>
            <span className="login__email-error" id="email-error"></span>
            <input className="login__password" id="password" type="password" placeholder="Пароль" value={password} onChange={handleChange} name="password" required minLength="2" maxLength="40"/>
            <span className="login__password-error" id="password-error"></span>
            <button className="login__button" type="submit">
              Зарегистрироваться
            </button>
          </form>
          <div className="login__signup">
            <Link to="/signin" className="login__link">
            Уже зарегистрированы? Войти
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
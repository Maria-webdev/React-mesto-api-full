import React from "react";

function Login(props) {
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
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password);
  }

  return (
    <section className="login">
      <div className="login__content">
        <h2 className="login__title">Вход</h2>
        <form className="login__form" name="login__form" onSubmit={handleSubmit}>
          <input className="login__email" id="email" type="email" placeholder="Email" value={email} onChange={handleChange} name="email" required />
          <span className="login__email-error" id="email-error"></span>
          <input className="login__password" id="password" type="password" placeholder="Пароль" value={password} onChange={handleChange} name="password" required />
          <span className="login__password-error" id="password-error"></span>
          <button className="login__button " type="submit">
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
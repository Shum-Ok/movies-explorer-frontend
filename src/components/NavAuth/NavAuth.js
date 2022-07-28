import './NavAuth.css';

function NavAuth() {
  return (
    <div className="auth">
      <a className="auth__signup" href="/">Регистрация</a>
      <a className="auth__signin" href="/">Войти</a>
    </div>
  );
}

export default NavAuth;
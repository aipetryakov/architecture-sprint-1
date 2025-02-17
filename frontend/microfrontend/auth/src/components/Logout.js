import React from 'react';
import * as auth from "../utils/auth.js";

function Login({onLogout}) {
  function handleLogout(e) {
    auth.logout();
    onLogout();
  }
  return (
    <button className="header__logout" onClick={handleLogout}>Выйти</button>
  )
}

export default Login;

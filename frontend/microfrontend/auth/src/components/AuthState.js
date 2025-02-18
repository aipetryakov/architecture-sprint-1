import React from 'react';
import * as auth from "../utils/auth.js";
import '../blocks/login/login.css';

function AuthState({onExistingTokenValid, onExistingTokenInvalid}) {
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          onExistingTokenValid({email: res.data.email});
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);

          onExistingTokenInvalid();
        });
    }
  });
}

export default AuthState;

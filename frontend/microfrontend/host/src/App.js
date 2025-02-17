import React, { lazy, useEffect, Suspense } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import api from "./utils/api";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import InfoTooltip from "./components/InfoTooltip";

const Login = lazy(() => import('auth/Login')); 
const Register = lazy(() => import('auth/Register')); 
const AuthState = lazy(() => import('auth/AuthState')); 

const App = () => {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");
  const [tooltipText, setToolipText] = React.useState("");

  const history = useHistory();

  function onRegisterSuccessful() {
    setTooltipStatus("success");
    setToolipText("Вы успешно зарегистрировались!");
    setIsInfoToolTipOpen(true);
    history.push("/signin");
  }

  function onRegisterFailed() {
    setTooltipStatus("fail");
    setToolipText("");
    setIsInfoToolTipOpen(true);
  }

  function onLoginSuccessful({email}) {
    setEmail(email);
    setIsLoggedIn(true);
    history.push("/");
  }

  function onLoginFailed() {
    setTooltipStatus("fail");
    setToolipText("");
    setIsInfoToolTipOpen(true);
  }

  function onExistingTokenValid({email}) {
    setEmail(email);
    setIsLoggedIn(true);
    history.push("/");
  }

  function onExistingTokenInvalid() {

  }

  function onLogout() {
    setIsLoggedIn(false);
    history.push("/signin");
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AuthState
        onExistingTokenValid={onExistingTokenValid}
        onExistingTokenInvalid={onExistingTokenInvalid}
        />
      <div className="page__content">
        <Header email={email} onLogout={onLogout} />
        <Switch>
          <Route path="/signup">
            <Suspense>
              <Register
                onRegisterSuccessful={onRegisterSuccessful}
                onRegisterFailed={onRegisterFailed}
                loginLinkPath={"/signin"}
                />
            </Suspense>
          </Route>
          <Route path="/signin">
            <Suspense>
              <Login
                onLoginSuccessful={onLoginSuccessful}
                onLoginFailed={onLoginFailed}
                />
            </Suspense>
          </Route>
        </Switch>
        <Footer />

        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={() => setIsInfoToolTipOpen(false)}
          status={tooltipStatus}
          text={tooltipText}
        />
      </div>
    </CurrentUserContext.Provider>
)};

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
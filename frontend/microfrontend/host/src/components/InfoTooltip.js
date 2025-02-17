import React from 'react';
import SuccessIcon from '../images/success-icon.svg';
import ErrorIcon from '../images/error-icon.svg';

function InfoTooltip({ isOpen, onClose, status, text }) {
  const icon = status === 'success' ? SuccessIcon : ErrorIcon
  const _text = text
    ? text
    : status === 'success'
      ? "Все прошло так!"
      : "Что-то пошло не так! Попробуйте ещё раз."
  return (
    <div className={`popup ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button type="button" className="popup__close" onClick={onClose}></button>
            <div>
              <img className="popup__icon" src={icon} alt=""/>
              <p className="popup__status-message">{_text}</p>
            </div>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;

 
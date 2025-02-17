import React from 'react';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api'

function AddPlace({ onAddPlace }) {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  
  function handleAddPlaceOpenClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlaceCloseClick() {
    setIsAddPlacePopupOpen(false);
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        dispatchEvent(new CustomEvent("place-added", {
          detail: newCardFull
        }));
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }


  return (
    <>
      <button className="profile__add-button" type="button" onClick={handleAddPlaceOpenClick}></button>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={handleAddPlaceCloseClick}
      />
    </>
  );
}

export default AddPlace;

import React, { useEffect, useState } from 'react';
import api from "../utils/api";
import Card from './Card';
import ImagePopup from "./ImagePopup";
//import { CurrentUserContext } from "@contexts/CurrentUserContext";

function Places({currentUser}) {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  //const { currentUser } = React.useContext(CurrentUserContext);
  
  const onPlaceAdded = (event) => {
    console.log([event.detail, ...cards]);
    setCards([event.detail, ...cards]);
  };
  useEffect(() => {
    window.addEventListener('place-added', onPlaceAdded);
    return () => {
        window.removeEventListener('place-added', onPlaceAdded);
    };
  }, [cards]);

  useEffect(() => {
    api
        .getCardList()
        .then((cards) => {
            setCards(cards);
        })
        .catch((err) => console.log(err));
    }, []);

  function handleSelectCard(card) {
    setSelectedCard(card);
  }
  function handleUnselectCard() {
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <ul className="places__list">
        {cards.map((card) => (
        <Card
            currentUser={currentUser}
            key={card._id}
            card={card}
            onCardClick={handleSelectCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
        />
        ))}
      </ul>
      <ImagePopup card={selectedCard} onClose={handleUnselectCard} />
    </>
  );
}

export default Places;

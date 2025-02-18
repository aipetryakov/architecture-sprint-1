import React, { lazy } from 'react';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/api';
//import { CurrentUserContext } from "@contexts/CurrentUserContext";

function Profile({currentUser, updateCurrentUser}) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  //const { currentUser } = React.useContext(CurrentUserContext);

  function handleUpdateUser(userUpdate) {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        updateCurrentUser(newUserData);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        updateCurrentUser(newUserData);
        setIsEditAvatarPopupOpen(false)
      })
      .catch((err) => console.log(err));
  }

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  return (
    <>
      <div className="profile__image" onClick={() => { setIsEditAvatarPopupOpen(true); }} style={imageStyle}></div>
      <div className="profile__info">
        <h1 className="profile__title">{currentUser.name}</h1>
        <button className="profile__edit-button" type="button" onClick={() => { setIsEditProfilePopupOpen(true); }}></button>
        <p className="profile__description">{currentUser.about}</p>
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={() => { setIsEditProfilePopupOpen(false); }}
        />
      <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={() => { setIsEditAvatarPopupOpen(false); }}
        />
    </>
  );
}

export default Profile;

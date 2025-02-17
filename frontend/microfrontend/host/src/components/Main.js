import React, { lazy } from 'react';
import { CurrentUserContext } from "@contexts/CurrentUserContext";


const AddPlace = lazy(() => import('places/AddPlace')); 
const Places = lazy(() => import('places/Places'));
const Profile = lazy(() => import('profile/Profile')); 

function Main() {
  const { currentUser, updateCurrentUser } = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile page__section">
        <Profile currentUser={currentUser} updateCurrentUser={updateCurrentUser} />
        <AddPlace />
      </section>
      <section className="places page__section">
        <Places currentUser={currentUser} />
      </section>
    </main>
  );
}

export default Main;

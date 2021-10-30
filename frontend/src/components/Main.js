import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-edit-button" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="фотография владельца профиля" />
        </button>
        <div className="profile__info">
          <div className="profile__main">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" onClick={props.onEditProfile} type="button"></button>
          </div>
          <p className="profile__subtitle" id="caption">
            {currentUser.about}
          </p>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace} type="button"></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} card={card} key={card._id} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;

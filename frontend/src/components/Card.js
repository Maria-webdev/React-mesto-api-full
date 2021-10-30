import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__delete-button ${isOwn ? "element__delete-button_active" : ""}`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-button ${isLiked ? "element__like-button_active" : ""}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick(card) {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      <img className="element__pic" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button"></button>
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__group">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
          <div className="element__count">{props.card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;

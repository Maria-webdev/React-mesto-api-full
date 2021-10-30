import React from 'react';

const ImagePopup = (props) => {
  return (
    <div className={`popup popup_pic ${props.card && 'popup_visible'}`}>
    <div className="popup-pic__container">
      <img className="popup-pic__image" alt={props.card.name} src={props.card.link} />
      <h3 className="popup-pic__title">{props.card.name}</h3>
      <button className="popup__close-button popup__close-button_pic" type="button" onClick={props.onClose}></button>
    </div>
  </div>
  );
};

export default ImagePopup;
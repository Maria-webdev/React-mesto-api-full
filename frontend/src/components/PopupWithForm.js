import React from "react";

const PopupWithForm = (props) => {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen && "popup_visible"}`}>
      <div className={`popup__content popup__content_${props.name}`}>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} noValidate onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__button" type="submit">
            {props.submitText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;

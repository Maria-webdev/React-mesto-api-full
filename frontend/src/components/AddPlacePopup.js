import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace(name, link);
  }

  function handleSetName(e) {
    setName(e.target.value);
  }

  function handleSetLink(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name={"add"} title={"Новое место"} submitText={"Сохранить"} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_type_place-name" id="place" type="text" name="place" placeholder="Название" required minLength="2" maxLength="30" onChange={handleSetName} value={name || ""} />
      <span className="popup__error" id="place-error"></span>
      <input className="popup__input popup__input_type_URL" id="url" type="url" name="url" placeholder="Ссылка на картинку" required onChange={handleSetLink} value={link || ""} />
      <span className="popup__error" id="url-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

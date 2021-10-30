import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name={"avatar"} title={"Обновить аватар"} submitText={"Сохранить"} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_type_URL popup__input_type_url-avatar" id="url-avatar" type="url" name="avatar" placeholder="Ссылка на картинку" required ref={avatarRef} />
      <span className="popup__error" id="url-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;


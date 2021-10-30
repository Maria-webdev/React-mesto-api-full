import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function changeName(e) {
    setName(e.target.value);
  }

  function changeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name={"edit"} title={"Редактировать профиль"} submitText={"Сохранить"} onSubmit={handleSubmit}>
      <input value={name || ""} onChange={changeName} className="popup__input popup__input_type_name" type="text" id="name" name="name" required minLength="2" maxLength="40" placeholder="Имя" />
      <span className="popup__error" id="name-error"></span>
      <input value={description || ""} onChange={changeDescription} className="popup__input popup__input_type_about" type="text" id="about" name="about" required minLength="2" maxLength="200" placeholder="О Себе" />
      <span className="popup__error" id="about-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;


import React from "react";
import PopupWithForm from "./PopupWithForm";
import Label from "./Label";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({
  onClose,
  onUpdateUser,
  isSaving,
  validation,
  refs,
}) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    resetForm,
  } = validation;

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      resetForm({
        nickname: currentUser.name,
        description: currentUser.about,
      });
      setIsValid(true);
    }
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [currentUser, resetForm, setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.nickname || "",
      about: values.description || "",
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="title"
      buttonText="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
      isSaving={isSaving}
      isDisabled={!isValid}
      refs={refs}
      children={
        <fieldset className="form__fields">
          <Label
            values={values}
            onChange={handleChange}
            errors={errors}
            name="nickname"
            placeholder="Имя"
            type="text"
            required
            minLength="2"
            maxLength="40"
            pattern="[a-zA-Zа-яА-Я -]{1,}"
          />
          <Label
            values={values}
            onChange={handleChange}
            errors={errors}
            name="description"
            placeholder="О себе"
            type="text"
            required
            minLength="2"
            maxLength="200"
          />
        </fieldset>
      }
    />
  );
}

export default EditProfilePopup;

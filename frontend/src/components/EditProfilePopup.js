import React from "react";
import PopupWithForm from "./PopupWithForm";
import Label from "./Label";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { TranslationContext } from "../contexts/TranslationContext";

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
  const translation = React.useContext(TranslationContext);

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
      title={translation.updateBio}
      name="title"
      buttonText={translation.saveBio}
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
            placeholder={translation.nameInput}
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
            placeholder={translation.aboutInput}
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

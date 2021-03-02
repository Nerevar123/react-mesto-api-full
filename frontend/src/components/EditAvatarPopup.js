import React from "react";
import PopupWithForm from "./PopupWithForm";
import Label from "./Label";
import { TranslationContext } from "../contexts/TranslationContext";

function EditAvatarPopup({
  onClose,
  onUpdateAvatar,
  isSaving,
  validation,
  refs,
}) {
  const { values, handleChange, errors, isValid, resetForm } = validation;
  const translation = React.useContext(TranslationContext);

  React.useEffect(() => {
    resetForm();
    return () => {
      resetForm();
    };
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: values.avatar || "",
    });
  }

  return (
    <PopupWithForm
      title={translation.updateAvatar}
      name="avatar"
      buttonText={translation.saveAvatar}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSaving={isSaving}
      isDisabled={!isValid}
      refs={refs}
      children={
        <Label
          values={values}
          onChange={handleChange}
          errors={errors}
          name="avatar"
          placeholder={translation.cardLink}
          type="url"
          required
        />
      }
    />
  );
}

export default EditAvatarPopup;

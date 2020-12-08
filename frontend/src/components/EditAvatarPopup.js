import React from "react";
import PopupWithForm from "./PopupWithForm";
import Label from "./Label";

function EditAvatarPopup({
  onClose,
  onUpdateAvatar,
  isSaving,
  validation,
  refs,
}) {
  const { values, handleChange, errors, isValid, resetForm } = validation;

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
      title="Обновить аватар"
      name="avatar"
      buttonText="Обновить"
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
          placeholder="Ссылка на аватар"
          type="url"
          required
        />
      }
    />
  );
}

export default EditAvatarPopup;

import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ onClose, isSaving, onConfirm, refs }) {
  function handleSubmit(e) {
    e.preventDefault();

    onConfirm();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      buttonText="Да"
      onClose={onClose}
      onSubmit={handleSubmit}
      isSaving={isSaving}
      refs={refs}
    />
  );
}

export default ConfirmPopup;

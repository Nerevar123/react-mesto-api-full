import React from "react";
import PopupWithForm from "./PopupWithForm";
import { TranslationContext } from "../contexts/TranslationContext";

function ConfirmPopup({ onClose, isSaving, onConfirm, refs }) {
  const translation = React.useContext(TranslationContext);

  function handleSubmit(e) {
    e.preventDefault();

    onConfirm();
  }

  return (
    <PopupWithForm
      title={translation.confirmText}
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

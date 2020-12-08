import React from "react";
import Form from "./Form";

function PopupWithForm({
  title,
  name,
  buttonText = "Сохранить",
  onClose,
  onSubmit,
  isSaving,
  children,
  isDisabled,
  refs,
}) {
  return (
    <section className={`modal modal_type_${name}`} ref={refs}>
      <div className="modal__container">
        <h3 className="modal__title">{title}</h3>
        <Form
          name={name}
          onSubmit={onSubmit}
          isDisabled={isDisabled}
          isSaving={isSaving}
          buttonText={buttonText}
          children={children}
        ></Form>
        <button
          className="modal__close-btn button"
          type="button"
          onClick={onClose}
        />
      </div>
    </section>
  );
}

export default PopupWithForm;

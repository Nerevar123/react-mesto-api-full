import React from "react";
import PopupWithForm from "./PopupWithForm";
import Label from "./Label";
import { TranslationContext } from "../contexts/TranslationContext";

function AddPlacePopup({ onClose, onAddPlace, isSaving, validation, refs }) {
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

    onAddPlace({
      name: values.name || "",
      link: values.link || "",
    });
  }

  return (
    <PopupWithForm
      title={translation.newPlace}
      name="place"
      buttonText={translation.createButton}
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
            name="name"
            placeholder={translation.cardName}
            type="text"
            required
            minLength="2"
            maxLength="30"
          />
          <Label
            values={values}
            onChange={handleChange}
            errors={errors}
            name="link"
            placeholder={translation.cardLink}
            type="url"
            required
          />
        </fieldset>
      }
    />
  );
}

export default AddPlacePopup;

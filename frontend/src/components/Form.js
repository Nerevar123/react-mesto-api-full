import React from "react";
import SaveButton from "./SaveButton";

function Form({
  name,
  children,
  onSubmit,
  isDisabled,
  isSaving,
  isBlack,
  buttonText,
}) {
  return (
    <form
      className="form"
      name={name}
      method="GET"
      noValidate
      onSubmit={onSubmit}
    >
      {children}
      <SaveButton
        buttonText={buttonText}
        isDisabled={isDisabled}
        isSaving={isSaving}
        isBlack={isBlack}
      />
    </form>
  );
}

export default Form;

import React from "react";
import cn from "classnames";
import { TranslationContext } from "../contexts/TranslationContext";

function SaveButton({ isDisabled, isSaving, isBlack, buttonText }) {
  const translation = React.useContext(TranslationContext);
  return (
    <button
      className={cn(
        "save-btn",
        "button",
        { "save-btn_disabled": isDisabled },
        { "save-btn_theme_black": isBlack }
      )}
      type="submit"
      disabled={isDisabled}
    >
      {isSaving ? translation.loading : buttonText}
    </button>
  );
}

export default SaveButton;

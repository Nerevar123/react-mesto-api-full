import React from "react";
import cn from "classnames";

function SaveButton({ isDisabled, isSaving, isBlack, buttonText }) {
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
      {isSaving ? "Загрузка..." : buttonText}
    </button>
  );
}

export default SaveButton;

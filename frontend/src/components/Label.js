import React from "react";
import cn from "classnames";

function Label({ name, placeholder, isBlack, values, errors, ...props }) {
  return (
    <label className="label">
      <input
        name={name}
        className={cn("label__input", {
          label__input_type_error: errors[name],
          label__input_theme_black: isBlack,
        })}
        value={values[name] || ""}
        {...props}
      />
      <span
        className={cn("label__placeholder", {
          "label__placeholder_is-fixed": values[name],
        })}
      >
        {placeholder}
      </span>
      <span
        className={cn("label__error", {
          "label__error_active": errors[name],
        })}
      >
        {errors[name] || ""}
      </span>
    </label>
  );
}

export default Label;

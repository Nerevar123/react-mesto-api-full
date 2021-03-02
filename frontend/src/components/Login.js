import React from "react";
import cn from "classnames";
import Form from "./Form";
import Label from "./Label";
import { TranslationContext } from "../contexts/TranslationContext";

function Login({ validation, isSaving, onAuthorize }) {
  const { values, errors, handleChange, isValid, resetForm } = validation;
  const translation = React.useContext(TranslationContext);


  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onAuthorize({
      email: values.email || "",
      password: values.password || "",
    });
  }

  return (
    <section className="login">
      <h2 className="login__title">{translation.login}</h2>
      <Form
        name="nickname"
        onSubmit={handleSubmit}
        isDisabled={!isValid}
        isSaving={isSaving}
        isBlack={true}
        errors={errors}
        buttonText={translation.loginButton}
        children={
          <fieldset className="login__fields">
            <Label
              values={values}
              onChange={handleChange}
              errors={errors}
              name="email"
              placeholder="Email"
              isBlack
              type="email"
              required
              autoComplete="username"
            />
            <Label
              values={values}
              onChange={handleChange}
              errors={errors}
              name="password"
              placeholder={translation.password}
              isBlack
              type="password"
              required
              minLength="4"
              autoComplete="current-password"
            />
            <span
              className={cn("form__error", {
                "form__error_active": errors.submit,
              })}
            >
              {errors.submit || ""}
            </span>
          </fieldset>
        }
      ></Form>
    </section>
  );
}

export default Login;

import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import Form from "./Form";
import Label from "./Label";
import InfoTooltip from "./InfoTooltip";
import ClosablePopup from "./hocs/ClosablePopup";
import { CSSTransition } from "react-transition-group";

function Register({
  validation,
  isSaving,
  onRegister,
  isSuccess,
  isOpen,
  onClose,
}) {
  const nodeRef = React.useRef(null);
  const { values, errors, handleChange, isValid, resetForm } = validation;

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      email: values.email || "",
      password: values.password || "",
    });
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <Form
        name="nickname"
        onSubmit={handleSubmit}
        isDisabled={!isValid}
        isSaving={isSaving}
        isBlack
        errors={errors}
        buttonText="Зарегистрироваться"
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
              placeholder="Пароль"
              isBlack
              type="password"
              required
              minLength="4"
              maxLength="16"
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
      <p className="login__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="login__link link">
          Войти
        </Link>
      </p>
      <CSSTransition
        nodeRef={nodeRef}
        in={isOpen}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <ClosablePopup>
          <InfoTooltip
            isSuccess={isSuccess}
            onClose={onClose}
            successText="Вы успешно зарегистрировались!"
            refs={nodeRef}
          />
        </ClosablePopup>
      </CSSTransition>
    </section>
  );
}

export default Register;

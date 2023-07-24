import classes from "../style.module.css";
import forgotPasswordStyle from "./forgot-password-query.module.css";
import image from "../../assets/stethoscope-copy-space.jpg";
import { SlInput } from "@shoelace-style/shoelace/dist/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const formClasses = classes.form + " " + classes["validity-styles"];
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    email: "",
  });
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValidEmail = emailValid.test(email);
    if (isValidEmail) {
      setErrorMessage((prevMesg) => ({
        ...prevMesg,
        email: "",
      }));
      return true;
    } else {
      setErrorMessage((prevMesg) => ({
        ...prevMesg,
        email: "Email must have email format",
      }));
      return false;
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const emailIsValid = validateEmail();
    if (emailIsValid) {
      try {
        const response = await fetch(
          "http://localhost:8080/user/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email: email,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          const resetToken = data.resetToken;
          navigate(`/reset-password/${resetToken}`);
        } else {
          const data = await response.json();
          if (data.error === "email_not_found") {
            setServerError("Wrong Email!");
            console.log("Wrong Email!");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setServerError("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    console.log(errorMessage);
  }, []);

  const buttonClassses = classes.submit + " " + classes["margin-top-6-rem"];

  return (
    <div
      className={`${classes.register} ${forgotPasswordStyle["forgot-password-responsive"]}`}
    >
      <img
        className={`${classes["bg-image"]} ${forgotPasswordStyle["bg-image-forgot-password-responsive"]}`}
        src={image}
        alt="Medicine image"
      />
      <div
        className={`${classes["form-box"]} ${forgotPasswordStyle["form-box-forgot-password-responsive"]}`}
      >
        <form className={formClasses} onSubmit={submitForm}>
          <SlInput
            type="text"
            label="Email"
            value={email}
            onSlInput={(event) => {
              setEmail(event.target.value);
            }}
            helpText={errorMessage.email}
            required
          />
          {serverError && (
            <p className={classes.loginServerError}>{serverError}</p>
          )}
          <button className={buttonClassses}>Reset password</button>
          <p className={classes.subheading}>
            If your email is right you will receive an email to reset your
            password.
          </p>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;

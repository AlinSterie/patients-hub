import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "../style.module.css";
import resetPasswordStyle from "./reset-password-query.module.css";
import image from "../../assets/stethoscope-copy-space.jpg";
import { SlInput } from "@shoelace-style/shoelace/dist/react";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });

  const buttonClasses = classes.submit + " " + classes["margin-top-6-rem"];
  const formClasses = classes.form + " " + classes["validity-styles"];

  const validatePassword = () => {
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{8,30}$/;
    const isValidPassword = regex.test(password);
    const isValidConfirmPassword = password === confirmPassword;

    if (isValidPassword && isValidConfirmPassword) {
      setErrorMessage({ passwordError: "", confirmPasswordError: "" });
      return true;
    } else {
      setErrorMessage((prevMesg) => ({
        ...prevMesg,
        passwordError: isValidPassword
          ? ""
          : "Password must contain at least 1 digit, 1 letter and be between 8 and 30 characters long",
        confirmPasswordError: isValidConfirmPassword
          ? ""
          : "Passwords do not match",
      }));
      return false;
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validatePassword()) {
      try {
        const response = await fetch(
          `http://localhost:8080/user/reset-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              resetToken: resetToken,
              newPassword: password,
              confirmNewPassword: confirmPassword,
            }),
          }
        );
        if (response.ok) {
          console.log("Password reset successful");
          navigate("/login");
        } else {
          const data = await response.json();
          if (data.error === "invalid_reset_token") {
            setErrorMessage((prevMesg) => ({
              ...prevMesg,
              confirmPasswordError: "Invalid reset token",
            }));
          } else if (data.error === "email_not_found") {
            setErrorMessage((prevMesg) => ({
              ...prevMesg,
              confirmPasswordError: "Email not found",
            }));
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage((prevMesg) => ({
          ...prevMesg,
          confirmPasswordError: "An error occurred. Please try again.",
        }));
      }
    } else {
      console.log("Not submit");
    }
  };

  return (
    <div
      className={`${classes.register} ${resetPasswordStyle["reset-password-responsive"]}`}
    >
      <img
        className={`${classes["bg-image"]} ${resetPasswordStyle["bg-image-reset-password-responsive"]}`}
        src={image}
        alt="Stethoscope image"
      />
      <div
        className={`${classes["form-box"]} ${resetPasswordStyle["form-box-reset-password-responsive"]}`}
      >
        <form className={formClasses} onSubmit={handleSubmit} noValidate>
          <SlInput
            type="password"
            size="medium"
            label="New password"
            password-toggle
            required
            value={password}
            onSlChange={handlePasswordChange}
            helpText={errorMessage.passwordError}
          />
          <SlInput
            type="password"
            size="medium"
            label="Confirm password"
            password-toggle
            required
            value={confirmPassword}
            onSlChange={handleConfirmPasswordChange}
            helpText={errorMessage.confirmPasswordError}
          />
          <button className={buttonClasses}>Reset password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

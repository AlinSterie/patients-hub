import classes from "../style.module.css";
import classesStyle from "./login-query.module.css";
import image from "../../assets/background-image.jpg";
import { SlInput } from "@shoelace-style/shoelace/dist/react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
const Login = () => {
  const formClasses = classes.form + " " + classes["validity-styles"];
  const [auth, setAuth] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState(null);

  const validateEmail = () => {
    const emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValidEmail = emailValid.test(email);
    if (isValidEmail) {
      setErrorMessage((prevMesg) => ({ ...prevMesg, email: "" }));
      return true;
    } else {
      setErrorMessage((prevMesg) => ({
        ...prevMesg,
        email: "Email must have email format",
      }));
      return false;
    }
  };

  const validatePassword = () => {
    const passwordValid = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{8,30}$/;
    const isValidPassword = passwordValid.test(password);

    if (isValidPassword) {
      setErrorMessage((prevMesg) => ({ ...prevMesg, password: "" }));

      return true;
    } else {
      setErrorMessage((prevMesg) => ({
        ...prevMesg,
        password: isValidPassword
          ? ""
          : "Password must contain at least 1 digit, 1 letter and be between 8 and 30 characters long",
      }));
      return false;
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    if (isValidEmail && isValidPassword) {
      fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then((res) => {
        if (res.ok) {
          console.log("Logged in!");
          setAuth({ ...auth, retry: true });
        } else {
          return res.json().then((data) => {
            if (data.error === "wrong_email_or_password") {
              setServerError("Wrong Email or Password!");
              console.log("Wrong Email or Password!");
            }
          });
        }
      });
    }
  };
  return (
    <div
      className={`${classes.register} ${classesStyle["register-login-responsive"]}`}
    >
      <img
        className={`${classes["bg-image"]} ${classesStyle["bg-image-login-responsive"]}`}
        src={image}
        alt="Medicine image"
      />
      <div
        className={`${classes["form-box"]} ${classesStyle["form-box-login-responsive"]}`}
      >
        <form className={formClasses} onSubmit={submitForm} noValidate>
          <h1 className={classes.heading}>Login to your account</h1>
          <SlInput
            type="email"
            label="Email"
            value={email}
            onSlInput={(event) => {
              setEmail(event.target.value);
            }}
            helpText={errorMessage.email}
            required
          />
          <SlInput
            type="password"
            size="medium"
            label="Password"
            password-toggle
            value={password}
            onSlInput={(event) => {
              setPassword(event.target.value);
            }}
            helpText={errorMessage.password}
            required
          />
          {serverError && (
            <p className={classes.loginServerError}>{serverError}</p>
          )}
          <button className={classes.submit}>Login</button>

          <p className={classes.subheading}>
            Dont have an account?
            <Link to={"/register"} className={classes.redirect}>
              Join now!
            </Link>
          </p>
          <p className={classes.subheading}>
            Forgot password?
            <Link to={"/forgot-password"} className={classes.redirect}>
              Reset now!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;

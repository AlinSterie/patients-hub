import classes from "../style.module.css";
import classesStyle from "./register-query.module.css";
import image from "../../assets/background-image.jpg";
import { SlInput } from "@shoelace-style/shoelace/dist/react";
import { SlOption, SlSelect } from "@shoelace-style/shoelace/dist/react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
const Register = () => {
  const formClasses = classes.form + " " + classes["validity-styles"];
  const [auth, setAuth] = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [job, setJob] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const obj = {
    name,
    email,
    password,
    confirmPassword,
    function: job,
    speciality,
  };
  const validateName = () => {
    const nameValidate = /^[A-Za-z -]+$/;
    const isValidName = nameValidate.test(name);
    if (isValidName && name.length >= 3) {
      setErrorMessage((prevMesg) => ({
        ...prevMesg,
        name: "",
      }));
      return true;
    } else {
      setErrorMessage((prevMesg) => ({
        ...prevMesg,
        name: "Name must have at least 3 characters and must have only letters, spaces or dash (-)",
      }));
      return false;
    }
  };

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

  const validatePassword = () => {
    const passwordValid = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{8,30}$/;
    const isValidPassword = passwordValid.test(password);
    const isValidConfirmPassword = password === confirmPassword;

    if (isValidPassword && isValidConfirmPassword) {
      setErrorMessage((prevMesg) => ({
        ...prevMesg,
        password: "",
        confirmPassword: "",
      }));
      return true;
    } else {
      setErrorMessage((prevMesg) => ({
        ...prevMesg,
        password: isValidPassword
          ? ""
          : "Password must contain at least 1 digit, 1 letter and be between 8 and 30 characters long",
        confirmPassword: isValidConfirmPassword ? "" : "Passwords do not match",
      }));
      return false;
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    const passwordIsValid = validatePassword();
    if (nameIsValid && emailIsValid && passwordIsValid) {
      const requestedOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(obj),
      };
      try {
        const response = await fetch(
          "http://localhost:8080/user/register",
          requestedOptions
        );
        setAuth({ ...auth, retry: true });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div
      className={`${classes.register} ${classesStyle["register-responsive"]}`}
    >
      <img
        className={`${classes["bg-image"]} ${classesStyle["bg-image-responsive"]}`}
        src={image}
        alt="Medicine image"
      />
      <div
        className={`${classes["form-box"]} ${classesStyle["form-box-responsive"]}`}
      >
        <form className={formClasses} onSubmit={submitForm}>
          <h1 className={classes.heading}>Register now</h1>
          <SlInput
            label="Name"
            value={name}
            onSlInput={(event) => {
              setName(event.target.value);
            }}
            helpText={errorMessage.name}
            required
          />
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
          <SlInput
            type="password"
            size="medium"
            label="Confirm password"
            value={confirmPassword}
            onSlInput={(event) => {
              setConfirmPassword(event.target.value);
            }}
            helpText={errorMessage.confirmPassword}
            password-toggle
            required
          />
          <div>
            <label>Function</label>
            <SlSelect
              value={job}
              onSlInput={(event) => setJob(event.target.value)}
              required
            >
              <SlOption value="medic">Medic</SlOption>
              <SlOption value="resident">Resident</SlOption>
              <SlOption value="administrative">Administrative</SlOption>
            </SlSelect>
          </div>
          <div>
            <label>Speciality</label>
            <SlSelect
              value={speciality}
              onSlInput={(event) => setSpeciality(event.target.value)}
              required
            >
              <SlOption value="anesthesiology">Anesthesiology</SlOption>
              <SlOption value="cardiology">Cardiology</SlOption>
              <SlOption value="dermathology">Dermathology</SlOption>
              <SlOption value="gastroenterology">Gastroenterology</SlOption>
              <SlOption value="pediatrics">Pediatrics</SlOption>
              <SlOption value="internal-medicine">Internal Medicine</SlOption>
              <SlOption value="neurology">Neurology</SlOption>
              <SlOption value="oncology">Oncology</SlOption>
              <SlOption value="plastic-surgery">Plastic Surgery</SlOption>
              <SlOption value="general-surgery">General Surgery</SlOption>
            </SlSelect>
          </div>

          <button className={classes.submit}>Sign up</button>

          <p className={classes.subheading}>
            Already have an account?
            <Link to={"/"} className={classes.redirect}>
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;

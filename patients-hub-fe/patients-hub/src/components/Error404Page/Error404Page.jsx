import classes from "./Err404Page.module.css";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/register");
  };
  return (
    <div className={classes.container}>
      <div className={classes.error}>
        <p className={classes.sorry}>SORRY!</p>
        <p className={classes["error-name"]}>404 - PAGE CAN'T BE FOUND</p>
        <button onClick={redirect} className={classes.redirect}>
          Let's create an account
        </button>
      </div>
    </div>
  );
};
export default ErrorPage;

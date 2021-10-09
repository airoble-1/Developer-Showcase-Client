import LoginForm from "../components/LoginForm"
import classes from "./login.module.css"
const LoginPage = () => {
  return (
    <div
      className={`${classes.login} d-flex align-items-center justify-content-center`}
    >
      <LoginForm />
    </div>
  )
}

export default LoginPage

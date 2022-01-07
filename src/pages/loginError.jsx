import { Container } from "react-bootstrap"
import classes from "./loginError.module.css"
const LoginErrorPage = () => {
  return (
    <Container
      className={`${
        classes[`login-error`]
      } d-flex align-items-center justify-content-center`}
    >
      <h1 className="text-danger">{`Error: password and/or username is incorrect`}</h1>
    </Container>
  )
}

export default LoginErrorPage

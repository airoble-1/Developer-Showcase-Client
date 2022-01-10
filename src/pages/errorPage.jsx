import { Container } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import classes from "./errorPage.module.css"

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <Container
      className={`${
        classes[`login-error`]
      } d-flex flex-column  align-items-center justify-content-center`}
    >
      <h1 className="text-danger">{`Error: Requested page doesn't exist =(`}</h1>
      <h2>Go Home ?</h2>
      <Button
        variant="info"
        className="mt-2 mx-2 d-block"
        onClick={() => navigate("/")}
      >
        Home
      </Button>
    </Container>
  )
}

export default ErrorPage

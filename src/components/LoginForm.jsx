import { Navigate, Link } from "react-router-dom"
import { useState, useContext } from "react"
import { UserContext } from "../store/UserContext"
import { Form, Button, Col, Row, Container, Spinner } from "react-bootstrap"
import { useMutation, gql } from "@apollo/client"
import classes from "./LoginForm.module.css"
const LOGIN_USER = gql`
  mutation UserLogin($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        username
        id
      }
    }
  }
`
const INITIAL_ERROR_STATE = { email: "", password: "" }
const LoginForm = () => {
  const { user, setUser } = useContext(UserContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState(INITIAL_ERROR_STATE)
  const [LoginMutation, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: ({ login }) => {
      setUser({
        token: login.jwt,
        userId: login.user.id,
      })
    },
  })
  // a lot of these functions should be moved outside of LoginForm to be accessible so unit tests can be written for them.
  function validateEmail(email) {
    const re = /(.+)@(.+){2,}\.(.+){2,}/
    return re.test(String(email).toLowerCase())
  }

  function ValidatePassword(password) {
    return password.length > 0
  }

  function validateForm() {
    return validateEmail(email) && ValidatePassword(password)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (validateForm()) {
      LoginMutation({
        variables: {
          input: {
            identifier: email,
            password: password,
          },
        },
      })
      setEmail("")
      setPassword("")
    } else {
      setErrors({ ...errors, email: "Please enter valid email" })
    }
  }

  if (loading) return <Spinner animation="grow" />
  if (error) return <Navigate to="/login-error" />
  if (user) return <Navigate to="/" />

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={10} md={8} xl={6}>
          <div className={classes[`box`]}>
            <h1 className="text-center">Welcome back</h1>
            <p className="text-center">
              Login and share your developer journey!
            </p>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-2" size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="py-2"
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2" size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="py-2"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Link
                className="text-secondary d-inline-block mx-3"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
              <div className="d-flex justify-content-center mt-2">
                <Button
                  className="my-2 btn-success rounded-pill py-2 fs-5 fw-bold w-50"
                  type="submit"
                >
                  Log in
                </Button>
              </div>
              <p className="text-center">
                Don't have an account?
                <Link
                  className="text-secondary text-decoration-underline d-inline-block"
                  to="/signup"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm

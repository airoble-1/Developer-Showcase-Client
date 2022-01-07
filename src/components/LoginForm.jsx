import { Navigate, useNavigate, Link } from "react-router-dom"
import { useState, useContext } from "react"
import { UserContext } from "../store/UserContext"
import { Form, Button, Col, Row, Container, Spinner } from "react-bootstrap"
import { useMutation, gql } from "@apollo/client"

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
  const navigate = useNavigate()
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
        <Col sm={12} md={6} xl={4}>
          <Form onSubmit={submitHandler}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
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
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="mt-2 btn-success" type="submit">
              Login
            </Button>
            <Button
              variant="info"
              className="mt-2 mx-2"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>

            <Link
              className="text-secondary d-inline-block mx-3"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm

import { Redirect } from "react-router"
import { useHistory } from "react-router"
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

const LoginForm = () => {
  const { user, setUser } = useContext(UserContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()
  const [LoginMutation, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const { login } = data
      setUser({
        token: login.jwt,
        userId: login.user.id,
      })
    },
  })

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
    if (!validateForm()) {
      return
    }
    LoginMutation({
      variables: {
        input: {
          identifier: email,
          password: password,
        },
      },
    })

    alert("Form has been submitted =)")
    setEmail("")
    setPassword("")

    if (loading) return <Spinner animation="grow"></Spinner>
    if (error) return <h1>Unable to Login</h1>
    if (user) return <Redirect to="/" />
  }
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col sm={12} md={6} xl={4}>
          <Form className={classes.login} onSubmit={submitHandler}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
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
            <Button className="mt-2" type="submit">
              Login
            </Button>
            <Button
              variant="secondary"
              className="mt-2 mx-2"
              onClick={() => history.goBack()}
            >
              Go Back
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm
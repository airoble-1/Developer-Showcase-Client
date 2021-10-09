import { useState } from "react"
import { Form, Button, Col, Row, Container } from "react-bootstrap"
import classes from "./LoginForm.module.css"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
    alert("Form has been submitted =)")
    setEmail("")
    setPassword("")
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
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                required
              />
            </Form.Group>
            <Button className="mt-2" type="submit" disabled={!validateForm()}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm

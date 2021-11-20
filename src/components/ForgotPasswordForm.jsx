import { useState } from "react"
import { Form, Button, Col, Row, Container, Spinner } from "react-bootstrap"
import { useMutation } from "@apollo/client"
import { FORGOT_PASSWORD_MUTATTION } from "../apollo/mutations/forgotPassword"

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("")
  const [forgotPasswordMutation, { data, loading, error }] = useMutation(
    FORGOT_PASSWORD_MUTATTION,
    {
      variables: {
        email,
      },
    }
  )
  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  function validateForm() {
    return validateEmail(email)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    forgotPasswordMutation()
    setEmail("")
  }
  if (error) return <h1>Oops something went wrong!</h1>
  if (loading) return <Spinner animation="grow" />
  if (data) return <h1>Link sent to your email</h1>
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col sm={10} md={5} xl={3}>
          <div>
            <h1>Reset Your Password</h1>
            <p>
              Enter the email address associated with your account to reset your
              password.
            </p>
          </div>
          <Form onSubmit={submitHandler}>
            <Form.Group size="lg" controlId="email">
              <Form.Control
                type="email"
                placeholder="Email address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button
                className="mt-2 btn-success rounded-pill w-50"
                type="submit"
              >
                Continue
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ForgotPasswordForm

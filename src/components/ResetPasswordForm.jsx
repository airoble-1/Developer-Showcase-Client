import { useState } from "react"
import { Form, Button, Col, Row, Container, Spinner } from "react-bootstrap"
import { useMutation } from "@apollo/client"
import { Redirect, useParams } from "react-router"
import { RESET_PASSWORD_MUTATTION } from "../apollo/mutations/resetPassword"

const LoginForm = () => {
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState("")

  const { code } = useParams()
  console.log(code)
  const [resetPasswordFnc, { data, loading, error }] = useMutation(
    RESET_PASSWORD_MUTATTION,
    {
      variables: {
        password,
        passwordConfirm,
        code,
      },
    }
  )
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== "" && passwordConfirm !== "") {
      if (password === passwordConfirm) {
        resetPasswordFnc()
      } else {
        setFormError({ message: `Passwords do not match!` })
        return
      }
    } else {
      setFormError({ message: `Empty field please enter new password` })
      return
    }

    setPassword("")
    setPasswordConfirm("")
    setFormError("")
  }

  if (error) return <h1>Oops something went wrong!</h1>
  if (loading) return <Spinner animation="grow" />
  if (data) return <Redirect to="/login" />

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col sm={12} md={6} xl={4}>
          <Form onSubmit={submitHandler}>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={formError}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="passwordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirm"
                placeholder="confirm password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                isInvalid={formError}
              />
              <Form.Control.Feedback type="invalid">
                {formError.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                className="mt-2 btn-success rounded-pill w-50"
                type="submit"
              >
                Confirm
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm

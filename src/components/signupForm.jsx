import { useRef, useState } from "react"
import { useMutation } from "@apollo/client"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import useForm from "./../hooks/useForm"
import createUserMutation from "../apollo/mutations/createUser"
import uploadImageMutation from "./../apollo/mutations/uploadProfileImage"
import classes from "./signupForm.module.css"
export default function AddProject() {
  const [isUploading, setisUploading] = useState(false)
  const fileInput = useRef()

  const [createUser, { error: errorUser }] = useMutation(createUserMutation)

  const [uploadImageFnc, { error: errorFile }] =
    useMutation(uploadImageMutation)

  const navigate = useNavigate()

  const {
    handleChange,
    clearFields,
    handleUrlValidation,
    errors,
    setErrorMessages,
    values,
  } = useForm()

  const {
    username,
    email,
    password,
    firstName,
    lastName,
    linkedIn,
    gitHub,
    website,
    resume,
  } = values

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!values.file || errors.gitHub || errors.email) return
    setisUploading(true)
    const createUserResponse = await createUser({
      variables: {
        input: {
          data: {
            username,
            email,
            password,
            firstName,
            lastName,
            confirmed: true,
            blocked: false,
            userType: "Developer",
            linkedIn,
            gitHub,
            website,
            resume,
          },
        },
      },
    })

    if (errorUser)
      return <h1>{errorUser.message} Unable to create new project</h1>

    const uploadImageResponse = await uploadImageFnc({
      variables: {
        collectionName: "user",
        collectionId: createUserResponse.data.createUser.user.id,
        fieldName: "profileImage",
        fileName: fileInput.current.files[0],
        source: "users-permissions",
      },
    })

    if (errorFile) {
      setisUploading(false)
      return <h1>{errorFile.message} Unable to upload image to project</h1>
    }

    const { data } = uploadImageResponse
    if (data) setisUploading(false)
    navigate("/login")
  }
  let errorMessages = setErrorMessages()

  return (
    <Row className="d-flex justify-content-center mt-4">
      <Col xs={12} sm={10} md={8}>
        <div className={classes[`box`]}>
          <h1 className="text-center">Get started with DevHunter</h1>
          <p className="text-center">
            Signup now and share your developer journey!
          </p>
          <Form onSubmit={handleSubmit}>
            <fieldset disabled={isUploading}>
              <Row>
                <Col className="col-12 col-lg-6">
                  <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label className="fw-bold">First Name</Form.Label>
                    <Form.Control
                      name="firstName"
                      type="text"
                      value={values.firstName || ""}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-lg-6">
                  <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label className="fw-bold">Last Name</Form.Label>
                    <Form.Control
                      name="lastName"
                      type="text"
                      value={values.lastName || ""}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="fw-bold">Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      value={values.email || ""}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-lg-6">
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="fw-bold">Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      value={values.password || ""}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required
                      min={6}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col className="col-12 col-lg-6">
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label className="fw-bold">Username</Form.Label>
                    <Form.Control
                      name="username"
                      type="text"
                      value={values.username || ""}
                      onChange={handleChange}
                      placeholder="Enter username"
                      required
                      isInvalid={errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessages.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col className="col-12 col-lg-6">
                  <Form.Group className="mb-3" controlId="profileImage">
                    <Form.Label className="fw-bold">Profile Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="file"
                      onChange={handleChange}
                      required
                      ref={fileInput}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col className="col-12 col-lg-6">
                  <Form.Group className="mb-3" controlId="gitHub">
                    <Form.Label className="fw-bold">GitHub</Form.Label>
                    <Form.Control
                      name="gitHub"
                      type="url"
                      pattern="https://.*"
                      value={values.gitHub || ""}
                      onChange={handleChange}
                      onBlur={handleUrlValidation}
                      placeholder="Enter GitHub url"
                      required
                      isInvalid={errors.gitHub}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessages.gitHub}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col className="col-12 col-lg-6">
                  <Form.Group className="mb-3" controlId="project-website">
                    <Form.Label className="fw-bold">Website</Form.Label>
                    <Form.Control
                      name="website"
                      type="url"
                      pattern="https://.*"
                      value={values.website || ""}
                      onBlur={handleUrlValidation}
                      onChange={handleChange}
                      placeholder="Enter portfolio site url"
                      required
                      isInvalid={errors.website}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessages.website}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="col-12 col-lg-6">
                  <Form.Group className="mb-3" controlId="resume">
                    <Form.Label className="fw-bold">Resume</Form.Label>
                    <Form.Control
                      name="resume"
                      type="text"
                      value={values.resume || ""}
                      onChange={handleChange}
                      onBlur={handleUrlValidation}
                      placeholder="Enter resume url"
                      required
                      isInvalid={errors.resume}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessages.resume}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col className="col-12 col-lg-6">
                  <Form.Group className="mb-3" controlId="linkedIn">
                    <Form.Label className="fw-bold">LinkedIn</Form.Label>
                    <Form.Control
                      name="linkedIn"
                      type="url"
                      placeholder="Enter linkedIn url"
                      pattern="https://.*"
                      value={values.linkedIn || ""}
                      onBlur={handleUrlValidation}
                      onChange={handleChange}
                      required
                      isInvalid={errors.linkedIn}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessages.linkedIn}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-between rounded">
                <Button variant="secondary" type="submit" onClick={clearFields}>
                  Clear
                </Button>
              </div>
              <div className="d-flex justify-content-center my-2">
                <Button
                  className={`${
                    classes[`btn`]
                  }my-2 btn-success rounded-pill py-2 px-5 fs-5 fw-bold`}
                  type="submit"
                >
                  Sign up
                </Button>
              </div>
              <p className="text-center">
                Already have an account?
                <Link
                  className="text-secondary text-decoration-underline d-inline-block"
                  to="/login"
                >
                  Log in
                </Link>
              </p>
            </fieldset>
          </Form>
        </div>
      </Col>
    </Row>
  )
}

import { useRef, useState } from "react"
import { useMutation } from "@apollo/client"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import useForm from "./../hooks/useForm"
import createUserMutation from "../apollo/mutations/createUser"
import uploadImageMutation from "./../apollo/mutations/uploadProfileImage"

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
    <Form className="my-4 p-2 rounded shadow" onSubmit={handleSubmit}>
      <fieldset disabled={isUploading}>
        <Row>
          <Col>
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
          <Col>
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
          <Col>
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
          <Col>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="fw-bold">Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                value={values.username || ""}
                onChange={handleChange}
                onBlur={handleUrlValidation}
                placeholder="Enter username"
                required
                isInvalid={errors.resume}
              />
              <Form.Control.Feedback type="invalid">
                {errorMessages.username}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
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
          <Col>
            <Form.Group className="mb-3" controlId="gitHub">
              <Form.Label className="fw-bold">GitHub</Form.Label>
              <Form.Control
                name="gitHub"
                type="text"
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

          <Col>
            <Form.Group className="mb-3" controlId="project-website">
              <Form.Label className="fw-bold">Website</Form.Label>
              <Form.Control
                name="website"
                type="text"
                value={values.website || ""}
                onBlur={handleUrlValidation}
                onChange={handleChange}
                placeholder="Enter live site url"
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
          <Col>
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

          <Col>
            <Form.Group className="mb-3" controlId="linkedIn">
              <Form.Label className="fw-bold">LinkedIn</Form.Label>
              <Form.Control
                name="linkedIn"
                type="url"
                placeholder="https://www.example.com"
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

        <div className="d-flex justify-content-between">
          <div>
            <Button className="me-2" variant="primary" type="submit">
              Sign Up
            </Button>
            <Button variant="secondary" type="submit" onClick={clearFields}>
              Clear
            </Button>
          </div>
          <Button onClick={() => navigate(-1)} variant="primary" type="button">
            Go Back
          </Button>
        </div>
      </fieldset>
    </Form>
  )
}

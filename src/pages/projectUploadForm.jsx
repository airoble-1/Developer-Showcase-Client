import { useRef, useContext, useState } from "react"
import { useMutation } from "@apollo/client"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { useHistory } from "react-router"
import { UserContext } from "../store/UserContext"

import useForm from "./../hooks/useForm"
import createProjectMutation from "../apollo/mutations/createProject"
import uploadFeatureImageMutation from "../apollo/mutations/uploadFeaturedImage"
import PROJECTS from "../apollo/queries/projects"
const ProjectUploadForm = () => {
  const { user } = useContext(UserContext)
  const { userId } = user
  const fileInput = useRef()
  const [createProject, { error: errorProject }] = useMutation(
    createProjectMutation
  )
  const [uploadFeaturedImage, { error: errorFile }] = useMutation(
    uploadFeatureImageMutation
  )
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const {
    handleChange,
    clearFields,
    handleUrlValidation,
    errors,
    setErrorMessages,
    values,
  } = useForm()

  const { name, site, github, description } = values

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!values.file || errors.github || errors.site) return
    setIsLoading(true)
    const createProjectResponse = await createProject({
      variables: {
        name,
        description,
        site,
        github,
        userId,
      },
    })

    if (errorProject)
      return <h1>{errorProject.message} Unable to create new project</h1>

    const uploadImageResponse = await uploadFeaturedImage({
      variables: {
        collectionName: "project",
        collectionId: createProjectResponse.data.createProject.project.id,
        fieldName: "featuredImage",
        fileName: fileInput.current.files[0],
      },
      refetchQueries: [{ query: PROJECTS }],
    })

    if (errorFile)
      return <h1>{errorFile.message} Unable to upload image to project</h1>
    const { data } = uploadImageResponse
    if (data) setIsLoading(false)
    history.push("/")
  }

  let errorMessages = setErrorMessages()

  return (
    <Container>
      <Form className="my-4 p-2 rounded shadow" onSubmit={handleSubmit}>
        <fieldset disabled={isLoading}>
          <Form.Group className="mb-3" controlId="project-name">
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={values.name || ""}
              onChange={handleChange}
              placeholder="Enter name of project"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="project-desc">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              value={values.description || ""}
              onChange={handleChange}
              placeholder="Enter description of project"
              required
              rows="3"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="project-file">
            <Form.Label className="fw-bold">Image</Form.Label>
            <Form.Control
              type="file"
              name="file"
              onChange={handleChange}
              required
              ref={fileInput}
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="project-gitHub">
                <Form.Label className="fw-bold">GitHub</Form.Label>
                <Form.Control
                  name="github"
                  type="text"
                  value={values.github || ""}
                  onChange={handleChange}
                  onBlur={handleUrlValidation}
                  placeholder="Enter GitHub url"
                  required
                  isInvalid={errors.github}
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessages.github}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="project-website">
                <Form.Label className="fw-bold">Live Site</Form.Label>
                <Form.Control
                  name="site"
                  type="text"
                  value={values.site || ""}
                  onBlur={handleUrlValidation}
                  onChange={handleChange}
                  placeholder="Enter live site url"
                  required
                  isInvalid={errors.site}
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessages.site}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-between">
            <div>
              <Button className="me-2" variant="primary" type="submit">
                Upload Project
              </Button>
              <Button variant="secondary" type="submit" onClick={clearFields}>
                Clear
              </Button>
            </div>
            <Button
              onClick={() => history.goBack()}
              variant="primary"
              type="submit"
            >
              Go Back
            </Button>
          </div>
        </fieldset>
      </Form>
    </Container>
  )
}

export default ProjectUploadForm

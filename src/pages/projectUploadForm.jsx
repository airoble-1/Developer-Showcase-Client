import { useState } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { useHistory } from "react-router"
import useForm from "./../hooks/useForm"
import { validate } from "./ProjectFormValidationRules"
const ProjectUploadForm = () => {
  const history = useHistory()
  const { values, handleChange, clearFields, handleValidation, errors } =
    useForm(validate)

  return (
    <Container>
      <Form className="my-4 p-2 rounded shadow" onSubmit>
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
            value={values.file || ""}
            onChange={handleChange}
            isInvalid=""
            required
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
                onBlur={handleValidation}
                placeholder="Enter GitHub url"
                require
                isInvalid={errors.github}
              />
              <Form.Control.Feedback type="invalid">
                {errors.github}
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
                onBlur={handleValidation}
                onChange={handleChange}
                placeholder="Enter live site url"
                required
                isInvalid={errors.site}
              />
              <Form.Control.Feedback type="invalid">
                {errors.site}
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
      </Form>
    </Container>
  )
}

export default ProjectUploadForm

import { Form, Button, Container, Row, Col } from "react-bootstrap"

const ProjectUploadForm = () => {
  const handleSubmit = () => {}

  return (
    <Container>
      <Form className="my-4 p-2 rounded shadow" onSubmit={() => handleSubmit}>
        <Form.Group className="mb-3" controlId="project-name">
          <Form.Label className="fw-bold">Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value=""
            onChange=""
            placeholder="Enter name of project"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="project-desc">
          <Form.Label className="fw-bold">Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            value=""
            onChange=""
            placeholder="Enter description of project"
            required
            rows="3"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="project-file">
          <Form.Label className="fw-bold">Image</Form.Label>
          <Form.Control
            type="file"
            required
            name="file"
            onChange=""
            isInvalid=""
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="project-gitHub">
              <Form.Label className="fw-bold">GitHub</Form.Label>
              <Form.Control
                name="githubUrl"
                type="text"
                value=""
                onChange=""
                placeholder="Enter GitHub url"
                required
                onBlur=""
                isInvalid="true"
              />
              <Form.Control.Feedback type="invalid">
                {" "}
                Please provide a valid url
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="project-website">
              <Form.Label className="fw-bold">Live Site</Form.Label>
              <Form.Control
                name="name"
                type="text"
                value=""
                onChange=""
                placeholder="Enter live site url"
                required
                onBlur=""
                isInvalid="true"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid url
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <div>
            <Button className="me-2" variant="primary" type="submit">
              Upload Project
            </Button>
            <Button variant="secondary" type="submit">
              Clear
            </Button>
          </div>
          <Button variant="primary" type="submit">
            Go Back
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default ProjectUploadForm

import { useContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useMutation } from "@apollo/client"
import { Form, Button, Row, Col, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../store/UserContext"
import { useQuery } from "@apollo/client"
import DatePicker from "react-datepicker"
import useForm from "./../hooks/useForm"
import PROJECTS from "../apollo/queries/projects"
import { CREATE_ISSUE } from "../apollo/mutations/createIssue"
import "react-datepicker/dist/react-datepicker.css"

const AddIssue = ({
  setShowAddIssueForm = () => {},
  projectId,
  query,
  variables,
}) => {
  const initialState = {
    description: "",
    project: "",
    type: "",
    priority: "",
    severity: "",
  }
  const [isUploading, setisUploading] = useState(false)
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const { userId } = user
  const { handleChange, clearFields, values } = useForm(initialState)
  const [errors, setErrors] = useState({
    type: false,
    priority: false,
    severity: false,
    description: false,
    project: false,
  })

  const handleBlur = (event) => {
    if (event.target.value) {
      setErrors((errors) => ({ ...errors, [event.target.name]: false }))
    } else {
      setErrors((errors) => ({ ...errors, [event.target.name]: true }))
    }
  }

  const setErrorMessages = () => {
    let errorMessages = {}
    if (!values.type) errorMessages.type = "Type is required"
    if (!values.priority) errorMessages.priority = "Priority is required"
    if (!values.severity) errorMessages.severity = "Severity is required"
    if (!values.description)
      errorMessages.description = "Description is required"
    if (!values.project) errorMessages.project = "Project is required"
    return errorMessages
  }

  let errorMessages = setErrorMessages()

  const { description, type, project, priority, severity } = values
  const [dueDate, setDueDate] = useState(new Date())

  const types = [
    { id: "bug", value: "bug" },
    { id: "feature", value: "feature" },
  ]

  const priorities = [
    { value: "immediate" },
    { value: "high" },
    { value: "medium" },
    { value: "low" },
  ]

  const severities = [
    { value: "critical" },
    { value: "major" },
    { value: "minor" },
    { value: "low" },
  ]

  const {
    data,
    loading: loadingProjects,
    error: errorProjects,
  } = useQuery(PROJECTS)

  const [createIssueFnc, { error: issueError, loading: uploadingIssue }] =
    useMutation(CREATE_ISSUE)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      errors.type ||
      errors.description ||
      errors.project ||
      errors.priority ||
      errors.severity
    )
      return
    setisUploading(true)
    const createIssueResponse = await createIssueFnc({
      variables: {
        input: {
          data: {
            type,
            priority,
            severity,
            description,
            project: projectId || project,
            status: "new",
            createdBy: userId,
            dueDate,
          },
        },
      },
      refetchQueries: [{ query, variables }],
    })
    setisUploading(false)
    clearFields()
    setShowAddIssueForm((prevState) => !prevState)
  }
  if (uploadingIssue) return <Spinner aniamtion="grow" />
  if (issueError) return `Error! Unable to create Issue`
  return (
    <Form className="my-4 p-2 rounded shadow bg-white" onSubmit={handleSubmit}>
      <fieldset disabled={isUploading}>
        <Form.Group className="mb-3" controlId="issue-description">
          <Form.Label className="fw-bold">Brief Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            value={values.description || ""}
            onChange={handleChange}
            placeholder="Enter brief description of issue"
            required
            maxLength={50}
            isInvalid={errors.description}
            onBlur={handleBlur}
          />
          <Form.Control.Feedback type="invalid">
            {errorMessages.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group className="mb-3" controlId="issue-type">
              <Form.Label className="fw-bold">Type</Form.Label>
              <Form.Select
                name="type"
                value={values.type || ""}
                onChange={handleChange}
                required
                onBlur={handleBlur}
                isInvalid={errors.type}
              >
                <option value="">Select Type</option>
                {types.map((type) => (
                  <option key={uuidv4()} value={type.value}>
                    {type.value}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errorMessages.type}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="issue-date">
              <Form.Label className="fw-bold">Due Date</Form.Label>
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="project-name">
              <Form.Label className="fw-bold">Project</Form.Label>
              {loadingProjects ? (
                <Spinner animation="grow" />
              ) : (
                <Form.Select
                  name="project"
                  value={projectId || values.project}
                  onChange={handleChange}
                  disabled={projectId}
                  required
                  onBlur={handleBlur}
                  isInvalid={errors.project}
                >
                  <option value="">Select Project</option>
                  {data?.projects.map((project) => (
                    <option key={uuidv4()} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </Form.Select>
              )}
              <Form.Control.Feedback type="invalid">
                {errorMessages.project}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group className="mb-3" controlId="issue-priority">
              <Form.Label className="fw-bold">Priority</Form.Label>
              <Form.Select
                name="priority"
                value={values.priority || ""}
                onChange={handleChange}
                required
                isInvalid={errors.priority}
                onBlur={handleBlur}
              >
                <option value="">Select Priority</option>
                {priorities.map((type) => (
                  <option key={uuidv4()} value={type.value}>
                    {type.value}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errorMessages.priority}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="issue-severity">
              <Form.Label className="fw-bold">Severity</Form.Label>
              <Form.Select
                name="severity"
                value={values.severity || ""}
                onChange={handleChange}
                required
                onBlur={handleBlur}
                isInvalid={errors.severity}
              >
                <option value="">Select Serverity</option>
                {severities.map((type) => (
                  <option key={uuidv4()} value={type.value}>
                    {type.value}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errorMessages.severity}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <div>
            <Button className="me-2" variant="primary" type="submit">
              Add Issue
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

export default AddIssue

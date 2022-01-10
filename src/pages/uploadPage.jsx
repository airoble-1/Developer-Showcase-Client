import { Container } from "react-bootstrap"
import AddPost from "../components/AddPost"
import AddProject from "../components/AddProject"

const ProjectUploadForm = () => {
  return (
    <Container>
      <AddProject />
      <AddPost />
    </Container>
  )
}

export default ProjectUploadForm

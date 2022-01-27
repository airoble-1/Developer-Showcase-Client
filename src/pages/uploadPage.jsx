import { Container } from "react-bootstrap"
import { Routes, Route, Link } from "react-router-dom"
import AddIssue from "../components/AddIssue"
import AddPost from "../components/AddPost"
import AddProject from "../components/AddProject"
import { GET_ISSUES } from "../apollo/queries/getIssues"

const ProjectUploadForm = () => {
  return (
    <Container>
      <div className="my-4 p-2 rounded shadow bg-white">
        <h1 className="text-center">Media Library Upload</h1>
        <nav className="nav nav-tabs">
          <Link to={`project`} className="link nav-item nav-link">
            Project
          </Link>
          <Link to={`post`} className="link nav-link">
            Post
          </Link>
          <Link to={`issue`} className="link nav-link">
            Issue
          </Link>
        </nav>
        <Routes>
          <Route path={`/project`} element={<AddProject />} />
          <Route path={`/post`} element={<AddPost />} />
          <Route path={"/issue"} element={<AddIssue query={GET_ISSUES} />} />
        </Routes>
      </div>
    </Container>
  )
}

export default ProjectUploadForm

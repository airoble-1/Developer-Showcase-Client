import { useQuery } from "@apollo/client"
import { Container, Row } from "react-bootstrap"
import ProjectCard from "./ProjectCard"
import PROJECTS from "../apollo/queries/projects"

const ProjectGallery = () => {
  const { loading, error, data } = useQuery(PROJECTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <Container className="my-4">
      <Row xs={1} md={2} xl={3}>
        {data.projects.map((project) => {
          return <ProjectCard key={project.id} project={project} />
        })}
      </Row>
    </Container>
  )
}

export default ProjectGallery

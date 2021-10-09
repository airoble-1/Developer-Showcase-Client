import { gql, useQuery } from "@apollo/client"
import { Container, Row, Col } from "react-bootstrap"
import ProjectCard from "./ProjectCard"

const PROJECTS = gql`
  query Projects {
    projects {
      id
      featuredImage {
        url
      }
      developer {
        firstName
        lastName
        profileImage {
          url
        }
      }
      likesCount
      name
      description
    }
  }
`

const ProjectGallery = () => {
  const { loading, error, data } = useQuery(PROJECTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <Container className="mt-4">
      <Row xs={1} md={2} xl={3}>
        {data.projects.map((project) => {
          return <ProjectCard key={project.id} project={project} />
        })}
      </Row>
    </Container>
  )
}

export default ProjectGallery

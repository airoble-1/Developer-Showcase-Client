import { AiOutlineFire } from "react-icons/ai"
import { Card, Button, Col } from "react-bootstrap"
import "./../App.css"
import classes from "./ProjectCard.module.css"
import { useHistory } from "react-router"
const ProjectCard = ({ project }) => {
  const history = useHistory()
  return (
    <Col className="gy-3">
      <Card className={classes.box}>
        <Card.Img variant="top" src={project.featuredImage.url} />
        <div className="mt-2 px-4 d-flex justify-content-between align-items-center">
          <img
            className={classes.profile}
            src={project.developer.profileImage.url}
            alt={`${project.developer.firstName} ${project.developer.lastName}`}
          ></img>
          <div className="d-flex flex-column align-items-center">
            <AiOutlineFire size="2.5rem" />
            <span>{project.likesCount}</span>
          </div>
        </div>
        <Card.Body>
          <Card.Title>{project.name}</Card.Title>
          <Card.Text>
            {project.description.substring(0, 151)}
            {project.description.length >= 150 && `...`}
          </Card.Text>
          <Button className="details" onClick={() => history.push("/details")}>
            Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ProjectCard

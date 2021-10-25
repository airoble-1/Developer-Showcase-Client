import { useMutation, gql, useQuery } from "@apollo/client"
import { AiOutlineFire, AiFillFire } from "react-icons/ai"
import { Card, Button, Col } from "react-bootstrap"
import "./../App.css"
import classes from "./ProjectCard.module.css"
import { useHistory } from "react-router"
import { useContext } from "react"
import { UserContext } from "../store/UserContext"

const CREATE_LIKE = gql`
  mutation AddOneLike($input: createLikeInput!) {
    createLike(input: $input) {
      like {
        id
      }
    }
  }
`

const COUNT_LIKES = gql`
  query likesPerProject($projectID: ID!) {
    likes(where: { project: { id: $projectID } }) {
      id
      user {
        id
        firstName
        lastName
      }
    }
  }
`

const ProjectCard = ({ project }) => {
  const history = useHistory()
  const { user } = useContext(UserContext)

  // create like for project and refetch the likes count
  const [CreateLikeMutation, { error: likeError }] = useMutation(CREATE_LIKE, {
    refetchQueries: [
      { query: COUNT_LIKES, variables: { projectID: project.id } },
    ],
  })
  // Initial likes count
  const { error, data, loading } = useQuery(COUNT_LIKES, {
    variables: { projectID: project.id },
  })

  // function handles like clicks
  const Addlike = () => {
    if (!user) history.push("/login")
    else {
      CreateLikeMutation({
        variables: {
          input: {
            data: {
              project: project.id,
              user: user.userId,
            },
          },
        },
      })
    }
  }

  const checkIfProjectLiked = function (likes, user) {
    return user ? likes.find((like) => like.user.id === user.userId) : false
  }
  const handleProjectDetails = () => {
    if (!user) history.push("/login")
    else history.push(`/details/${project.id}`)
  }

  if (loading) return <p>Loading...</p>
  if (error || likeError) return <p>Error</p>
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
            {checkIfProjectLiked(data.likes, user) ? (
              <AiFillFire color="red" size="2.5rem" onClick={Addlike} />
            ) : (
              <AiOutlineFire size="2.5rem" onClick={Addlike} />
            )}
            <span>{data.likes.length}</span>
          </div>
        </div>
        <Card.Body>
          <Card.Title>{project.name}</Card.Title>
          <Card.Text>
            {project.description.substring(0, 151)}
            {project.description.length >= 150 && `...`}
          </Card.Text>
          <Button className="details" onClick={handleProjectDetails}>
            Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ProjectCard

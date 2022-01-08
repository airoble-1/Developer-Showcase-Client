import { useMutation, useQuery, useLazyQuery } from "@apollo/client"
import { AiOutlineFire, AiFillFire } from "react-icons/ai"
import { Card, Button, Col } from "react-bootstrap"
import "./../App.css"
import classes from "./ProjectCard.module.css"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../store/UserContext"
import COUNT_LIKES from "../apollo/queries/likesPerProject"
import { CREATE_LIKE } from "../apollo/mutations/createLike"
import { findLike } from "../apollo/queries/findLike"
import { deleteLike } from "../apollo/mutations/deleteLike"

const ProjectCard = ({ project }) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  // Initial likes count
  const { error, data, loading } = useQuery(COUNT_LIKES, {
    variables: { projectID: project.id },
  })

  // create like for project and refetch the likes count
  const [CreateLikeMutation, { error: likeError }] = useMutation(CREATE_LIKE, {
    refetchQueries: [
      { query: COUNT_LIKES, variables: { projectID: project.id } },
    ],
  })

  // function handles like clicks
  const Addlike = () => {
    if (!user) navigate("/login")
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
  const [deleteLikeId] = useMutation(deleteLike)

  const DeleteLike = () => {
    findLikeId({
      variables: {
        projectId: project.id,
        userId: user.userId,
      },
    })
  }

  const [findLikeId] = useLazyQuery(findLike, {
    onCompleted: (data) => {
      if (data.likes[0].id) {
        deleteLikeId({
          variables: {
            input: {
              where: {
                id: data.likes[0].id,
              },
            },
          },
          refetchQueries: [
            { query: COUNT_LIKES, variables: { projectID: project.id } },
          ],
        })
      }
    },
  })

  if (loading) return <p>Loading...</p>
  if (error || likeError) return <p>Error</p>
  return (
    <Col className="gy-3">
      <Card className={classes.box}>
        <Card.Img
          className={classes[`project-image`]}
          variant="top"
          src={project.featuredImage.url}
        />
        <div
          className={`${
            classes[`img-container`]
          } mt-3 px-4 d-flex justify-content-between align-items-center`}
        >
          <img
            className={classes.profile}
            src={project.developer.profileImage.url}
            alt={`${project.developer.firstName} ${project.developer.lastName}`}
          ></img>
          <div className="d-flex flex-column align-items-center">
            {checkIfProjectLiked(data.likes, user) ? (
              <AiFillFire color="red" size="2.5rem" onClick={DeleteLike} />
            ) : (
              <AiOutlineFire size="2.5rem" onClick={Addlike} />
            )}
            <span>{data.likes.length}</span>
          </div>
        </div>
        <Card.Body>
          <Card.Title>{project.name}</Card.Title>
          <Card.Text className={classes[`project-description`]}>
            {project.description.substring(0, 151)}
            {project.description.length >= 150 && `...`}
          </Card.Text>
          <Button
            className="details"
            onClick={() => navigate(`/details/${project.id}`)}
          >
            Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ProjectCard

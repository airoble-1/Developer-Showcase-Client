import { useContext } from "react"
import { useQuery, useMutation } from "@apollo/client"
import Comments from "./../commentBox/Comments"
import CommentForm from "./../commentBox/CommentForm"
import { UserContext } from "./../../store/UserContext"
import { useNavigate } from "react-router-dom"
import { Button, Spinner } from "react-bootstrap"
import { findComments } from "../../apollo/queries/findCommentsByProject"
import { CREATE_COMMENT } from "../../apollo/mutations/createComment"

export default function MessageCard({ projectID }) {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const { loading, error, data } = useQuery(findComments, {
    variables: { projectId: projectID },
  })

  const [createComment] = useMutation(CREATE_COMMENT)

  if (loading) return <Spinner aniamtion="grow" />
  if (error) return `Error! Unable to retreive comments`

  function sendMessage(message) {
    createComment({
      variables: {
        input: {
          data: {
            author: user.userId,
            project: projectID,
            comment: message,
          },
        },
      },
      refetchQueries: [
        { query: findComments, variables: { projectId: projectID } },
      ],
    })
  }

  const { comments } = data
  return (
    <div className="message-area bg-white shadow text-white rounded p-3">
      <h3 className="text-dark">Latest Comments</h3>
      <Comments comments={comments} />
      {user ? (
        <CommentForm callback={sendMessage} />
      ) : (
        <div className="d-grid gap-2">
          <Button
            onClick={() => navigate("/login")}
            variant="primary"
            size="sm"
          >
            Login
          </Button>
        </div>
      )}
    </div>
  )
}

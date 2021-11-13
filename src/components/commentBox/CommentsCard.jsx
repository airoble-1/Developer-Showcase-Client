import { useParams } from "react-router"
import { useQuery, useMutation } from "@apollo/client"
import { Spinner } from "react-bootstrap"
import { useContext } from "react"
import Comments from "./Comments"
import CommentForm from "./CommentForm"
import { UserContext } from "../../store/UserContext"
import { findComments } from "../../apollo/queries/findCommentsByProject"
import { CREATE_COMMENT } from "../../apollo/mutations/createComment"

const CommentsCard = ({ className }) => {
  const { user } = useContext(UserContext)
  const { projectId } = useParams()
  const { data, loading, error } = useQuery(findComments, {
    variables: {
      projectId,
    },
  })
  const [
    createCommentMutation,
    { error: commentError, loading: loadingNewComment },
  ] = useMutation(CREATE_COMMENT)

  const sendComment = (message) => {
    createCommentMutation({
      variables: {
        input: {
          data: {
            author: user.userId,
            project: projectId,
            comment: message,
          },
        },
      },
      refetchQueries: [
        { query: findComments },
        {
          variables: {
            projectId,
          },
        },
      ],
    })
  }

  if (loading) return <Spinner />
  if (error) return <p>Error: {error.message}</p>
  if (loadingNewComment) return <Spinner />
  if (commentError) return <p>Error: {commentError.message}</p>

  const { comments } = data
  return (
    <div className={className}>
      <h3>Comments</h3>
      <Comments comments={comments} />
      <CommentForm addComment={sendComment} />
    </div>
  )
}

export default CommentsCard

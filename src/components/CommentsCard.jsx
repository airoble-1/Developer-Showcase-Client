import { useParams } from "react-router"
import { useQuery } from "@apollo/client"
import { Spinner } from "react-bootstrap"
import Comments from "./Comments"
import CommentForm from "./CommentForm"
import { findComments } from "./../apollo/queries/findCommentsByProject"

const CommentsCard = ({ className }) => {
  const { projectId } = useParams()
  const { data, loading, error } = useQuery(findComments, {
    variables: {
      projectId,
    },
  })
  if (loading) return <Spinner />
  if (error) return <p>Error: {error.message}</p>
  const { comments } = data
  return (
    <div className={className}>
      <h3>Comments</h3>
      <Comments comments={comments} />
      <CommentForm />
    </div>
  )
}

export default CommentsCard

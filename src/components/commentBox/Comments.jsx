import Comment from "./Comment"
import classes from "./Comments.module.css"
const Comments = ({ comments }) => {
  return (
    <div className={classes.comments}>
      {comments
        .map((comment) => {
          return <Comment key={comment.id} comment={comment} />
        })
        .reverse()
        .slice(0, 10)}
    </div>
  )
}

export default Comments

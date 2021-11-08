import classes from "./Comment.module.css"
const Comment = ({ comment }) => {
  const { userName, date, text } = comment
  return (
    <div className={classes[`message-container`]}>
      <p className={classes.author}>{userName}</p>
      <p className={classes.comment}>{text}</p>
      <p className={classes.date}>{new Date(date).toLocaleDateString()}</p>
    </div>
  )
}

export default Comment

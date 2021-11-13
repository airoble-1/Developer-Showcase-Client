import classes from "./Comment.module.css"
const Comment = ({ comment }) => {
  const {
    comment: text,
    author: { firstName, lastName },
    created_at: date,
  } = comment
  const userName = `${firstName} ${lastName[0]}`
  return (
    <div className={classes[`message-container`]}>
      <p className={classes.author}>{userName}</p>
      <p className={classes.comment}>{text}</p>
      <p className={classes.date}>
        {new Date(date).toLocaleDateString(["en-CA", "en-US"])}
      </p>
    </div>
  )
}

export default Comment

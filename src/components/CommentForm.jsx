import classes from "./CommentForm.module.css"

const CommentForm = () => {
  return (
    <form>
      <div className={classes[`form-container`]}>
        <input
          className={classes[`input-comment`]}
          id="comment"
          type="text"
          value=""
          placeholder="Enter your comment..."
          onChange
        />
        <button className={classes.btn} type="submit">
          Send
        </button>
      </div>
    </form>
  )
}

export default CommentForm

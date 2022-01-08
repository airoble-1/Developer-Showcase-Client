import { useState } from "react"
import classes from "./CommentForm.module.css"

const CommentForm = ({ callback }) => {
  const [message, setMessage] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    if (message) {
      callback(message)
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes[`form-container`]}>
        <input
          className={classes[`input-comment`]}
          id="comment"
          type="text"
          value={message}
          placeholder="Enter your comment..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={classes.btn} type="submit">
          Send
        </button>
      </div>
    </form>
  )
}

export default CommentForm

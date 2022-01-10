import { Image } from "react-bootstrap"
import classes from "./Comment.module.css"
const Comment = ({ comment }) => {
  const userName = `${comment.author?.firstName || "Guest"} ${
    comment.author?.lastName[0] || "User"
  }`

  return (
    <div className={classes[`message-container`]}>
      <Image
        roundedCircle
        style={{
          display: "inline-block",
          marginRight: "5px",
          objectFit: "cover",
          height: "40px",
          width: "40px",
          objectPosition: "left top",
          float: "left",
        }}
        src={
          comment.author?.profileImage.url ||
          "https://res.cloudinary.com/dlwqjptsg/image/upload/v1641773414/3551739_o9cxsr.jpg"
        }
        alt={`${comment.author?.firstName} ${comment.author?.lastName}`}
      ></Image>
      <p className={classes.author}>{userName}</p>
      <p className={classes.comment}>{comment.comment}</p>
      <p className={classes.date}>
        {new Date(comment.created_at).toLocaleDateString(["en-CA", "en-US"])}
      </p>
    </div>
  )
}

export default Comment

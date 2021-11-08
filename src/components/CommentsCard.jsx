import Comments from "./Comments"
import CommentForm from "./CommentForm"

const tempImage =
  "https://coderthemes.com/ubold/layouts/assets/images/users/user-2.jpg"

const data = [
  {
    id: 1,
    userName: "Ahmed",
    userAvatar: tempImage,
    date: "Wed Oct 15 2021",
    text: "Great work! love the color choice =)",
  },
  {
    id: 2,
    userName: "Bruce",
    userAvatar: tempImage,
    date: "Wed Oct 21 2021",
    text: "Your project is really coming along",
  },
  {
    id: 3,
    userName: "Dexter",
    userAvatar: tempImage,
    date: "Wed Nov 6 2021",
    text: "Excellent Work",
  },
]

const CommentsCard = ({ className }) => {
  return (
    <div className={className}>
      <h3>Comments</h3>
      <Comments comments={data} />
      <CommentForm />
    </div>
  )
}

export default CommentsCard

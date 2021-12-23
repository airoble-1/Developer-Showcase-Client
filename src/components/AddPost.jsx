import { Button } from "react-bootstrap"
import { useState } from "react"
import { Form, Spinner } from "react-bootstrap"
import { useMutation } from "@apollo/client"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "./../store/UserContext"
import { GET_POSTS } from "./../apollo/queries/getPosts"
import MarkdownEditor from "./MarkdownEditor"
import useForm from "../hooks/useForm"
import createPostMutation from "./../apollo/mutations/createPost"

const initial_state = {
  title: "",
  markdown: "",
}

export default function AddPost() {
  let navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [content, setContent] = useState("")
  const { handleChange, values } = useForm(initial_state)
  const [createPost, { error, loading }] = useMutation(createPostMutation)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await createPost({
      variables: {
        post: {
          data: {
            title: values.title,
            content,
            author: user.userId,
          },
        },
      },
      refetchQueries: [{ query: GET_POSTS }],
    })
    const {
      data: {
        createPost: { post },
      },
    } = data
    if (data) navigate(`/blog/${post.id}`)
  }

  if (error) return <h1>There was an issue uploading your post</h1>
  if (loading) return <Spinner></Spinner>

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset disabled={loading}>
        <Form.Group className="mb-3" controlId="project-name">
          <Form.Label className="fw-bold">Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={values.title || ""}
            onChange={handleChange}
            placeholder="Enter title of post"
            required
          />
        </Form.Group>
        <div className="shadow p-3 mt-3 rounded">
          <MarkdownEditor value={content} onChange={setContent} />
        </div>
        <Button className="me-2" variant="primary" type="submit">
          Create Post
        </Button>
      </fieldset>
    </Form>
  )
}

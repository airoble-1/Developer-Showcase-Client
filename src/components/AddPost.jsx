import { Button, Form, Spinner, Row, Col } from "react-bootstrap"
import { useMutation } from "@apollo/client"
import { useContext, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "./../store/UserContext"
import { GET_POSTS } from "./../apollo/queries/getPosts"
import MarkdownEditor from "./MarkdownEditor"
import useForm from "../hooks/useForm"
import createPostMutation from "./../apollo/mutations/createPost"
import uploadImageMutation from "./../apollo/mutations/uploadFeatureImage"

const initial_state = {
  title: "",
  markdown: "",
}

export default function AddPost() {
  let navigate = useNavigate()
  const { user } = useContext(UserContext)
  const fileInput = useRef()
  const [content, setContent] = useState("")
  const { handleChange, values } = useForm(initial_state)

  const [createPost, { error: errorPost, loading }] =
    useMutation(createPostMutation)

  const [uploadImageFnc, { error: errorFile }] =
    useMutation(uploadImageMutation)
  const [isUploading, setisUploading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const createPostResponse = await createPost({
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

    if (errorPost) return <h1>There was an issue uploading your post</h1>
    if (loading) return <Spinner></Spinner>

    const uploadImageResponse = await uploadImageFnc({
      variables: {
        collectionName: "post",
        collectionId: createPostResponse.data.createPost.post.id,
        fieldName: "heroImage",
        fileName: fileInput.current.files[0],
      },
    })
    if (errorFile)
      return <h1>{errorFile.message} Unable to upload image to post</h1>
    const { data } = uploadImageResponse
    if (data) setisUploading(false)
    navigate(`/blog/${createPostResponse.data.createPost.post.id}`)
  }

  return (
    <Form className="my-4 p-2 rounded shadow bg-white" onSubmit={handleSubmit}>
      <h1>Post</h1>
      <fieldset disabled={isUploading}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="post-tile">
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
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="project-file">
              <Form.Label className="fw-bold">Hero Image</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={handleChange}
                required
                ref={fileInput}
              />
            </Form.Group>
          </Col>
        </Row>

        <p className="fw-bold">Please enter content below in markdown:</p>
        <MarkdownEditor value={content} onChange={setContent} />

        <Button className="my-3" variant="primary" type="submit">
          Create Post
        </Button>
      </fieldset>
    </Form>
  )
}

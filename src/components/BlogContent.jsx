import React from "react"
import ReactMarkdown from "react-markdown"
import { useQuery } from "@apollo/client"
import { Container, Spinner, Image } from "react-bootstrap"
import { GET_POST_DETAILS } from "../apollo/queries/postDetails"
import { useParams } from "react-router"
import classes from "./BlogContent.module.css"
export default function BlogContent() {
  let { postId } = useParams()
  const { data, loading, error } = useQuery(GET_POST_DETAILS, {
    variables: { postId },
  })

  if (loading) return <Spinner />
  if (error) return <h1>{error.message}</h1>
  const { post } = data
  const { title, content, author, created_at, heroImage } = post
  return (
    <Container>
      <div className="w-100 mx-auto">
        {heroImage && (
          <Image
            className={classes[`img-container`]}
            src={heroImage.url}
            alt={title}
          ></Image>
        )}
      </div>
      <span>
        Posted on: {new Date(created_at).toLocaleDateString(["en-CA", "en-US"])}
      </span>
      <span> By: {`${author.firstName} ${author.lastName}`} </span>

      <h1 className={classes.title}>{title}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </Container>
  )
}

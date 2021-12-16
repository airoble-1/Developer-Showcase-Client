import React from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_POSTS } from "../apollo/queries/getPosts"
import { Spinner } from "react-bootstrap"
export default function BlogList() {
  const { data, loading, error } = useQuery(GET_POSTS)
  if (loading) return <Spinner />
  if (error) return <h4>{error.message}</h4>
  return (
    <div>
      <h2>All Posts</h2>
      {data.posts.map((post) => (
        <Link key={post.id} to={`/blog/${post.id}`}>
          {post.title}
        </Link>
      ))}
    </div>
  )
}

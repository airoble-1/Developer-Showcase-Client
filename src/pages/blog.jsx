import React from "react"

import TwoColumnGrid from "../components/TwoColumnGrid"
import { Route } from "react-router-dom"
import { useParams } from "react-router"
import BlogList from "../components/BlogList"
import BlogContent from "../components/BlogContent"
export default function BlogPage() {
  let { blogId } = useParams()
  console.log(blogId)
  return (
    <div>
      Blog
      <TwoColumnGrid>
        <BlogList />
        <Route path="/blog/:postId">
          <BlogContent />
        </Route>
      </TwoColumnGrid>
    </div>
  )
}

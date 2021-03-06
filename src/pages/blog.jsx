import React from "react"
import { Routes, Outlet } from "react-router-dom"
import TwoColumnGrid from "../components/TwoColumnGrid"
import { Route } from "react-router-dom"
import BlogList from "../components/BlogList"
import BlogContent from "../components/BlogContent"
import { Container } from "react-bootstrap"
export default function BlogPage() {
  return (
    <Container>
      <TwoColumnGrid>
        <BlogList />
        <Routes>
          <Route path=":postId" element={<BlogContent />} />
        </Routes>
        <Outlet />
      </TwoColumnGrid>
    </Container>
  )
}

import { gql } from "@apollo/client"

export const projectDetails = gql`
  query ProjectDetails($id: ID!) {
    project(id: $id) {
      id
      featuredImage {
        url
      }
      name
      description
      site
      github
      developer {
        firstName
        lastName
        profileImage {
          url
        }
        linkedIn
        gitHub
        website
        resume
      }
    }
  }
`

import { gql } from "@apollo/client"

const PROJECTS = gql`
  query Projects {
    projects {
      id
      featuredImage {
        url
      }
      developer {
        firstName
        lastName
        profileImage {
          url
        }
      }
      likesCount
      name
      description
    }
  }
`
export default PROJECTS

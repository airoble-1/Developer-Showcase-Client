import { gql } from "@apollo/client"

export const findComments = gql`
  query GET_PROJECT_COMMENTS($projectId: ID!) {
    comments(where: { project: { id: $projectId } }) {
      comment
      id
      author {
        firstName
        lastName
        profileImage {
          url
        }
      }
      created_at
    }
  }
`

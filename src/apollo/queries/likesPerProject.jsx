import { gql } from "@apollo/client"

const COUNT_LIKES = gql`
  query likesPerProject($projectID: ID!) {
    likes(where: { project: { id: $projectID } }) {
      id
      user {
        id
        firstName
        lastName
      }
    }
  }
`
export default COUNT_LIKES

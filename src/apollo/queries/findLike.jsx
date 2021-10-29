import { gql } from "@apollo/client"

export const findLike = gql`
  query likesPerProject($projectId: ID!, $userId: ID!) {
    likes(where: { project: { id: $projectId }, user: { id: $userId } }) {
      id
    }
  }
`

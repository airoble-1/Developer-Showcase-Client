import { gql } from "@apollo/client"

export const GET_POST_DETAILS = gql`
  query GET_POST_BY_ID($postId: ID!) {
    post(id: $postId) {
      id
      title
      tags
      content
      author {
        firstName
        lastName
      }
      heroImage {
        url
      }
      created_at
    }
  }
`

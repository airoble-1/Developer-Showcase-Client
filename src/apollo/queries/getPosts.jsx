import { gql } from "@apollo/client"

export const GET_POSTS = gql`
  query GET_POSTS {
    posts {
      id
      title
      tags
      content
      private
      heroImage {
        url
        formats
      }
      author {
        id
        firstName
        lastName
      }
    }
  }
`

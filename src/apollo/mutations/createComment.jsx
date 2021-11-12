import { gql } from "@apollo/client"

export const CREATE_COMMENT = gql`
  mutation COMMENT_MUTATION($input: createCommentInput!) {
    createComment(input: $input) {
      comment {
        id
      }
    }
  }
`

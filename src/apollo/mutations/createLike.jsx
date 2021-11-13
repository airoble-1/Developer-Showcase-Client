import { gql } from "@apollo/client"

export const CREATE_LIKE = gql`
  mutation AddOneLike($input: createLikeInput!) {
    createLike(input: $input) {
      like {
        id
      }
    }
  }
`

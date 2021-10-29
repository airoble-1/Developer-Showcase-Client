import { gql } from "@apollo/client"

export const deleteLike = gql`
  mutation DELETE_LIKE($input: deleteLikeInput!) {
    deleteLike(input: $input) {
      like {
        id
        user {
          id
        }
      }
    }
  }
`

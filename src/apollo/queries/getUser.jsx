import { gql } from "@apollo/client"

export const GET_USER = gql`
  query {
    currentUser {
      id
      firstName
      lastName
      profileImage {
        url
      }
    }
  }
`

import { gql } from "@apollo/client"

export const RESET_PASSWORD_MUTATTION = gql`
  mutation RESET_PASSOWRD(
    $password: String!
    $passwordConfirm: String!
    $code: String!
  ) {
    resetPassword(
      password: $password
      passwordConfirmation: $passwordConfirm
      code: $code
    ) {
      user {
        id
      }
    }
  }
`

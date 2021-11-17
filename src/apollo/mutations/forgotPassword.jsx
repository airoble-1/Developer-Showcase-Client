import { gql } from "@apollo/client"

export const FORGOT_PASSWORD_MUTATTION = gql`
  mutation FORGOT_PASSOWRD($email: String!) {
    forgotPassword(email: $email) {
      ok
    }
  }
`

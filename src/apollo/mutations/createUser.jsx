import { gql } from "@apollo/client"

const createUserMutation = gql`
  mutation CreateUser($input: createUserInput) {
    createUser(input: $input) {
      user {
        id
        username
        email
      }
    }
  }
`
export default createUserMutation

import { gql } from "@apollo/client"

export const CREATE_ISSUE = gql`
  mutation CREATE_ISSUE($input: createIssueInput!) {
    createIssue(input: $input) {
      issue {
        id
      }
    }
  }
`

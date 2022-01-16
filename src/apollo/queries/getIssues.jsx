import { gql } from "@apollo/client"

export const GET_ISSUES = gql`
  query GET_ISSUES {
    issues {
      id
      description
      dueDate
      type
      status
      priority
      severity
      project {
        id
        name
      }
      created_at
      createdBy {
        id
        firstName
        lastName
      }
    }
  }
`

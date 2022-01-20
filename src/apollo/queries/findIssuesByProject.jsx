import { gql } from "@apollo/client"

export const GET_ISSUES_BY_PROJECT = gql`
  query GET_ISSUES_BY_PROJECT($projectId: ID!) {
    issues(where: { project: { id: $projectId } }) {
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

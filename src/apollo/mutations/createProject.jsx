import { gql } from "@apollo/client"

const createProjectMutation = gql`
  mutation CREATE_PROJECT(
    $name: String!
    $description: String!
    $gitHub: String!
    $site: String!
    $userId: ID!
  ) {
    createProject(
      input: {
        data: {
          name: $name
          description: $description
          github: $gitHub
          site: $site
          developer: $userId
        }
      }
    ) {
      project {
        id
        name
        description
        site
        github
      }
    }
  }
`
export default createProjectMutation

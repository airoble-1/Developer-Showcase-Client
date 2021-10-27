import { gql } from "@apollo/client"

const createProjectMutation = gql`
  mutation CREATE_PROJECT(
    $name: String!
    $description: String!
    $github: String!
    $site: String!
  ) {
    createProject(
      input: {
        data: {
          name: $name
          description: $description
          github: $github
          site: $site
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

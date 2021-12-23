import { gql } from "@apollo/client"

const createPostMutation = gql`
  mutation CREATE_POST($post: createPostInput!) {
    createPost(input: $post) {
      post {
        id
        title
        tags
        content
        author {
          id
        }
      }
    }
  }
`
export default createPostMutation

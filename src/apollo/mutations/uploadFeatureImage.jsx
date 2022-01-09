import { gql } from "@apollo/client"

const uploadImageMutation = gql`
  mutation UPLOAD__IMAGE(
    $collectionName: String!
    $collectionId: ID!
    $fieldName: String!
    $fileName: Upload!
  ) {
    upload(
      ref: $collectionName
      refId: $collectionId
      field: $fieldName
      file: $fileName
    ) {
      id
    }
  }
`

export default uploadImageMutation

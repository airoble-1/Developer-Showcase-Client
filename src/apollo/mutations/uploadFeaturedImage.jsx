import { gql } from "@apollo/client"

const uploadFeatureImageMutation = gql`
  mutation UPLOAD_FEATURED_IMAGE(
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

export default uploadFeatureImageMutation

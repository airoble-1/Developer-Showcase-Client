import { useQuery, gql } from "@apollo/client"

const Projects = gql`
  query Projects {
    projects {
      name
      developer {
        firstName
        lastName
      }
      description
      featuredImage {
        url
      }
    }
  }
`
function App() {
  const { loading, error, data } = useQuery(Projects)
  if (loading) return <p>Loading...</p>
  if (error) return <p>`Error :(`</p>

  return (
    <>
      <p>Test</p>
    </>
  )
}

export default App

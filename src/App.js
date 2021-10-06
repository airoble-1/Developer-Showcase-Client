import { useQuery, gql } from "@apollo/client"
import { Route, Switch } from "react-router-dom"
import Layout from "./components/layout/layout"
import DetailsPage from "./pages/details"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"

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
    <Layout>
      <Route path="/">
        <HomePage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Layout>
  )
}

export default App

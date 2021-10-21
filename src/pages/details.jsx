import { useParams } from "react-router-dom"
const DetailsPage = () => {
  const { projectId } = useParams()
  return <h1>{`Project ${projectId} Details Page`}</h1>
}

export default DetailsPage

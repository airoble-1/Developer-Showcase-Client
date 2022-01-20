import { Container } from "react-bootstrap"
import BugTracker from "../components/BugTracker"
import { GET_ISSUES } from "./../apollo/queries/getIssues"
export default function BugPage() {
  return (
    <Container className="mt-3">
      <BugTracker query={GET_ISSUES} />
    </Container>
  )
}

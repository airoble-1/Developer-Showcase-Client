import { useState } from "react"
import { Button, Spinner } from "react-bootstrap"
import { useQuery } from "@apollo/client"
import { GET_ISSUES } from "../apollo/queries/getIssues"
import IssuesTable from "./IssuesTable"

function BugTracker() {
  const [showAddIssueForm, setShowAddIssueForm] = useState(true)
  const { data, loading, error } = useQuery(GET_ISSUES)
  if (loading) return <Spinner />
  if (error) return <h4>{error.message}</h4>
  const { issues } = data
  return (
    <>
      <Button
        variant="primary"
        size="lg"
        onClick={() => setShowAddIssueForm((prevState) => !prevState)}
      >
        {showAddIssueForm ? "+" : "-"}
      </Button>
      {showAddIssueForm ? <IssuesTable data={issues} /> : null}
    </>
  )
}

export default BugTracker

import { useState } from "react"
import { Button, Spinner } from "react-bootstrap"
import { useQuery } from "@apollo/client"
import IssuesTable from "./IssuesTable"
import AddIssue from "./AddIssue"

function BugTracker({ query, variables }) {
  const [showAddIssueForm, setShowAddIssueForm] = useState(true)
  const { data, loading, error } = useQuery(query, {
    variables,
  })
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
      {showAddIssueForm ? (
        <IssuesTable data={issues} />
      ) : (
        <AddIssue setShowAddIssueForm={setShowAddIssueForm} />
      )}
    </>
  )
}

export default BugTracker

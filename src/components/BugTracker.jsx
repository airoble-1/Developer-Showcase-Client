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
  if (error) {
    console.error(error)
    return <div>{`Error! ${error.message}`}</div>
  }
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
        <AddIssue
          setShowAddIssueForm={setShowAddIssueForm}
          projectId={variables?.projectId}
          query={query}
          variables={variables}
        />
      )}
    </>
  )
}

export default BugTracker

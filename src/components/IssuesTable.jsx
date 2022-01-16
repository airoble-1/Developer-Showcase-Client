import Table from "./Table/Table"
import TableHeader from "./Table/TableHeader"
import classes from "./IssuesTable.module.css"
function IssuesTable({ data }) {
  return (
    <div className="shadow p-3 mt-3 rounded overflow-scroll bg-white">
      <Table data={data}>
        <TableHeader dataKey="description" label="Description"></TableHeader>
        <TableHeader dataKey="dueDate" label="Due Date"></TableHeader>
        <TableHeader dataKey="type" label="Type"></TableHeader>
        <TableHeader
          dataKey="createdBy"
          label="Created By"
          render={(data) => (
            <span>{data.firstName + " " + data.lastName[0]}</span>
          )}
        ></TableHeader>
        <TableHeader
          dataKey="status"
          label="Status"
          render={(data) => <span className={classes.createdBy}>{data} </span>}
        ></TableHeader>
        <TableHeader dataKey="priority" label="Priority"></TableHeader>
        <TableHeader dataKey="severity" label="Severity"></TableHeader>
        <TableHeader
          dataKey="project"
          label="Project"
          render={(data) => <span>{data.name} </span>}
        ></TableHeader>
        <TableHeader dataKey="id" label="Issue Id"></TableHeader>
      </Table>
    </div>
  )
}

export default IssuesTable

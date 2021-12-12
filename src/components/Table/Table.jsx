import classes from "./Table.module.css"
import TableBody from "./TableBody"
function Table({ children: columns, title, data }) {
  return (
    <>
      <h2>{title}</h2>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>#</th>
            {columns.map((column) => (
              <th className={classes.th}>{column.props.label}</th>
            ))}
          </tr>
        </thead>
        <TableBody data={data} columns={columns} />
      </table>
    </>
  )
}
export default Table

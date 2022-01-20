import { v4 as uuidv4 } from "uuid"
import classes from "./Table.module.css"
import TableBody from "./TableBody"
function Table({ children: columns, title, data }) {
  return (
    <>
      <h2>{title}</h2>
      <table className={classes.table}>
        <thead>
          <tr className={classes.row}>
            <th className={`${classes.th} ${classes[`first-col`]} `}>#</th>
            {columns.map((column) => (
              <th
                key={uuidv4()}
                className={`${classes.th} ${classes[`first-col`]} `}
              >
                {column.props.label}
              </th>
            ))}
          </tr>
        </thead>
        <TableBody data={data} columns={columns} />
      </table>
    </>
  )
}
export default Table

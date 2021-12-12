import classes from "./TableBody.module.css"
function TableBody({ data, columns }) {
  return (
    <tbody>
      {data.map((dataObject, index) => (
        <tr>
          <td className={classes.td}>{index + 1}</td>
          {columns.map((column) => (
            <td className={classes.td}>{dataObject[column.props.dataKey]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody

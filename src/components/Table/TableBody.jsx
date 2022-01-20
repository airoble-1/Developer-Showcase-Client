import { v4 as uuidv4 } from "uuid"
import classes from "./TableBody.module.css"
function TableBody({ data, columns }) {
  return (
    <tbody>
      {data.map((dataObject, index) => (
        <tr className={classes.row} key={uuidv4()}>
          <td
            key={uuidv4()}
            className={`${classes.td} ${classes[`first-col`]}`}
          >
            {index + 1}
          </td>
          {columns.map((column) => {
            if (column.props.render)
              return (
                <td className={`${classes.td}`} key={uuidv4()}>
                  {column.props.render(dataObject[column.props.dataKey])}
                </td>
              )
            return (
              <td key={uuidv4()} className={`${classes.td}`}>
                {dataObject[column.props.dataKey]}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody

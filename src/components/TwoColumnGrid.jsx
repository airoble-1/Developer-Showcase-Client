import React from "react"
import styles from "./TwoColumnGrid.module.css"
function TwoColumnGrid({ children }) {
  const [left, right] = children
  return (
    <div className={styles.container}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}
export default TwoColumnGrid

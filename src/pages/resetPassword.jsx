import React from "react"

import ResetPasswordForm from "./../components/ResetPasswordForm"
import classes from "./resetPassword.module.css"
export default function ResetPasswordPage() {
  return (
    <div
      className={`${classes.reset} d-flex align-items-center justify-content-center`}
    >
      <ResetPasswordForm />
    </div>
  )
}

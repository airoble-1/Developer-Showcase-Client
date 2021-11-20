import React from "react"
import { useParams } from "react-router"
import ResetPasswordForm from "./../components/ResetPasswordForm"
import classes from "./resetPassword.module.css"
export default function ResetPasswordPage() {
  const { code } = useParams()
  console.log(code)
  return (
    <div
      className={`${classes.reset} d-flex align-items-center justify-content-center`}
    >
      <ResetPasswordForm />
    </div>
  )
}

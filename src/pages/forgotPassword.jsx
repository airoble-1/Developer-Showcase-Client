import React from "react"
import classes from "./../pages/forgotPassword.module.css"
import ForgotPasswordForm from "./../components/ForgotPasswordForm"
export default function ForgotPasswordPage() {
  return (
    <div
      className={`${
        classes[`forgot-password`]
      } d-flex justify-content-center align-items-center`}
    >
      <ForgotPasswordForm />
    </div>
  )
}

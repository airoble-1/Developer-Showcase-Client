import { useState } from "react"

const useForm = (validate) => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    event.preventDefault()
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }))
  }
  const clearFields = () => {
    setValues({})
    setErrors({})
  }

  const handleValidation = (event) => {
    setErrors(validate(values))
  }

  return {
    values,
    handleChange,
    clearFields,
    handleValidation,
    errors,
  }
}

export default useForm

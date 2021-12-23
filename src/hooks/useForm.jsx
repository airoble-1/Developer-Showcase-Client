import { useState } from "react"

const useForm = (initial = {}) => {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState(initial)

  const handleChange = (event) => {
    let { type, name, value } = event.target
    if (type === "file") [value] = event.target.files

    setValues((values) => ({
      ...values,
      [name]: value,
    }))
  }
  const clearFields = () => {
    setValues({})
    setErrors({})
  }
  const urlRegex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

  const isUrlValid = (url, regex) => {
    const valid = url.match(regex)
    return valid
  }

  const handleUrlValidation = (event) => {
    if (isUrlValid(event.target.value, urlRegex)) {
      setErrors((errors) => ({ ...errors, [event.target.name]: false }))
    } else {
      setErrors((errors) => ({ ...errors, [event.target.name]: true }))
    }
  }

  const setErrorMessages = () => {
    let errorMessages = {}
    if (!values.github) errorMessages.github = "GitHub url is required"
    else errorMessages.github = "GitHub url is invalid"
    if (!values.site) errorMessages.site = "Website url is required"
    else errorMessages.site = "Project site url is invalid"
    return errorMessages
  }

  return {
    values,
    handleChange,
    clearFields,
    handleUrlValidation,
    errors,
    setErrorMessages,
  }
}

export default useForm

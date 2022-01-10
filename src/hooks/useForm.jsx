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
    /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

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
    if (!values.gitHub) errorMessages.gitHub = "GitHub url is required"
    else
      errorMessages.gitHub =
        "Please enter url ex. https://www.example.com or https://example.com"
    if (!values.website) errorMessages.website = "Website url is required"
    else
      errorMessages.site =
        "Please enter url ex. https://www.example.com or https://example.com"
    if (!values.site) errorMessages.site = "Website url is required"
    else
      errorMessages.site =
        "Please enter url ex. https://www.example.com or https://example.com"
    if (!values.resume) errorMessages.resume = "Resume url is required"
    else
      errorMessages.resume =
        "Please enter url ex. https://www.example.com or https://example.com"
    if (!values.linkedIn) errorMessages.linkedIn = "Linkedin url is required"
    else
      errorMessages.linkedIn =
        "Please enter url ex. https://www.example.com or https://example.com"
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

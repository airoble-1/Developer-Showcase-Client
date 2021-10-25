export const validate = (values) => {
  let errors = {}
  if (!values.github) {
    errors.github = "GitHub url is required"
  } else if (
    !/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
      values.github
    )
  ) {
    errors.github = "GitHub url is invalid"
  }
  if (!values.site) {
    errors.site = "Website url is required"
  } else if (
    !/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
      values.site
    )
  ) {
    errors.github = "Project site url is invalid"
  }

  return errors
}

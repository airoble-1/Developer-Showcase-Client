import { Container, Image, Button } from "react-bootstrap"
import { AiFillLinkedin, AiFillGithub, AiFillFilePdf } from "react-icons/ai"
import { CgWebsite } from "react-icons/cg"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import classes from "./details.module.css"
import { projectDetails } from "../apollo/queries/projectDetails"
import CommentsCard from "../components/commentBox/CommentsCard"
import BugTracker from "../components/BugTracker"
import { GET_ISSUES_BY_PROJECT } from "../apollo/queries/findIssuesByProject"
const DetailsPage = () => {
  const { projectId } = useParams()
  const { error, data, loading } = useQuery(projectDetails, {
    variables: { id: projectId },
  })
  if (error) return <h1>Whoops! Could not complete data fetch</h1>
  if (loading) return <h1>Loading...</h1>
  const {
    name,
    featuredImage,
    description,
    site,
    github,
    developer: {
      firstName,
      lastName,
      profileImage,
      linkedIn,
      gitHub,
      website,
      resume,
    },
  } = data.project
  return (
    <Container className="mb-5">
      <div className={`${classes.container} my-3`}>
        <div className={`${classes[`project-hero`]} overflow-hidden rounded`}>
          <Image
            style={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
              objectPosition: "left top",
            }}
            src={featuredImage.url}
            alt={name}
          ></Image>
        </div>
        <div className={`${classes[`user-info`]} rounded bg-dark p-3`}>
          <div className="d-flex align-items-center flex-column h-100 justify-content-between">
            <Image
              src={profileImage.url}
              roundedCircle
              style={{
                objectFit: "cover",
                height: "175px",
                width: "175px",
              }}
            ></Image>
            <p className="text-white fs-2 fw-bold m-0">
              {`${firstName} ${lastName.substr(0, 1).toUpperCase()}`}
            </p>
            <div className="d-flex px-4 justify-content-around w-100 ">
              {linkedIn && (
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="display-5 text-secondary"
                >
                  <AiFillLinkedin />
                </a>
              )}
              {gitHub && (
                <a
                  href={gitHub}
                  target="_blank"
                  rel="noreferrer"
                  className="display-5 text-secondary"
                >
                  <AiFillGithub />
                </a>
              )}
              {website && (
                <a
                  href={website}
                  className="display-5 text-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  <CgWebsite />
                </a>
              )}

              {resume && (
                <a
                  href={resume}
                  target="_blank"
                  rel="noreferrer"
                  className="display-5 text-secondary"
                >
                  <AiFillFilePdf />
                </a>
              )}
            </div>
            <div className="d-flex px-3 mt-3 flex-column w-100">
              {site && (
                <Button
                  className="mt-2 w-100"
                  variant="primary"
                  size="lg"
                  href={site}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </Button>
              )}
              {github && (
                <Button
                  className="mt-2 w-100"
                  variant="secondary"
                  size="lg"
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className={`${classes[`project-info`]} bg-secondary rounded`}>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>

        <CommentsCard
          projectID={projectId}
          className={`${
            classes[`project-comments`]
          } bg-dark text-white rounded p-3`}
        />
      </div>
      <BugTracker query={GET_ISSUES_BY_PROJECT} variables={{ projectId }} />
    </Container>
  )
}

export default DetailsPage

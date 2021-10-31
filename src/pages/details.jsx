import { Container, Image, Button } from "react-bootstrap"
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai"
import { CgWebsite } from "react-icons/cg"
import { ImBlog } from "react-icons/im"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import classes from "./details.module.css"
import { projectDetails } from "../apollo/queries/projectDetails"

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
    developer: { firstName, lastName, profileImage, linkedIn, gitHub, website },
  } = data.project
  return (
    <Container>
      <div className={`${classes.container} my-3`}>
        <div className={`${classes[`project-hero`]} overflow-hidden rounded`}>
          <Image
            style={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
            }}
            src={featuredImage.url}
            alt={name}
          ></Image>
        </div>
        <div className={`${classes[`user-info`]} rounded bg-dark pt-2`}>
          <div className="d-flex align-items-center flex-column justify-content-center ">
            <Image
              src={profileImage.url}
              roundedCircle
              style={{
                objectFit: "contain",
                height: "40%",
                width: "40%",
              }}
            ></Image>
            <p className="text-white fs-4">
              {`${firstName} ${lastName.substr(0, 1).toUpperCase()}`}
            </p>
            <div className="d-flex px-4 justify-content-around w-100 ">
              {linkedIn && (
                <a href={linkedIn} className="display-5 text-secondary">
                  <AiFillLinkedin />
                </a>
              )}
              {gitHub && (
                <a href={gitHub} className="display-5 text-secondary">
                  <AiFillGithub />
                </a>
              )}
              {site && (
                <a href={website} className="display-5 text-secondary">
                  <CgWebsite />
                </a>
              )}

              {site && (
                <a href={site} className="display-5 text-secondary">
                  <ImBlog />
                </a>
              )}
            </div>
            <div className="d-flex px-3 mt-3 flex-column w-100">
              {site && (
                <Button
                  className="mt-2 w-100"
                  variant="primary"
                  size="lg"
                  href={website}
                  target="_blank"
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
        <div
          className={`${
            classes[`project-comments`]
          } bg-dark rounded text-white`}
        >
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    </Container>
  )
}

export default DetailsPage

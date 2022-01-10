import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useContext } from "react"
import { UserContext } from "../../store/UserContext"
import client from "../../apollo/apolloClient"
import classes from "./Navigation.module.css"
import UserProfile from "../UserProfile"
const Navigation = () => {
  const { user, setUser } = useContext(UserContext)
  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    client.resetStore()
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className={`${classes.navbar} fs-5`}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>DevHunter</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className={`me-auto`}>
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/blog">
                <Nav.Link>Blog</Nav.Link>
              </LinkContainer>
              {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
              {user && (
                <LinkContainer to="/upload">
                  <Nav.Link>Upload</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            {user && (
              <>
                <UserProfile size={50} />
                <Button
                  className="mx-2 text-white"
                  style={{
                    border: "2px solid white",
                  }}
                  variant="outline-primary"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation

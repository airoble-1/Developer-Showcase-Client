import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useContext } from "react"
import { UserContext } from "../../store/UserContext"
import client from "../../apollo/apolloClient"
import classes from "./Navigation.module.css"
const Navigation = () => {
  const { user, setUser } = useContext(UserContext)
  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    client.resetStore()
  }
  return (
    <>
      <Navbar className={classes.navbar}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>DevHunter</Navbar.Brand>
          </LinkContainer>
          <Nav className={`me-auto`}>
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {user && (
              <LinkContainer to="/upload">
                <Nav.Link>Upload Project</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          {user && (
            <>
              <span className={classes.greeting}>Hi Ahmed!</span>
              <Button
                className="mx-2"
                variant="outline-secondary"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation

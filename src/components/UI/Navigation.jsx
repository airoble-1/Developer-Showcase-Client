import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useContext } from "react"
import { UserContext } from "../../store/UserContext"

const Navigation = () => {
  const userContext = useContext(UserContext)
  const { user } = userContext
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>DevHunter</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation

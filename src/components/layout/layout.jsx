import { Children } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
const Layout = ({ Children }) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">DevHunter</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <main>{Children}</main>
    </>
  )
}

export default Layout

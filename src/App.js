import { Route, Switch, Redirect } from "react-router-dom"
import Navigation from "./components/UI/Navigation"
import DetailsPage from "./pages/details"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import ProjectUploadForm from "./pages/projectUploadForm"
import { UserContext } from "./store/UserContext"
import { useContext } from "react"
import ForgotPasswordPage from "./pages/forgotPassword"
import ResetPasswordPage from "./pages/resetPassword"
import BlogPage from "./pages/blog"

const PrivateRoute = ({ isAuth, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (isAuth ? children : <Redirect to="/login" />)}
    ></Route>
  )
}

function App() {
  const { user } = useContext(UserContext)

  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <PrivateRoute isAuth={user} path="/details/:projectId">
          <DetailsPage />
        </PrivateRoute>
        <PrivateRoute isAuth={user} path="/upload">
          <ProjectUploadForm />
        </PrivateRoute>
        <Route path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password/:code">
          <ResetPasswordPage />
        </Route>
        <Route path="/blog">
          <BlogPage />
        </Route>

        <Route path="*">
          <h1>404 Error! this page does not exist</h1>
        </Route>
      </Switch>
    </>
  )
}

export default App

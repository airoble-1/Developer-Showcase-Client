import { Route, Switch, Redirect } from "react-router-dom"
import Navigation from "./components/UI/Navigation"
import DetailsPage from "./pages/details"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import { UserContext } from "./store/UserContext"
import { useContext } from "react"
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
          <LoginPage />
        </Route>
        <PrivateRoute isAuth={user} path="/details">
          <DetailsPage />
        </PrivateRoute>
      </Switch>
    </>
  )
}

export default App

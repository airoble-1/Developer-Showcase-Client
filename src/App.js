import { Route, Routes, Navigate } from "react-router-dom"
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

function PrivateRoute({ isAuth, children }) {
  return isAuth ? children : <Navigate to="/login" />
}

function App() {
  const { user } = useContext(UserContext)

  return (
    <>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/details/:projectId"
          element={
            <PrivateRoute isAuth={user}>
              <DetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute isAuth={user}>
              <ProjectUploadForm />
            </PrivateRoute>
          }
        />
        <Route path="/blog/*" element={<BlogPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:code" element={<ResetPasswordPage />} />

        <Route
          path="*"
          element={<h1>404 Error! this page does not exist</h1>}
        />
      </Routes>
    </>
  )
}

export default App

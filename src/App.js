import { Route, Routes, Navigate } from "react-router-dom"
import { UserContext } from "./store/UserContext"
import { useContext } from "react"

import Navigation from "./components/UI/Navigation"
import HomePage from "./pages/home"
import DetailsPage from "./pages/details"
import BlogPage from "./pages/blog"
import BugPage from "./pages/bug"
import UploadPage from "./pages/uploadPage"
import SignUpPage from "./pages/signUp"
import LoginPage from "./pages/login"
import LoginErrorPage from "./pages/loginError"
import ForgotPasswordPage from "./pages/forgotPassword"
import ResetPasswordPage from "./pages/resetPassword"
import ErrorPage from "./pages/errorPage"

function PrivateRoute({ isAuth, children }) {
  return isAuth ? children : <Navigate to="/login" />
}

function App() {
  const { user } = useContext(UserContext)
  // const { isTimeout } = useTimeout(10)
  // isTimeout && console.log("Logged of after 10 sec")
  return (
    <>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route path="/login-error" element={<LoginErrorPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/details/:projectId" element={<DetailsPage />} />
        <Route
          path="/upload/*"
          element={
            <PrivateRoute isAuth={user}>
              <UploadPage />
            </PrivateRoute>
          }
        />
        <Route path="/blog/*" element={<BlogPage />} />
        <Route
          path="/bugs"
          element={
            <PrivateRoute isAuth={user}>
              <BugPage />
            </PrivateRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:code" element={<ResetPasswordPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App

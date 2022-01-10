import { Route, Routes, Navigate } from "react-router-dom"
import Navigation from "./components/UI/Navigation"
import DetailsPage from "./pages/details"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import UploadPage from "./pages/uploadPage"
import { UserContext } from "./store/UserContext"
import { useContext } from "react"
import ForgotPasswordPage from "./pages/forgotPassword"
import ResetPasswordPage from "./pages/resetPassword"
import BlogPage from "./pages/blog"
import LoginErrorPage from "./pages/loginError"
import ErrorPage from "./pages/errorPage"
import SignUpPage from "./pages/signUp"
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
          path="/upload"
          element={
            <PrivateRoute isAuth={user}>
              <UploadPage />
            </PrivateRoute>
          }
        />
        <Route path="/blog/*" element={<BlogPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:code" element={<ResetPasswordPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App

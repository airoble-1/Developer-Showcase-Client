import { createContext, useState, useEffect } from "react"

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      return JSON.parse(loggedInUser)
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user))
    else localStorage.clear()
  }, [user])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

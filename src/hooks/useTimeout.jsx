import { useEffect, useState } from "react"
import { useContext } from "react"
import { UserContext } from "./../store/UserContext"
import client from "./../apollo/apolloClient"
/****************
 Credit goes to Thi Tran, taken from:
 https://medium.com/tinyso/how-to-detect-inactive-user-to-auto-logout-by-using-idle-timeout-in-javascript-react-angular-and-b6279663acf2
*****************/

const IdleTimer = (timeout, setIsTimeout, user, setUser) => {
  // if user is not logged exit
  if (!user) return

  // if
  const expiredTime = parseInt(localStorage.getItem("_expiredTime"), 10)
  if (expiredTime > 0 && expiredTime < Date.now()) {
    setIsTimeout(true)
    cleanUp()
    return
  }

  let interval
  // start checking expired time on interval
  function startInterval() {
    updateExpiredTime()
    interval = setInterval(() => {
      const expiredTime = parseInt(localStorage.getItem("_expiredTime"), 10)

      if (expiredTime < Date.now()) {
        if (setIsTimeout) {
          setIsTimeout(true)
          cleanUp()
        }
      }
    }, 1000)
  }

  // update expired time
  function updateExpiredTime() {
    localStorage.setItem("_expiredTime", Date.now() + timeout * 1000)
  }

  // user interaction handler
  function tracker() {
    window.addEventListener("mousemove", updateExpiredTime)
    window.addEventListener("scroll", updateExpiredTime)
    window.addEventListener("keydown", updateExpiredTime)
  }
  // clean up after time expires
  function cleanUp() {
    setUser(null)
    client.clearStore()
    localStorage.clear()
    clearInterval(interval)
    window.removeEventListener("mousemove", updateExpiredTime)
    window.removeEventListener("scroll", updateExpiredTime)
    window.removeEventListener("keydown", updateExpiredTime)
  }

  tracker()
  startInterval()

  return { cleanUp }
}

const useTimeout = (time) => {
  const [isTimeout, setIsTimeout] = useState(false)
  const { user, setUser } = useContext(UserContext)
  useEffect(() => {
    const timer = IdleTimer(time, setIsTimeout, user, setUser)
  }, [time, user])
  return { isTimeout }
}

export default useTimeout

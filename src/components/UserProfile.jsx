import { useEffect } from "react"
import { Image, Spinner } from "react-bootstrap"
import { useLazyQuery } from "@apollo/client"
import { GET_USER } from "./../apollo/queries/getUser"

export default function UserProfile({ size = 50 }) {
  const [getUserProfile, { data, loading }] = useLazyQuery(GET_USER)
  useEffect(() => {
    getUserProfile()
  }, [getUserProfile])

  if (loading) return <Spinner aniamtion="grow" />
  if (!data) return null

  const style = {
    objectFit: "cover",
    height: `${size}px`,
    width: `${size}px`,
  }

  const {
    firstName,
    lastName,
    profileImage: { url },
  } = data.currentUser
  return (
    <div className="d-flex align-items-center mb-2">
      <Image
        src={url}
        style={style}
        roundedCircle
        alt={`${firstName} ${lastName}`}
      ></Image>
      <span className="mx-2 text-black fs-3">Hi, {firstName}!</span>
    </div>
  )
}

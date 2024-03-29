import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

const uploadLink = createUploadLink({
  /*
  REACT_APP_BACKEND_URL environment variable is not included in this project.
  project should atleast include the backend url for dev environment
  It should only be injected as a process environment variable if this app will be deployed to multiple servers, otherwise it should be an application environment variable
  */

  uri:
    process.env.NODE_ENV === "production"
      ? "https://devhunter-api-production.up.railway.app/graphql"
      : `${process.env.REACT_APP_BACKEND_URL}`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const user = localStorage.getItem("user");
  let token = null;
  if (user) {
    token = JSON.parse(user).token;
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

export default client;

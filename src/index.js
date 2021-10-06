import React from "react"
import { render } from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import client from "./utils/apolloClient"
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App"

render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
)

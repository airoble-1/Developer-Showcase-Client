import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { render } from "react-dom"
import { ApolloProvider } from "@apollo/client"
import client from "./apollo/apolloClient"
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App"
import "normalize.css"
render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
)

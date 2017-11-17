import App from '../../../shared/App'
import routes from '../../../shared/routes'

const React = require('react')
const express = require('express')
const {renderToString} = require('react-dom/server')
const {StaticRouter, matchPath} = require('react-router-dom')
const serialize = require('serialize-javascript')
const app = express()

app.get('*', (req, res) => {
  const activeRoute = routes.find(route => matchPath(req.url, route))

  const {params} = matchPath(req.url, activeRoute)

  if (!!activeRoute) {
    const requestInitialData = activeRoute.component.requestInitialData

    requestInitialData((initialData) => {
      const context = {initialData}
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      )
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Scapree</title>
            <link rel="stylesheet" href="/static/css/main.css">
            <script src="/static/bundle.js" defer></script>
            <script>window.__initialData__ = ${serialize(initialData)}</script>
          </head>
          <body>
            <div id='root'>${markup}</div>
          </body>
        </html>
      `)
    }, params)
  }
})

export default app

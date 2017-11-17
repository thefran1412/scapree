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

    requestInitialData
    ? requestInitialData((initialData) => {
      sendHTML(req.url, initialData, params, res)
    }, params)
    : sendHTML(req.url, '', params, res)
  }
})

function sendHTML (url, initialData, params, notSend) {
  const content = renderToString(
    <StaticRouter location={url} context={{initialData}}>
      <App />
    </StaticRouter>
  )
  notSend.send(`
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
        <div id='root'>${content}</div>
      </body>
    </html>
  `)
}

export default app

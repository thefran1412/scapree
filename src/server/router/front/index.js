import Layout from '../../../shared/components/Layout/Layout'
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

    let user = req.session.user ? req.session.user : 'unregistered'

    requestInitialData
    ? requestInitialData((initialData) => {
      sendHTML(req.url, initialData, user, res)
    }, params)
    : sendHTML(req.url, '', user, res)
  }
})

function sendHTML (url, initialData, user, notSend) {
  const content = renderToString(
    <StaticRouter location={url} context={{initialData}}>
      <Layout user={user} />
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
        <script>window.__user__ = ${serialize(user)}</script>
      </head>
      <body>
        <div id='root'>${content}</div>
      </body>
    </html>
  `)
}

export default app

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
    console.log(req.session)
    const token = req.session.token || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhMGM2MjVmMTEzYzAyMTliNDJjZDNhNCIsInVzZXJuYW1lIjoiZnJhbmNodSIsImVtYWlsIjoiZnJhbmNodUBnbWFpbC5jb20iLCJuYW1lIjoiRnJhbmNlc2MgRWRvIiwidXNlclR5cGUiOiJhZG1pbiJ9LCJpYXQiOjE1MTExOTQxNTh9.J9_EAGjZXGCvgwSGzZuDuUqhhfRrjXrLNYJi-XufvXc"

    requestInitialData
    ? requestInitialData((initialData) => {
      sendHTML(req.url, initialData, token, res)
    }, params)
    : sendHTML(req.url, '', token, res)
  }
})

function sendHTML (url, initialData, token, notSend) {
  const content = renderToString(
    <StaticRouter location={url} context={{initialData}}>
      <Layout token={token} />
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

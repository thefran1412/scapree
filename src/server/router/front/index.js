import Layout from '../../../shared/components/Layout/Layout'
import routes from '../../../shared/routes'

const React = require('react')
const express = require('express')
const {renderToString} = require('react-dom/server')
const {StaticRouter, matchPath} = require('react-router-dom')
const serialize = require('serialize-javascript')
const url = require('url')

const app = express()

app.get('*', (req, res) => {
  const cleanUrl = url.parse(req.url).pathname
  const activeRoute = routes.find(route => matchPath(cleanUrl, route))

  const {params} = matchPath(cleanUrl, activeRoute)
  const {query} = req

  if (!!activeRoute) {
    const requestInitialData = activeRoute.component.requestInitialData

    let user = req.session.user ? req.session.user : 'unregistered'
    requestInitialData
    ? requestInitialData(initialData => {
      sendHTML(req.url, initialData, user, query, res)
    }, params, query)
    : sendHTML(req.url, '', user, query, res)
  }
})

function sendHTML (url, initialData, user, query, notSend) {
  const content = renderToString(
    <StaticRouter location={url} context={{initialData}}>
      <Layout user={user} query={query} />
    </StaticRouter>
  )
  notSend.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Scapree</title>
        <link rel="stylesheet" href="/static/css/main.css">
        <script src="/static/bundle.js" defer></script>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,700" rel="stylesheet">
        <script>window.__initialData__ = ${serialize(initialData)}</script>
        <script>window.__user__ = ${serialize(user)}</script>
        <script>window.__query__ = ${serialize(query)}</script>
      </head>
      <body>
        <div id='root'>${content}</div>
      </body>
    </html>
  `)
}

export default app

import App from '../../../shared/App'
const React = require('react')
const express = require('express')
const {renderToString} = require('react-dom/server')
const {StaticRouter, matchPath} = require('react-router-dom')

const app = express()

app.get('*', (req, res) => {
  const context = {id: 'id'}
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
      </head>
      <body>
        <div id='root'>${markup}</div>
      </body>
    </html>
  `)
  // res.send('it works!')
})
// app.use(router)

export default app

import sourceMapSupport from 'source-map-support'
import dotenv from 'dotenv'
import app from './server'
import db from './server/config/db'

dotenv.load()
const {PORT, URL_DB} = process.env

db.openUri(URL_DB)

if (process.env.NODE_ENV === 'development') {
  sourceMapSupport.install()
} else {
  console.log('production')
}

// app.use('*', (req, res) => {
//   console.log('entered')
//   res.send('404 page not found')
// })

app.listen(PORT)
console.log(`Listening on PORT ${PORT}...`)

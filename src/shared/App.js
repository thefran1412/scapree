import React from 'react'
import {Switch, Route} from 'react-router-dom'
import routes from './routes'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        {routes.map((route, i) => <Route key={i} {...route} />)}
      </Switch>
      <Footer />
    </div>
  )
}

export default App
 
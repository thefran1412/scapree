import React from 'react'
import {Switch, Route} from 'react-router-dom'
import routes from './routes'
import Header from './components/Header/Header'

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        {routes.map((route, i) => <Route key={i} {...route} />)}
      </Switch>
    </div>
  )
}

export default App
 
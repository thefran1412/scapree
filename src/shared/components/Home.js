import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <h1>Home</h1>
        <button onClick={(e) => { console.log('button clicked') }}>Click</button>
      </div>
    )
  }
}

export default App

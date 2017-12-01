import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'

const App = () => {
  return (
    <footer>
      <div className='line'>
        <a target='_blank' href='https://github.com/thefran1412/scapree'> GitHub </a>
        <div className='dot' />
        <a target='_blank' href='https://github.com/thefran1412/'>© Copyright</a>
      </div>
    </footer>
  )
}

export default App
 
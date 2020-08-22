import React from 'react'
import { Router, navigate } from '@reach/router'

import AddNewLog from './pages/AddNewLog'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './components/NotFound'
import Register from './pages/Register'

const App = () => {
  const match = localStorage.getItem('cc-userJWT')

  const logout = () => {
    localStorage.removeItem('cc-userJWT')
    localStorage.removeItem('cc-userData')
    navigate('/login')
    window.location.reload()
  }

  return (
    <div>
      <div className="flex justify-between border-solid border-b-4 border-black bg-red-600 p-3">
        <h1 className="text-4xl uppercase" onClick={ () => navigate('/') } >Calorie Counter</h1>
        { match && <button onClick={ () => logout() }  className="text-white p-2 rounded ml-100" >Logout</button> }
      </div>

      <Router>
        <Home path="/" />
        <Login path="/login" />
        <Register path="/register" />
        <AddNewLog path="/log" />
        <NotFound default />
      </Router>
    </div>
  )
}

export default App

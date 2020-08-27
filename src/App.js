import React from 'react'
import { Router } from '@reach/router'

import AddNewLog from './pages/AddNewLog'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './components/NotFound'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Header from './components/Header'

const App = () => {
  const match = localStorage.getItem('cc-userJWT')

  return (
    <div>
      <Header match={ match } />

      <Router>
        <Home path="/" />
        <Login path="/login" />
        <Register path="/register" />
        <AddNewLog path="/log" />
        <Profile path="/profile" />
        <NotFound default />
      </Router>
    </div>
  )
}

export default App

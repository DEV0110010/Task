import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Footer from './components/FooterComponent'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-in' element={<SignIn />}/>
      <Route path='/sign-up' element={<SignUp />}/>
      <Route element={<PrivateRoute />}>
      <Route path='/dashboard' element={<Dashboard />}/>
      </Route>
      <Route path='/projects' element={<Projects />}/>
    </Routes>
    <Footer/>
    </>
  )
}
export default App
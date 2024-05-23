import { createContext, useState } from 'react'
import Header from './components/Header'
import Cards from './components/Cards'
import './App.css'
import AddMovie from './components/AddMovie'
import { Route, Routes, Link } from 'react-router-dom'
import Detail from './components/Detail'
import Login from './components/Login'
import Signup from './components/Signup'

const appstate = createContext();

function App() {
  const [login, setLogin] = useState(false)
  const [userName, setUserName] = useState("")

  return (
    <appstate.Provider value={{ userName, login, setLogin, setUserName }}>
      <>
        <Header className='sticky' />
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/addmovie' element={<AddMovie />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </>
    </appstate.Provider>
  )
}

export default App;
export { appstate }

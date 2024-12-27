import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Game from './Game'
import HomePage from './HomePage'
import BackgroundVideo from './Layouts/BackgroundVideo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BackgroundVideo/>}>
        <Route index element={<HomePage/>} />
        <Route path="/game" element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
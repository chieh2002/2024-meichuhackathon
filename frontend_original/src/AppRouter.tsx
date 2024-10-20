import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Board from './routers/Board'
import AboutMe from './routers/AboutMe'
import AppLayout from './AppLayout'

const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/about-me" element={<AboutMe />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  )
}

export default AppRouter

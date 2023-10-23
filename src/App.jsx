import React from 'react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import HomePage from './components/HomePage'
import ArticlesPage from './components/ArticlesPage'
import UserPage from './components/UserPage'
import SingleArticlePage from './components/SingleArticlePage'



function App() {


  return (
    <><Header />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:articleid" element={<SingleArticlePage />} />
        <Route path="/user" element={<UserPage />} />

      </Routes>

    
<Footer /></>
  )
}

export default App

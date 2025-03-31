import React from 'react'
import Pokecard from '../components/Pokecard'
import {RouterProvider ,createBrowserRouter } from 'react-router-dom'


const App = () => {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Pokecard/>
      },
    ])

  

    return (
      <RouterProvider  router ={router}/>
    )
}

export default App







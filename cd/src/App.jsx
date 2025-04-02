import React from 'react'
import Pokecard from '../components/Pokecard'
import {RouterProvider ,createBrowserRouter } from 'react-router-dom'
import Pokedetails from '../components/Pokedetails'


const App = () => {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Pokecard/>
      },
      {
        path: '/pokedetails',
        element: <Pokedetails/>
      }
    ])

  

    return (
      <RouterProvider  router ={router}/>
    )
}

export default App







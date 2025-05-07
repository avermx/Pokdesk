import React from 'react'
import Pokecard from '../components/Pokecard'
import {RouterProvider ,createBrowserRouter } from 'react-router-dom'
import Pokedetails from '../components/Pokedetails'
import Pokemontype from '../components/Pokemontype'
import Compare from '../components/Compare'



const App = () => {
    const router = createBrowserRouter([
      
      {
        path: '/',
        element: <Pokecard/>
      },
      {
        path: '/pokedetails/:id',
        element: <Pokedetails/>
      },
      {
        path: '/pokeType/:name',
        element:<Pokemontype/>
      },
      {
        path: '/Compare/:name',
        element: <Compare/>
      },

    ])

    return (
      <RouterProvider  router ={router}/>
    )
}

export default App







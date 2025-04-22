import React from 'react'
import Pokecard from '../components/Pokecard'
import {RouterProvider ,createBrowserRouter } from 'react-router-dom'
import Pokedetails from '../components/Pokedetails'
import Pokemontype from '../components/Pokemontype'



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
    ])

    return (
      <RouterProvider  router ={router}/>
    )
}

export default App







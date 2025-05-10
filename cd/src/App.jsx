import React, { useRef } from 'react'
import Pokecard from '../components/Pokecard'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Pokedetails from '../components/Pokedetails'
import Pokemontype from '../components/Pokemontype'
import Compare from '../components/Compare'
import { ScrollSmoother } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
gsap.registerPlugin(ScrollSmoother);

const App = () => {


  const contentRef = useRef();

  useGSAP(() => {
    ScrollSmoother.create({
      content: contentRef.current,
      smooth: 1.5,
      effects: true, 
    });
  }, []);

  const router = createBrowserRouter([

    {
      path: '/',
      element: <Pokecard />
    },
    {
      path: '/pokedetails/:id',
      element: <Pokedetails />
    },
    {
      path: '/pokeType/:name',
      element: <Pokemontype />
    },
    {
      path: '/Compare/:name',
      element: <Compare />
    },

  ])

  return (
    <div ref={contentRef} >
      <RouterProvider router={router} />
    </div>
  )
}

export default App







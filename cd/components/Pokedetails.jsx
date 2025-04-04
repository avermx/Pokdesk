import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Pokedetails = () => {
  const [Pokedata, setPokedata] = useState()
  const { id } = useParams()

  const API = `https://pokeapi.co/api/v2/pokemon/${id}`
  const FetchData = async () => {
    try {
      const res = await fetch(API)
      const data = await res.json()
      setPokedata(data)

    } catch (error) {
      console.log(error)
    }
  }
  console.log(Pokedata)

  useEffect(() => {
    FetchData();
  }, [])
  return (
    <div>

    </div>
  )
}

export default Pokedetails
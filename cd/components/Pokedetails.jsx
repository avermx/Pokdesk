import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Pokedetails = () => {
  const [Pokedata, setPokedata] = useState([])
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

Pokedata.forEach((e)=>{
  console.log(e)
  
})

  return (
    <>
      <div className='bg-amber-900 w-full h-screen'>
        <div className=' w-full text-white flex justify-center'>
          <div className='h-[55vh] w-[25%] flex justify-center '>
            <img className='' src={Pokedata.sprites?.other?.['official-artwork'].front_default} />
          </div>
        </div>
        <div className=' h-[45%] w-full text-white flex justify-center flex-col capitalize'>
          <h1 className='text-4xl flex justify-center'>{Pokedata.name}</h1>
          <div className='w-full h-full bg-amber-100 p-5 flex flex-col gap-2 justify-center items-center'>
            <div className='h-[10%] w-[80%] bg-white rounded-4xl'>
                        <div className='h-full w-[50%] bg-black rounded-full'>
                        {/* {Pokedata.stats[0].base_stat} */}
                        </div>
                  </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pokedetails
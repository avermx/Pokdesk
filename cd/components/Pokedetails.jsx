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


  return (
    <>
      <div className=' w-full  bg-red-100 flex justify-center flex-col items-center'>
        <div className=' w-full text-white flex justify-center'>
          <div className='h-[55vh] w-[25%] flex justify-center '>
            <img className='' src={Pokedata.sprites?.other?.['official-artwork'].front_default} />
          </div>
        </div>
        <div className='w-[20%] h-30 bg-yellow-200 flex justify-center items-center content-center '>
          <div className='w-full h-20 bg-yellow-50 border-t-[0.5px] border-b-[0.5px] flex items-center justify-center'>
            <h1 className='text-4xl flex justify-center'>{Pokedata.name}</h1>
          </div>
        </div>
        <div className=' h-[45%] w-full text-white flex justify-center flex-col capitalize gap-5 '>

          <div className=' bg-amber-100 p-1 flex flex-col gap-2 justify-center items-center p-5'>
            {Pokedata?.stats?.map((poke) => (
              <div className='h-[20%] w-[60vw] bg-white rounded-4xl '>
                <h1></h1>
                <div className=' bg-black rounded-full text-[0.9rem] p-1 h-[2vh]' style={{ width: `${poke.base_stat}vh` }} >
                </div>
              </div>

            ))}

          </div>
        </div>
      </div>
    </>
  )
}

export default Pokedetails
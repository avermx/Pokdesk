import React from 'react'
import { useEffect, useState } from 'react'
import poketypeicon from '../src/util/poketypicon'
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

  function poketype(type) {
    switch (type) {
      case 'normal':
        return '/normal.svg';

      case 'fire':
        return '/fire.svg';

      case 'grass':
        return '/grass.svg';

      case 'water':
        return '/water.svg';

      case 'electric':
        return '/electric.svg';

      case 'ice':
        return '/ice.svg';

      case 'fighting':
        return '/fighting.svg';

      case 'psychic':
        return '/psychic.svg';

      case 'bug':
        return '/bug.svg';

      case 'rock':
        return '/rock.svg';

      case 'ghost':
        return '/ghost.svg';

      case 'dragon':
        return '/dragon.svg';

      case 'dark':
        return '/dark.svg';

      case 'steel':
        return '/steel.svg';

      case 'fairy':
        return '/fairy.svg';

      case 'flying':
        return '/flying.svg';

      case 'poison':
        return '/poison.svg';

      case 'ground':
        return '/ground.svg'

    }
  }

  return (
    <>
      <div className=' w-full  bg-red-100 flex justify-center flex-col items-center'>
        <div className=' w-full text-white flex justify-center'>
          <div className='h-[55vh] w-[25%] flex justify-center '>
            <img className='' src={Pokedata.sprites?.other?.['official-artwork'].front_default} />
          </div>
        </div>
        <div className='w-[50%] h-20  flex justify-center items-center content-center '>
            <h1 className='text-4xl flex justify-center capitalize'>{Pokedata.name}</h1>
        </div>
        
        <div className=' w-[50%] h-[8vh] flex justify-between border-t-2 border-b-2 p-[0.3%]'>
          <div className=' w-[33%] h-full border-r-2'>

          </div>
          <div className=' h-[100%] flex justify-center gap-[10%] items-center'>
              {Pokedata?.types?.map((e)=>(
                <img src={poketype(e.type.name)}  className='h-[89%]'/> 
              ))}
          </div>
          <div className=' w-[33%] h-full border-l-2'></div>
        </div>
        <div className='w-full text-white flex flex-row capitalize gap-1 bg-amber-600 justify-center'>
          <div className=' w-[2%] '>
              {poketypeicon.map((e)=>(
                <img src={e.url}/>
                ))}
          </div>
          <div className='w-10 '>
                <div cla>
                  {Pokedata?.stats?.map((poke)=>(
                    <p>{poke.base_stat}</p>
                  ))}
               </div>
          </div>
          <div className='flex flex-col gap-[1rem] justify-center items-center p-[0.5%] bg-amber-100'>
            {Pokedata?.stats?.map((poke) => (
              <div className='h-[20%] w-[50vw] bg-white rounded-4xl '>
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
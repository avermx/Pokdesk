import React from 'react'
import { useEffect, useState } from 'react'
import poketypeicon from '../src/util/poketypicon'
import { Link, useParams } from 'react-router-dom'
import Evolution from './evolution'
import { FaArrowCircleRight } from "react-icons/fa";


const Pokedetails = () => {
  const [Pokedata, setPokedata] = useState([])
  const { id } = useParams()

  const API = `https://pokeapi.co/api/v2/pokemon/${id}`
  const FetchData = async () => {
    try {
      const res = await fetch(API)
      const data = await res.json()
      setPokedata(data)
      const detailsofpoke = data.abilities.map(async (e) => {
        const res = await fetch(e.ability.url)
        const data = await res.json()
        return data;
      })

      const detilsrepe = await Promise.all(detailsofpoke)

      setPokedata((e) => ({ ...e, main: detilsrepe }))

    } catch (error) {
      console.log(error)
    }
  }

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

  const handleCompare = (name) => {
    console.log(name)
  }
  return (
    <div className='flex flex-col gap-4 bg'>
      <div className=' w-full  flex justify-center flex-col items-center'>
        <div className=' w-full text-white flex justify-center'>
          <div className='h-[55vh] w-[25%] flex justify-center '>
            <img className='' src={Pokedata.sprites?.other?.["official-artwork"].front_default} />
          </div>
        </div>
        <div className='w-[50%] h-20  flex justify-center items-center content-center '>
          <h1 className='text-4xl flex justify-center capitalize'>{Pokedata.name}</h1>
        </div>

        <div className=' w-[50%] h-[8vh] flex justify-between border-t-2 border-b-2 p-[0.3%]'>
          <div className=' w-[33%] h-full border-r-2 flex justify-center items-center gap-2 flex-row-reverse '>
            <p className='text-2xl'>{Pokedata.height / 10} M</p>
            <div className='flex justify-center content-center items-center gap-1 text-2xl mt-0.5'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M229.66,90.34,90.34,229.66a8,8,0,0,1-11.31,0L26.34,177a8,8,0,0,1,0-11.31L165.66,26.34a8,8,0,0,1,11.31,0L229.66,79A8,8,0,0,1,229.66,90.34Z"
                  opacity="0.2"
                ></path>
                <path d="M235.32,73.37,182.63,20.69a16,16,0,0,0-22.63,0L20.68,160a16,16,0,0,0,0,22.63l52.69,52.68a16,16,0,0,0,22.63,0L235.32,96A16,16,0,0,0,235.32,73.37ZM84.68,224,32,171.31l32-32,26.34,26.35a8,8,0,0,0,11.32-11.32L75.31,128,96,107.31l26.34,26.35a8,8,0,0,0,11.32-11.32L107.31,96,128,75.31l26.34,26.35a8,8,0,0,0,11.32-11.32L139.31,64l32-32L224,84.69Z"></path>
              </svg>
              <p>Height</p>
            </div>
          </div>
          <div className=' h-[100%] flex justify-center gap-[10%] items-center'>
            {Pokedata?.types?.map((e) => (
              <img src={poketype(e.type.name)} className='h-[89%]' />
            ))}
          </div>
          <div className=' w-[33%] h-full border-l-2 flex justify-center items-center gap-2 flex-row-reverse '>
            <p className='text-2xl'>{Pokedata.weight / 10} KG</p>
            <div className='flex justify-center content-center items-center gap-1 text-2xl mt-0.5'>
              <svg className='mt-0.5' xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" viewBox="0 0 256 256"><path d="M96,64V192a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H88A8,8,0,0,1,96,64Zm96-8H168a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8h24a8,8,0,0,0,8-8V64A8,8,0,0,0,192,56Z" opacity="0.2"></path><path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H168a16,16,0,0,0-16,16v56H104V64A16,16,0,0,0,88,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V136h48v56a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM32,168V88H48v80Zm56,24H64V64H88V192Zm104,0H168V64h24V175.83c0,.06,0,.11,0,.17s0,.12,0,.17V192Zm32-24H208V88h16Z"></path></svg>
              <p>Weight</p>
            </div>
          </div>
        </div>
        <div className='w-full text-white flex flex-row capitalize gap-1  justify-center gap-[0.6%] p-[1%]'>
          <div className=' w-[2%] '>
            {poketypeicon.map((e) => (
              <img src={e.url} />
            ))}
          </div>
          <div className='w-10 flex flex-col'>
            <div className='text-[1.22rem]'>
              {Pokedata?.stats?.map((poke) => (
                <p>{poke.base_stat}</p>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-[0.8rem] justify-center items-center w-[40vw]'>
            {Pokedata?.stats?.map((poke) => (
              <div className='h-[10%] w-[40vw] bg-white rounded-4xl max-w-[50vw]'>
                <div className=' bg-black rounded-full text-[0.9rem] p-1 h-full' style={{ width: `${poke.base_stat / 200 * 100}%` }} >
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=' w-full h-10 justify-center flex '>
        <Link className='w-full flex justify-center items-center gap-2' to={`/compare/${Pokedata.name}`}>
          <div className='  h-full rounded-3xl justify-center items-center flex text-xl' onClick={() => handleCompare(Pokedata.name)}>
            <h1>"Curious who would win? Compare your favorite Pokémon now!"</h1>
          </div>
          <FaArrowCircleRight size={22}/>
        </Link>
      </div>
      <Evolution speciesUrl={Pokedata?.species} pokemonName={Pokedata.name} />
      <div className=' w-full  flex justify-center'>
        <div className='w-[50%]  p-[1%] flex gap-5 flex-col justify-center '>
          <h1 className='text-xl font-bold'>Abilities</h1>
          {Pokedata?.main?.map((e) => (
            <div className='w-[80%] p-[2%] rounded-xl capitalize border border-black '>
              <h1 className='text-xl'>{e.name}</h1>
              {e.effect_entries?.map((e) => (
                e.language.name === 'en' ? <> <h1 className='text-[0.8rem]'>{e.effect}</h1></> : ""
              ))}
            </div>
          ))}

        </div>
      </div>
    </div>

  )
}

export default Pokedetails
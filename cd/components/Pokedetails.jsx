import { useEffect, useState } from 'react'
import poketypeicon from '../src/util/poketypicon'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Evolution from './Evolution'
import { FaArrowCircleRight } from "react-icons/fa";

const Pokedetails = () => {
  const [Pokedata, setPokedata] = useState([])
  const { id } = useParams()
  const [statWidths, setStatWidths] = useState([]);
  const navigate = useNavigate();
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
  const getBarColor = (value) => {
    if (value >= 150) return 'bg-green-500';     
    if (value >= 100) return 'bg-lime-400';       
    if (value >= 50) return 'bg-yellow-400';      
    return 'bg-red-500';                          
  };

  useEffect(() => {
    FetchData();
  }, [])

  useEffect(() => {
    if (Pokedata?.stats) {
      const widths = Pokedata.stats.map(poke => (poke.base_stat / 200) * 100);
      setTimeout(() => setStatWidths(widths), 100); // short delay to trigger transition
    }
  }, [Pokedata]);

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

console.log(Pokedata)
  return (
    <div className='flex flex-col gap-4 bg text-white backdrop-blur-lg bg-white/10 border border-white/20  p-2 md:p-4 shadow-lg'>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 w-fit px-4 py-2 mb-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400'
      >
        <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
        </svg>
        Back
      </button>
      <div className='w-full flex justify-center flex-col items-center'>
        <div className='w-full text-white flex justify-center'>
          <div className='h-[30vh] sm:h-[40vh] md:h-[55vh] w-[50%] sm:w-[40%] md:w-[30%] lg:w-[25%] flex justify-center'>
            <img className='object-contain max-w-full max-h-full' src={Pokedata.sprites?.other?.["official-artwork"].front_default} alt={Pokedata.name} />
          </div>
        </div>
        <div className='w-full sm:w-[80%] md:w-[70%] lg:w-[50%] h-16 md:h-20 flex justify-center items-center content-center'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl flex justify-center capitalize'>{Pokedata.name}</h1>
        </div>

        <div className='w-full sm:w-[80%] md:w-[70%] lg:w-[50%] h-[8vh] flex justify-between border-t-2 border-b-2 p-[0.3%]'>
          <div className='w-[33%] h-full border-r-2 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 sm:flex-row-reverse'>
            <p className='text-lg sm:text-xl md:text-2xl'>{Pokedata.height / 10} M</p>
            <div className='flex justify-center content-center items-center gap-1 text-base sm:text-lg md:text-2xl mt-0.5'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M229.66,90.34,90.34,229.66a8,8,0,0,1-11.31,0L26.34,177a8,8,0,0,1,0-11.31L165.66,26.34a8,8,0,0,1,11.31,0L229.66,79A8,8,0,0,1,229.66,90.34Z"
                  opacity="0.2"
                ></path>
                <path d="M235.32,73.37,182.63,20.69a16,16,0,0,0-22.63,0L20.68,160a16,16,0,0,0,0,22.63l52.69,52.68a16,16,0,0,0,22.63,0L235.32,96A16,16,0,0,0,235.32,73.37ZM84.68,224,32,171.31l32-32,26.34,26.35a8,8,0,0,0,11.32-11.32L75.31,128,96,107.31l26.34,26.35a8,8,0,0,0,11.32-11.32L107.31,96,128,75.31l26.34,26.35a8,8,0,0,0,11.32-11.32L139.31,64l32-32L224,84.69Z"></path>
              </svg>
              <p className="hidden sm:block">Height</p>
            </div>
          </div>
          <div className='h-[100%] flex justify-center gap-[5%] md:gap-[10%] items-center'>
            {Pokedata?.types?.map((e, index) => (
              <img key={index} src={poketype(e.type.name)} className='h-[60%] sm:h-[75%] md:h-[89%]' alt={e.type.name} />
            ))}
          </div>
          <div className='w-[33%] h-full border-l-2 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 sm:flex-row-reverse'>
            <p className='text-lg sm:text-xl md:text-2xl'>{Pokedata.weight / 10} KG</p>
            <div className='flex justify-center content-center items-center gap-1 text-base sm:text-lg md:text-2xl mt-0.5'>
              <svg className='mt-0.5 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><path d="M96,64V192a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H88A8,8,0,0,1,96,64Zm96-8H168a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8h24a8,8,0,0,0,8-8V64A8,8,0,0,0,192,56Z" opacity="0.2"></path><path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H168a16,16,0,0,0-16,16v56H104V64A16,16,0,0,0,88,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V136h48v56a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM32,168V88H48v80Zm56,24H64V64H88V192Zm104,0H168V64h24V175.83c0,.06,0,.11,0,.17s0,.12,0,.17V192Zm32-24H208V88h16Z"></path></svg>
              <p className="hidden sm:block">Weight</p>
            </div>
          </div>
        </div>
          {/* Stats Section */}
        <div className='w-full text-white flex flex-row capitalize gap-2 justify-center p-[1%]'>
          <div className='w-[2%] hidden sm:block '>
            {poketypeicon.map((e, index) => (
              <img key={index} src={e.url} alt="type icon" className="w-8 h-8 sm:w-8 sm:h-8 my-[10px] bg-gray-300 rounded-xl" />
            ))}
          </div>
          <div className='w-8 md:w-10 flex flex-col'>
            <div className='text-sm md:text-base lg:text-lg text-white'>
              {Pokedata?.stats?.map((poke, index) => (
                <p key={index} className="py-1 sm:py-2">{poke.base_stat}</p>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-[0.6rem] md:gap-[0.8rem] justify-center items-center w-[60vw] sm:w-[50vw] md:w-[40vw]'>
            {Pokedata?.stats?.map((poke, index) => (
              <div
                key={poke.stat.name}
                className='h-[10%] w-full bg-gray-300/30 rounded-4xl max-w-full overflow-hidden'
              >
                <div
                  className={`rounded-full text-[0.7rem] md:text-[0.9rem] p-1 h-full transition-all duration-700 ease-in-out ${getBarColor(poke.base_stat)}`}
                  style={{ width: `${statWidths[index] || 0}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='w-full h-10 justify-center flex'>
        <Link 
          className='w-fit flex justify-center items-center gap-2 hover:bg-white/20 transition-all duration-300 rounded-lg p-2 cursor-pointer' 
          to={`/compare/${Pokedata.name}`}
        >
          <div className='h-full rounded-3xl justify-center items-center flex text-sm sm:text-base md:text-xl px-2 text-center'>
            <h1 className='hover:text-blue-300 transition-colors duration-300'>Compare your favorite Pokémon now!</h1>
          </div>
          <FaArrowCircleRight size={18} className="md:text-[22px] hover:scale-110 transition-transform duration-300" />
        </Link>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] flex justify-center">
          <Evolution speciesUrl={Pokedata?.species} pokemonName={Pokedata.name} />
        </div>
      </div>
      <div className='w-full flex justify-center'>
        <div className='w-full sm:w-[80%] md:w-[70%] lg:w-[50%] p-[1%] flex gap-3 md:gap-5 flex-col justify-center'>
          <h1 className='text-lg md:text-xl font-bold text-center sm:text-left mb-2'>Abilities</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Pokedata?.main?.map((e, index) => (
              <div key={index} className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col gap-2 shadow-lg hover:scale-[1.03] hover:bg-white/20 transition-all duration-300'>
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20.5C7.305 20.5 3.5 16.695 3.5 12S7.305 3.5 12 3.5 20.5 7.305 20.5 12 16.695 20.5 12 20.5z" /></svg>
                  <h2 className='text-lg md:text-xl font-semibold capitalize'>{e.name}</h2>
                </div>
                <div className="text-gray-200 text-[0.95rem] md:text-base leading-relaxed">
                  {e.effect_entries?.map((effect, idx) => (
                    effect.language.name === 'en' ? <p key={idx}>{effect.effect}</p> : null
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    

    </div>
  )
}

export default Pokedetails
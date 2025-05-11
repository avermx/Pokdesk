import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const Compare = () => {
  const { name } = useParams()
  const [searched, setSearched] = useState([]);
  const [results, setResult] = useState([])
  const [pokemondata, setPokemondata] = useState([])
  const [pokemonData2, setpokemonData2] = useState([])
  const [isFocused, setisFocused] = useState(false)
  const [pokeName, setpokeName] = useState([])

  const handleFocused = () => {
    setisFocused(true);
  }
  const handleBlur = () => {
    setTimeout(() => {
      setisFocused(false)
    }, 100);

  }
  const handleClick = (e) => {
    setSearched(e)
    fetchName(e)
  }

  const fetchName = async (e) => {
    const API3 = `https://pokeapi.co/api/v2/pokemon/${e}`
    const res = await fetch(API3);
    const data = await res.json();
    setpokeName(data)

  };
  const API1 = `https://pokeapi.co/api/v2/pokemon?&limit=100000`;
  const fetchPokeMonName = async () => {
    const res = await fetch(API1);
    const data = await res.json();
    setpokemonData2(data.results);
  };

  useEffect(() => {
    fetchPokeMonName()
  }, [])

  const API = `https://pokeapi.co/api/v2/pokemon/${name}`
  const FetchData = async () => {
    try {
      const res = await fetch(API)
      const data = await res.json()
      setPokemondata(data)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setResult(
      pokemonData2.filter((Pokemon) => Pokemon.name.includes(searched))
    );
  }, [searched])


  useEffect(() => {
    FetchData();
  }, [])

  return (
    <>
      <div className=' min-h-screen w-full flex flex-col md:flex-row magicpattern1 text-white gap-5'>
        {/* Left Pokemon */}
        <div className=' w-full md:w-[50%]  justify-center  md:pt-14 '>
          <div className=' h-full w-full flex flex-col items-center gap-3 md:gap-5 pt-3'>
            <div className='w-full flex justify-center'>
              <img className='w-[60%] sm:w-[50%] md:w-[40%] object-contain' 
                   src={pokemondata.sprites?.other?.["official-artwork"].front_default}
                   alt={name} />
            </div>
            <h1 className='text-xl sm:text-2xl md:text-3xl capitalize'>{name}</h1>
            <div className='flex gap-2 md:gap-3 w-full justify-center'>
              <div>
                <div className='text-sm sm:text-base md:text-[1.15rem]'>
                  {pokemondata?.stats?.map((poke, index) => (
                    <p key={index}>{poke.base_stat}</p>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-2 md:gap-[0.8rem] justify-center items-center w-[60vw] sm:w-[50vw] md:w-[40vw]'>
                {pokemondata?.stats?.map((poke, index) => (
                  <div key={index} className='h-[1.5vh] sm:h-[2vh] w-full bg-gray-100 rounded-4xl'>
                    <div className='bg-orange-500 rounded-full text-[0.7rem] md:text-[0.9rem] p-1 h-full' 
                         style={{ width: `${poke.base_stat / 200 * 100}%` }}>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Pokemon / Search */}
        <div className='w-full md:w-[50%] p-[1%] mt-6 md:mt-0  sm:border-l-2 border-gray-200 '>
          <div className='w-full justify-center items-center flex '>
            <input 
              type="text" 
              className='border border-white w-[80%] sm:w-[70%] md:w-[60%] p-[1%] rounded-md' 
              value={searched} 
              onChange={(e) => setSearched(e.target.value)} 
              onFocus={() => handleFocused()} 
              onBlur={() => handleBlur()} 
              placeholder="Search Pokémon"
            />
          </div>
          <div className='flex flex-col items-center relative'>
            <ul className='w-[80%] sm:w-[70%] md:w-[60%]  absolute z-10'>
              {isFocused ? results.map((e, index) => (
                <li key={index} className='text-base sm:text-lg md:text-[1.5rem] text-center cursor-pointer capitalize border-2 border-gray-200  bg-black/70 backdrop-blur-md py-1' 
                    onClick={() => handleClick(e.name)}>
                  {e.name}
                </li>
              )).slice(0, 5) : ''}
            </ul>
          </div>
          <div className='flex flex-col items-center gap-3 md:gap-5 mt-6'>
            <div className='w-full flex justify-center'>
              <img className='w-[60%] sm:w-[50%] md:w-[40%] object-contain' 
                   src={pokeName?.sprites?.other?.["official-artwork"].front_default} 
                   alt={pokeName.name} />
            </div>
            <h1 className='text-xl sm:text-2xl md:text-3xl capitalize'>{pokeName.name}</h1>
            <div className='flex gap-2 md:gap-3 w-full justify-center'>
              <div>
                <div className='text-sm sm:text-base md:text-[1.15rem]'>
                  {pokeName?.stats?.map((poke, index) => (
                    <p key={index}>{poke.base_stat}</p>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-2 md:gap-[0.8rem] justify-center items-center w-[60vw] sm:w-[50vw] md:w-[40vw]'>
                {pokeName?.stats?.map((poke, index) => (
                  <div key={index} className='h-[1.5vh] sm:h-[2vh] w-full bg-gray-100 rounded-4xl'>
                    <div className='bg-orange-500 rounded-full text-[0.7rem] md:text-[0.9rem] p-1 h-full' 
                         style={{ width: `${poke.base_stat / 200 * 100}%` }}>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Compare

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
      <div className='h-[100vh] w-[100%]  flex'>
        <div className='h-[100%] w-[50%] bg-fuchsia-100 p-[1%] justify-center pt-14'>
          <div className='  w-full flex flex-col items-center gap-5 '>
            <div className='w-full flex justify-center '>
              <img className='w-[40%]' src={pokemondata.sprites?.other?.["official-artwork"].front_default} />
            </div>
            <h1 className='text-3xl'>{name}</h1>
            <div className='flex gap-3 '>
              <div>
                <div className='text-[1.15rem]'>
                  {pokemondata?.stats?.map((poke) => (
                    <p>{poke.base_stat}</p>
                  ))}
                </div>
              </div>
              <div className=' flex flex-col gap-[0.8rem] justify-center items-center w-[40vw]'>
                {pokemondata?.stats?.map((poke) => (
                  <div className=' h-[2vh] w-[40vw] bg-white rounded-4xl '>
                    <div className=' bg-black rounded-full text-[0.9rem] p-1 h-full' style={{ width: `${poke.base_stat / 200 * 100}%` }} >
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='h-[100%] w-[50%] p-[1%] bg-fuchsia-50 '>
          <div className='w-full justify-center items-center flex'>
            <input type="text" className='border border-black w-[60%] p-[1%]' value={searched} onChange={(e) => setSearched(e.target.value)} onFocus={() => handleFocused()} onBlur={() => handleBlur()} />
          </div>
          <div className='flex flex-col items-center relative'>
            <ul className='w-[60%] bg-amber-100 absolute'>
              {isFocused ? results.map((e) => (
                <li className='text-[1.5rem] text-center border cursor-pointer ' onClick={() => handleClick(e.name)}>{e.name} </li>
              )).slice(0, 5) : ''}
            </ul>
          </div>
              <div className='  w-full flex flex-col items-center gap-5'>
                <div className='w-full flex justify-center '>
                  <img className='w-[40%]' src={pokeName?.sprites?.other?.["official-artwork"].front_default} />
                </div>
                <h1 className='text-3xl'>{pokeName.name}</h1>
                <div className='flex gap-3 '>
                  <div>
                    <div className='text-[1.15rem]'>
                      {pokeName?.stats?.map((poke) => (
                        <p>{poke.base_stat}</p>
                      ))}
                    </div>
                  </div>
                  <div className=' flex flex-col gap-[0.8rem] justify-center items-center w-[40vw]'>
                    {pokeName?.stats?.map((poke) => (
                      <div className=' h-[2vh] w-[40vw] bg-white rounded-4xl '>
                        <div className=' bg-black rounded-full text-[0.9rem] p-1 h-full' style={{ width: `${poke.base_stat / 200 * 100}%` }} >
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
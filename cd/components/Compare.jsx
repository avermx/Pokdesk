import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router'

const Compare = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const [searched, setSearched] = useState('');
  const [results, setResult] = useState([])
  const [pokemondata, setPokemondata] = useState([])
  const [pokemonData2, setpokemonData2] = useState([])
  const [isFocused, setisFocused] = useState(false)
  const [pokeName, setpokeName] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingCompare, setIsLoadingCompare] = useState(false)
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const handleFocused = () => {
    setisFocused(true);
  }

  const handleBlur = (e) => {
    // Use setTimeout to allow click events to process first
    setTimeout(() => {
      setisFocused(false);
      setSelectedIndex(-1);
    }, 150);
  }

  const handleSuggestionClick = (pokemonName) => {
    setSearched(pokemonName);
    fetchName(pokemonName);
    setisFocused(false);
    setSelectedIndex(-1);
  }

  const handleKeyDown = (e) => {
    if (!isFocused) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSuggestionClick(results[selectedIndex].name);
        }
        break;
      case 'Escape':
        setisFocused(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  }

  const fetchName = async (e) => {
    setIsLoadingCompare(true)
    const API3 = `https://pokeapi.co/api/v2/pokemon/${e}`
    const res = await fetch(API3);
    const data = await res.json();
    setpokeName(data)
    setIsLoadingCompare(false)
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
      setIsLoading(true)
      const res = await fetch(API)
      const data = await res.json()
      setPokemondata(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (searched?.trim() === '') {
      setResult([]);
      return;
    }
    setResult(
      pokemonData2.filter((Pokemon) => 
        Pokemon.name.toLowerCase().includes(searched.toLowerCase())
      )
    );
  }, [searched, pokemonData2])


  useEffect(() => {
    FetchData();
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setisFocused(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const PokemonSkeleton = () => (
    <div className='flex flex-col items-center gap-3 md:gap-5'>
      <div className='w-full flex justify-center'>
        <div className='w-[60%] sm:w-[50%] md:w-[40%] h-[200px] bg-gray-500/20 animate-pulse rounded-lg'></div>
      </div>
      <div className='h-8 w-32 bg-gray-500/20 animate-pulse rounded'></div>
      <div className='flex gap-2 md:gap-3 w-full justify-center'>
        <div>
          <div className='text-sm sm:text-base md:text-[1.15rem]'>
            {[...Array(6)].map((_, index) => (
              <div key={index} className='h-6 w-12 bg-gray-500/20 animate-pulse rounded mb-2'></div>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2 md:gap-[0.8rem] justify-center items-center w-[60vw] sm:w-[50vw] md:w-[40vw]'>
          {[...Array(6)].map((_, index) => (
            <div key={index} className='h-[1.5vh] sm:h-[2vh] w-full bg-gray-500/20 animate-pulse rounded-4xl'></div>
          ))}
        </div>
      </div>
    </div>
  )

  const getStatWinner = (stat1, stat2) => {
    if (!stat1 || !stat2) return null;
    if (stat1 > stat2) return 'left';
    if (stat2 > stat1) return 'right';
    return 'tie';
  }

  const statNames = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <>
      <div className='min-h-screen w-full flex flex-col bg text-white gap-5 pb-10'>
        {/* Back Button */}
        <div className='w-full px-4 md:px-8 pt-4'>
          <button
            onClick={handleBack}
            className='flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors backdrop-blur-sm'
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Back
          </button>
        </div>

        <div className='flex flex-col md:flex-row gap-5'>
          {/* Left Pokemon */}
          <div className='w-full md:w-[50%] justify-center md:pt-14'>
            {isLoading ? (
              <PokemonSkeleton />
            ) : (
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
            )}
          </div>

          {/* Right Pokemon / Search */}
          <div className='w-full md:w-[50%] p-[1%] mt-6 md:mt-0 sm:border-l-2 border-gray-200'>
            <div className='w-full justify-center items-center flex relative' ref={dropdownRef}>
              <input 
                ref={inputRef}
                type="text" 
                className='border border-white w-[80%] sm:w-[70%] md:w-[60%] p-[1%] rounded-md bg-transparent' 
                value={searched} 
                onChange={(e) => setSearched(e.target.value)} 
                onFocus={handleFocused} 
                onBlur={handleBlur} 
                onKeyDown={handleKeyDown}
                placeholder="Search Pokémon"
              />
              {isFocused && searched?.trim() !== '' && (
                <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-[80%] sm:w-[70%] md:w-[60%] z-10 mt-1'>
                  <ul className='bg-black/70 backdrop-blur-md rounded-lg overflow-hidden'>
                    {results.slice(0, 5).map((e, index) => (
                      <li 
                        key={index} 
                        className={`text-base sm:text-lg md:text-[1.5rem] text-center cursor-pointer capitalize border-b border-gray-700 py-2 px-4 hover:bg-gray-700 transition-colors ${
                          index === selectedIndex ? 'bg-gray-700' : ''
                        }`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSuggestionClick(e.name);
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        {e.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className='flex flex-col items-center gap-3 md:gap-5 mt-6'>
              {isLoadingCompare ? (
                <PokemonSkeleton />
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>

        {/* Comparison Results */}
        <div className='w-full px-4 md:px-8 mt-8'>
          <h2 className='text-2xl md:text-3xl font-bold text-center mb-6'>Comparison Results</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {pokemondata?.stats?.map((stat, index) => {
              const winner = getStatWinner(stat.base_stat, pokeName?.stats?.[index]?.base_stat);
              return (
                <div key={index} className='bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm'>
                  <h3 className='text-lg md:text-xl font-semibold mb-3 text-center'>{statNames[index]}</h3>
                  <div className='flex justify-between items-center gap-4'>
                    <div className={`flex-1 text-center ${winner === 'left' ? 'text-green-400' : winner === 'tie' ? 'text-yellow-400' : ''}`}>
                      <p className='text-sm md:text-base opacity-75'>Left</p>
                      <p className='text-xl md:text-2xl font-bold'>{stat.base_stat}</p>
                    </div>
                    <div className='text-center'>
                      <p className='text-sm md:text-base opacity-75'>VS</p>
                      <p className='text-lg md:text-xl font-bold'>{winner === 'tie' ? '=' : winner === 'left' ? '>' : '<'}</p>
                    </div>
                    <div className={`flex-1 text-center ${winner === 'right' ? 'text-green-400' : winner === 'tie' ? 'text-yellow-400' : ''}`}>
                      <p className='text-sm md:text-base opacity-75'>Right</p>
                      <p className='text-xl md:text-2xl font-bold'>{pokeName?.stats?.[index]?.base_stat}</p>
                    </div>
                  </div>
                  {winner !== 'tie' && (
                    <p className='text-center mt-3 text-sm md:text-base'>
                      Winner: <span className='font-bold'>{winner === 'left' ? name : pokeName?.name}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Compare
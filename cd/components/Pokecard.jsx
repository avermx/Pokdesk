import React from 'react'


import { useState, useEffect } from 'react';


const Pokecard = () => {

  const [edata, setedata] = useState([])
  const [Offset, setOffset] = useState(0)
  const [firstindex, setfirstindex] = useState(0)
  const [lastindex, setlastindex] = useState(10)
  let TotalPage = Array.from({ length: Math.floor(1302 / 20) }, (_, index) => index + 1);
  const [Page, setPage] = useState(TotalPage.slice(firstindex, lastindex))
  const [currentbtn, setcurrentbtn] = useState(1)

  const API = `https://pokeapi.co/api/v2/pokemon?offset=${Offset}&limit=20`

  const FetchPoke = async () => {
    try {
      const res = await fetch(API)
      const data = await res.json()
      const detailsofpokemone = data.results.map(async (currentpoke) => {
        const res = await fetch(currentpoke.url)
        const data = await res.json()
        return data;
      });

      const detilsrepe = await Promise.all(detailsofpokemone)
      setedata(detilsrepe)
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setedata([])
    FetchPoke();
  }, [Offset])
  // for dynamic Bg PokeTypes
  function poketype(type) {
    switch (type) {
      case 'normal':
        return 'bg-[#A8A77A]';

      case 'fire':
        return 'bg-[#EE8130]';

      case 'grass':
        return 'bg-[#7AC74C]';

      case 'water':
        return 'bg-[#6390F0]';

      case 'electric':
        return 'bg-[#F7D02C]';

      case 'ice':
        return 'bg-[#96D9D6]';

      case 'fighting':
        return 'bg-[#C22E28]';

      case 'psychic':
        return 'bg-[#F95587]';

      case 'bug':
        return 'bg-[#A6B91A]';

      case 'rock':
        return 'bg-[#B6A136]';

      case 'ghost':
        return 'bg-[#735797]';

      case 'dragon':
        return 'bg-[#6F35FC]';

      case 'dark':
        return 'bg-[#705746]';

      case 'steel':
        return 'bg-[#B7B7CE]';

      case 'fairy':
        return 'bg-[#D685AD]';

      case 'flying':
        return 'bg-[#A98FF3]';

      case 'poison':
        return 'bg-[#A33EA1]';

      case 'ground':
        return 'bg-[#E2BF65]'

    }
  }
  // for dynamic Bg for PokeCard
  function poketypeforbg(type) {
    switch (type) {
      case 'normal':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#A8A77A,_rgba(6,14,32,0.8))]';

      case 'fire':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#EE8130,_rgba(6,14,32,0.8))]';

      case 'grass':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#7AC74C,_rgba(6,14,32,0.8))]';

      case 'water':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#6390F0,_rgba(6,14,32,0.8))]';

      case 'electric':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#F7D02C,_rgba(6,14,32,0.8))]';

      case 'ice':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#96D9D6,_rgba(6,14,32,0.8))]';

      case 'fighting':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#C22E28,_rgba(6,14,32,0.8))]';

      case 'psychic':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#F95587,_rgba(6,14,32,0.8))]';

      case 'bug':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#A6B91A,_rgba(6,14,32,0.8))]';

      case 'rock':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#B6A136,_rgba(6,14,32,0.8))]';

      case 'ghost':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#735797,_rgba(6,14,32,0.8))]';

      case 'dragon':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#6F35FC,_rgba(6,14,32,0.8))]';

      case 'dark':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#705746,_rgba(6,14,32,0.8))]';

      case 'steel':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#B7B7CE,_rgba(6,14,32,0.8))]';

      case 'fairy':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#D685AD,_rgba(6,14,32,0.8))]';

      case 'flying':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#A98FF3,_rgba(6,14,32,0.8))]';

      case 'poison':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#A33EA1,_rgba(6,14,32,0.8))]';

      case 'ground':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#E2BF65,_rgba(6,14,32,0.8))]'

    }
  }

  //handle On Click Pagenation

  function handleclick(anime, i) {
    setOffset(anime * 20)
    if (anime === 1) setOffset(0)
    if (i === 0 && firstindex === 0) return 0
    if (i === 0) {
      setfirstindex((pre) => pre - 5)
      setlastindex((pre) => pre - 5)
    }
    if (i === 9) {
      setfirstindex((pre) => pre + 5)
      setlastindex((pre) => pre + 5)
    }
  }
  useEffect(() => {
    setPage(TotalPage.slice(firstindex, lastindex))
  }, [firstindex, lastindex])

  return (
    <>
      <div className='bg-linear-to-t from-[rgb(255,131,1)] to-[rgb(255,73,0)] w-full p-[2%] saturate-100'>
        <div className='w-full flex justify-center'>
          <div className=''>
            <img src="/poke.svg" className='flex justify-center ' />
          </div>
        </div>
        <div className='front flex justify-center px-[5%]'>
          <div className=' w-full flex flex-col gap-5 text-white justify-center'>
            <h1 className='text-7xl font-bold text-white'>Charizard</h1>
            <p className='text-xl w-[90%]'>
              Charizard, the towering flying and fiery Pokemon, is the ultimate evolution of the adorable Charmander. With its majestic wings and blazing flames, Charizard dominates the skies and inspires respect. His strength and courage are legendary, and his destructive fire is capable of incinerating his opponents. Despite his wild temperament, Charizard is known for forming deep and loyal bonds with his trainers.His imposing presence and flying skills make him a valuable and protective companion on any team.
            </p>
          </div>
          <div className='img-dragon '>
            <img src="/charizard.png" className='aspect-square ' />
          </div>
        </div>
      </div>
      <div className='px-[6%] bg-linear-to-t from-[rgb(255,73,0)] to-[rgb(255,131,1)]'>
        <div className=' flex justify-center'>
          <div className='w-[40%] '>
            <img src="/treinador-pk.png" />
          </div>
          <div className='w-[60%]  p-[2%] flex flex-col gap-[10%] text-white justify-center'>
            <h1 className='text-4xl '>Experience the thrill of capturing and battling: Be a Pokemon master in PokedExplore!</h1>
            <p className='text-xl'>Discover a world full of adventures with PokedExplore! Now, you can become a true Pokemon trainer by capturing your favorite creatures with just one click. Wait for the pokeball to appear, click and face a surprise Pokemon to add to your pokex. Assemble a powerful deck and challenge your friends in exciting battles! The journey begins now. Get ready to be the best coach of all time!</p>
          </div>

        </div>
      </div>
      <div className='w-full flex justify-between px-[8%] font-bold text-xl bg-black text-white saturate-250'>
        <div className='Seach w-full  p-[1%]'>
          <h1>
            Search by type:
          </h1>
          <div className='w-full h-10 border rounded-xl'>

          </div>

        </div>
        <div className='find w-full p-[1%]'>
          <h1>
            Find your pokemon:
          </h1>
          <div className='w-full h-10 border rounded-xl'>

          </div>
        </div>
      </div>
      <div className='w-full  bg-black  py-[5%] flex gap-6 flex-wrap justify-center saturate-150'>
        {
          edata?.map((anime, index) => (

            <div key={index} className={`${poketypeforbg(anime?.types[0]?.type?.name)} w-[25%]  bg-no-repeat bg-contain rounded-4xl p-[1%]`}>
              <div className='card-poke w-full '>
                <div className='card-poke-img flex justify-center h-[30%]'>
                  <img className='w-[60%]' src={anime?.sprites?.other?.['official-artwork'].front_default} />
                </div>
                <div className='flex justify-center flex-col gap-2 text-white'>
                  <div className='flex justify-center text-3xl font-semibold'>
                    <h1>{anime.name}</h1>
                  </div>
                  <div className={`${anime.types.length >= 2 ? ' flex justify-center' : 'flex justify-center'}  gap-5 text-[0.95rem] font-bold `} >
                    {
                      anime.types.map((name) => (
                        <p className={`${poketype(name?.type?.name)} p-[0.5%] rounded-xl w-[30%] flex justify-center items-center`}>
                          {name?.type.name}
                        </p>
                      ))
                    }
                  </div>
                  <div className='flex justify-center gap-10'>

                    <span className=''>
                      {anime.height / 10} M
                    </span>
                    <span>
                      {anime.weight / 10} KG
                    </span>
                  </div>
                  <div className='flex justify-center gap-8 mt-[-1%] '>
                    <div className='flex gap-1 '>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,90.34,90.34,229.66a8,8,0,0,1-11.31,0L26.34,177a8,8,0,0,1,0-11.31L165.66,26.34a8,8,0,0,1,11.31,0L229.66,79A8,8,0,0,1,229.66,90.34Z" opacity="0.2"></path><path d="M235.32,73.37,182.63,20.69a16,16,0,0,0-22.63,0L20.68,160a16,16,0,0,0,0,22.63l52.69,52.68a16,16,0,0,0,22.63,0L235.32,96A16,16,0,0,0,235.32,73.37ZM84.68,224,32,171.31l32-32,26.34,26.35a8,8,0,0,0,11.32-11.32L75.31,128,96,107.31l26.34,26.35a8,8,0,0,0,11.32-11.32L107.31,96,128,75.31l26.34,26.35a8,8,0,0,0,11.32-11.32L139.31,64l32-32L224,84.69Z"></path></svg>
                      <span >
                        Height
                      </span>
                    </div>
                    <div className='flex gap-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M96,64V192a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H88A8,8,0,0,1,96,64Zm96-8H168a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8h24a8,8,0,0,0,8-8V64A8,8,0,0,0,192,56Z" opacity="0.2"></path><path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H168a16,16,0,0,0-16,16v56H104V64A16,16,0,0,0,88,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V136h48v56a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM32,168V88H48v80Zm56,24H64V64H88V192Zm104,0H168V64h24V175.83c0,.06,0,.11,0,.17s0,.12,0,.17V192Zm32-24H208V88h16Z"></path></svg>
                      <span>
                        Weight
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className='w-[100%] h-10 flex justify-center items-center bg-black text-white gap-2'>
        {Page.map((anime, index) => (
          <div className='h-[2rem] w-[2rem]  rounded-[50%] text-center p-[0.2%] bg-[rgba(6,14,32,0.8)]' key={index} onClick={() => handleclick(anime, index)}>{anime
          }</div>
        ))}
      </div>
    </>
  )
}

export default Pokecard
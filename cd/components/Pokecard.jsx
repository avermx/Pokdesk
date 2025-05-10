import { useRef } from 'react'
import pokemonType from '../src/util/pokeTypes';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PokeMonCard } from './PokeMonCard';
import { Seachbar } from './Seachbar';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Pokecard = () => {

  const [edata, setedata] = useState([])
  const [firstindex, setfirstindex] = useState(0)
  const [lastindex, setlastindex] = useState(10)
  let TotalPage = Array.from({ length: Math.floor(1302 / 20) }, (_, index) => index + 1);
  const [Page, setPage] = useState(TotalPage.slice(firstindex, lastindex))
  const [currentbtn, setcurrentbtn] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const [searched, setSearched] = useState([]);
  const t1 = searchParams.get('page')

  const API = `https://pokeapi.co/api/v2/pokemon?offset=${t1}&limit=20`
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
    if (searched == '') {
      FetchPoke()
      return;
    }
  }, [searched])

  const FetchPoke2 = async (e) => {
    const API2 = `https://pokeapi.co/api/v2/pokemon/${e}`
    try {
      const res = await fetch(API2)
      const data = await res.json()
      setedata([data])


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setedata([])
    FetchPoke();
  }, [t1])

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
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#EB5B00,_rgba(6,14,32,0.8))]';

      case 'grass':
        return 'bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#255F38,_rgba(6,14,32,0.8))]';

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

  function handleclick(Page, i) {
    console.log(Page, "o");

    if (Page == 1) {
      setSearchParams({ page: 0 })
    }
    else {
      setSearchParams({ page: Page * 20 })
    }

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
  // Seach by Poke Types 
  const pokebytype = (e) => {
    settype(e)
  }

  useEffect(() => {
    setPage(TotalPage.slice(firstindex, lastindex))
  }, [firstindex, lastindex])

  useGSAP(() => {
    gsap.from('.pokelogo', {
      y: -50,
      duration: 0.8,
      delay: 0.1,
      opacity: 0
    })
    gsap.from('.img-dragon', {
      x: 20,
      delay: 0.1,
      duration: 0.8,
      opacity: 0
    })
    gsap.from('.chairzard', {
      x: -20,
      delay: 0.1,
      duration: 0.8,
      opacity: 0
    })
    gsap.from('.chairzard-name', {
      x: -20,
      delay: 0.1,
      duration: 0.8,
      opacity: 0
    })

    gsap.from("#treinador", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#treinador",
        scroller: "body",
        start: "top 50%",
        end: "top 30%",

      }
    })

    gsap.from(".treinador-des", {
      x: 50,
      duration: 0.8,
      opacity: 0,
      scrollTrigger: {
        trigger: ".treinador-des",
        scroller: "body",
        start: "top 50%",
        end: "top 30%",
      }
    })

    gsap.from(".search-by-type", {
      x: -80,
      duration: 0.8,
      opacity: 0,
      scrollTrigger: {
        trigger: ".treinador-des",
        scroller: "body",
        start: "top 50%",
      }
    })

    gsap.from(".search-by-input", {
      x: 80,
      duration: 0.8,
      opacity: 0,
      scrollTrigger: {
        trigger: ".treinador-des",
        scroller: "body",
        start: "top 50%",
      }
    })

  }, [])



  return (
    <div className='bg-black'>
      <div className="bg-gradient-to-t from-[rgb(255,73,0)] to-[rgb(255,131,1)] p-[2%] saturate-100" >
        <div className='w-full flex justify-center '>
          <div className='pokelogo'>
            <img src="/poke.svg" className='flex justify-center w-[80%]' />
          </div>
        </div>
        <div className='front flex justify-center px-[5%]'>
          <div className=' flex flex-col gap-5 text-white justify-center w-[80%] '>
            <h1 className='text-7xl font-bold text-white chairzard-name'>Charizard</h1>
            <p className='text-[1.12rem]  tracking-normal leading-5 chairzard'>
              Charizard, the towering flying and fiery Pokemon, is the ultimate evolution of the adorable Charmander. With its majestic wings and blazing flames, Charizard dominates the skies and inspires respect. His strength and courage are legendary, and his destructive fire is capable of incinerating his opponents. Despite his wild temperament, Charizard is known for forming deep and loyal bonds with his trainers.His imposing presence and flying skills make him a valuable and protective companion on any team.
            </p>
          </div>
          <div className='img-dragon w-[80%]'>
            <img src="/charizard.png" className='aspect-square ' />
          </div>
        </div>
      </div>
      <div className='px-[4%] bg-black flex justify-center pt-20 '  >
        <div className=' flex justify-center gap-5 '>
          <div className='w-[30%]' id='treinador' >
            <img src="/treinador-pk.png" />
          </div>
          <div className='w-[65%] p-[2%] flex flex-col gap-[10%] text-white justify-center treinador-des' >
            <h1 className='text-3xl font-semibold'>Experience the thrill of capturing and battling: Be a Pokemon master in PokedExplore!</h1>
            <p className='text-[1.rem] racking-normal leading-5  '>Discover a world full of adventures with PokedExplore! Now, you can become a true Pokemon trainer by capturing your favorite creatures with just one click. Wait for the pokeball to appear, click and face a surprise Pokemon to add to your pokex. Assemble a powerful deck and challenge your friends in exciting battles! The journey begins now. Get ready to be the best coach of all time!</p>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-between px-[10%] font-bold text-xl bg-black text-white saturate-250 z-50 relative '>
        <div className='Seach w-full p-[1%] search-by-type'>
          <h1 className='py-2 font-semibold'>
            Search by type:
          </h1>
          <div className='h-[3.06rem] border rounded-xl flex items-center gap-[0.9%] p-1 justify-center' >
            {pokemonType.map((e) => (
              <Link to={`/pokeType/${e.name}`} className='w-full '>
                <img src={e.url} className='h-[65%]' onClick={() => pokebytype(e.name)} />
              </Link>
            ))}
          </div>
        </div>
        <div className='find w-full p-[1%] search-by-input'>
          <h1 className='py-2 font-semibold'>
            Find your pokemon:
          </h1>
          <Seachbar FetchPoke2={FetchPoke2} setSearched={setSearched} searched={searched} />
        </div>
      </div>
      <div className='w-full bg-black py-[2%] flex gap-6 flex-wrap justify-center saturate-150'>
        {
          edata?.map((anime, index) => (
            <PokeMonCard anime={anime} index={index} poketypeforbg={poketypeforbg} poketype={poketype} />
          ))}
      </div>
      <div className='flex justify-center items-center bg-black text-white gap-[0.5%]'>
        {Page.map((Page, index) => (
          <div className='h-[2rem] w-[2rem]  rounded-[50%] text-center p-[0.2%] bg-[rgba(6,14,32,0.8)]' key={index} onClick={() => handleclick(Page, index)}>{Page}</div>
        ))}
      </div>
      <div className='h-2 w-full bg-black'>

      </div>
    </div>
  )
}

export default Pokecard
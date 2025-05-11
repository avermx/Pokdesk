import { useRef } from 'react'
import pokemonType from '../src/util/pokeTypes';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PokeMonCard } from './PokeMonCard';
import { Seachbar } from './Seachbar';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Add CSS for hiding scrollbar across browsers
const scrollbarHideStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none !important;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none !important;  /* IE and Edge */
    scrollbar-width: none !important;  /* Firefox */
  }
  
  /* Additional targeting for the specific container */
  .type-scroll-container::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    display: none !important;
  }
  
  .type-scroll-container {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }
`;

// Add style tag to head
const styleElement = document.createElement('style');
styleElement.innerHTML = scrollbarHideStyles;
document.head.appendChild(styleElement);

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
  const typeScrollRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isHoveringRef = useRef(false);
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

  // Auto scroll functionality for type section using requestAnimationFrame
  useEffect(() => {
    if (typeScrollRef.current) {
      // Set initial scroll position
      let startTime = null;
      let scrollPosition = 0;
      const scrollSpeed = 0.2; // Lower = slower, higher = faster

      // Add mouse event listeners
      const handleMouseEnter = () => {
        isHoveringRef.current = true;
        // Cancel animation when hovering
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };

      const handleMouseLeave = () => {
        isHoveringRef.current = false;
        // Save current scroll position before restarting
        if (typeScrollRef.current) {
          scrollPosition = typeScrollRef.current.scrollLeft;
        }
        // Only restart if not already animating
        if (!animationFrameRef.current) {
          animationFrameRef.current = requestAnimationFrame(animateScroll);
        }
      };

      // Also handle touch events for mobile devices
      const handleTouchStart = () => {
        isHoveringRef.current = true;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };

      const handleTouchEnd = () => {
        // Small delay before restarting scroll to allow for tap interactions
        setTimeout(() => {
          isHoveringRef.current = false;
          // Save current scroll position before restarting
          if (typeScrollRef.current) {
            scrollPosition = typeScrollRef.current.scrollLeft;
          }
          if (!animationFrameRef.current) {
            animationFrameRef.current = requestAnimationFrame(animateScroll);
          }
        }, 1000);
      };

      typeScrollRef.current.addEventListener('mouseenter', handleMouseEnter);
      typeScrollRef.current.addEventListener('mouseleave', handleMouseLeave);
      typeScrollRef.current.addEventListener('touchstart', handleTouchStart);
      typeScrollRef.current.addEventListener('touchend', handleTouchEnd);

      // Animation function using requestAnimationFrame for smoother scrolling
     const animateScroll = (timestamp) => {
  if (!startTime) startTime = timestamp;

  if (typeScrollRef.current && !isHoveringRef.current) {
    // Calculate new scroll position
    scrollPosition += scrollSpeed;

    // Check if we've scrolled past the first element
    if (scrollPosition >= typeScrollRef.current.firstChild.clientWidth) {
      // Move the first child to the end
      const firstChild = typeScrollRef.current.firstChild;
      typeScrollRef.current.removeChild(firstChild);
      typeScrollRef.current.appendChild(firstChild);

      // Adjust the scroll position
      scrollPosition -= firstChild.clientWidth;
    }

    typeScrollRef.current.scrollLeft = scrollPosition;
  }

  requestAnimationFrame(animateScroll);
};

      // Start the animation
      animationFrameRef.current = requestAnimationFrame(animateScroll);

      // Clean up on component unmount
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (typeScrollRef.current) {
          typeScrollRef.current.removeEventListener('mouseenter', handleMouseEnter);
          typeScrollRef.current.removeEventListener('mouseleave', handleMouseLeave);
          typeScrollRef.current.removeEventListener('touchstart', handleTouchStart);
          typeScrollRef.current.removeEventListener('touchend', handleTouchEnd);
        }
      };
    }
  }, []);

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
        {/* Pokemon Logo Section */}
        <div className='w-full flex justify-center'>
          <div className='pokelogo w-full sm:w-4/5 md:w-3/5 lg:w-1/5'>
            <img src="/poke.svg" className='flex justify-center w-[80%] mx-auto' />
          </div>
        </div>

        {/* Charizard Hero Section */}
        <div className='front flex flex-col md:flex-row justify-center px-[5%] items-center'>
          <div className='flex flex-col gap-5 text-white justify-center w-full md:w-[50%] order-2 md:order-1 mt-6 md:mt-0'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white chairzard-name'>Charizard</h1>
            <p className='text-base sm:text-lg md:text-[1.12rem] tracking-normal leading-5 chairzard'>
              Charizard, the towering flying and fiery Pokemon, is the ultimate evolution of the adorable Charmander. With its majestic wings and blazing flames, Charizard dominates the skies and inspires respect. His strength and courage are legendary, and his destructive fire is capable of incinerating his opponents. Despite his wild temperament, Charizard is known for forming deep and loyal bonds with his trainers.His imposing presence and flying skills make him a valuable and protective companion on any team.
            </p>
          </div>
          <div className='img-dragon w-full sm:w-4/5 md:w-[50%] order-1 md:order-2'>
            <img src="/charizard.png" className='aspect-square w-full' />
          </div>
        </div>
      </div>

      {/* Trainer Section */}
      <div className='px-[4%] bg-black flex justify-center pt-10 md:pt-20'>
        <div className='flex flex-col md:flex-row justify-center gap-5 w-full'>
          <div className='w-full md:w-[30%] flex justify-center md:justify-start' id='treinador'>
            <img src="/treinador-pk.png" className='w-4/5 md:w-full' />
          </div>
          <div className='w-full md:w-[65%] p-[2%] flex flex-col gap-4 md:gap-[10%] text-white justify-center treinador-des'>
            <h1 className='text-2xl md:text-3xl font-semibold'>Experience the thrill of capturing and battling: Be a Pokemon master in PokedExplore!</h1>
            <p className='text-sm sm:text-base md:text-[1rem] tracking-normal leading-5'>Discover a world full of adventures with PokedExplore! Now, you can become a true Pokemon trainer by capturing your favorite creatures with just one click. Wait for the pokeball to appear, click and face a surprise Pokemon to add to your pokex. Assemble a powerful deck and challenge your friends in exciting battles! The journey begins now. Get ready to be the best coach of all time!</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className='w-full flex flex-col sm:flex-row justify-between px-4 sm:px-[5%] md:px-[10%] font-bold text-lg md:text-xl bg-black text-white saturate-250 z-50 relative gap-4 sm:gap-2'>
        <div className='Seach w-full p-[1%] search-by-type'>
          <h1 className='py-2 font-semibold '>
            Search by type:
          </h1>
          <div
            ref={typeScrollRef}
            className='h-12 md:h-[3.06rem] scroll border rounded-xl flex items-center gap-[0.9%] p-1 justify-start overflow-x-auto scrollbar-hide type-scroll-container cursor-pointer'
          >
            {pokemonType.map((e) => (

              <Link to={`/pokeType/${e.name}`} className='w-full  min-w-[2rem] flex justify-center'>
                <img src={e.url} className='h-[65%] ' onClick={() => pokebytype(e.name)} />
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

      {/* Pokemon Cards Grid */}
      <div className='w-full bg-black py-[2%] flex gap-4 md:gap-6 flex-wrap justify-center saturate-150 px-2 sm:px-4'>
        {
          edata?.map((anime, index) => (
            <PokeMonCard anime={anime} index={index} poketypeforbg={poketypeforbg} poketype={poketype} />
          ))}
      </div>

      {/* Pagination */}
      <div className='flex flex-wrap justify-center items-center bg-black text-white gap-1 sm:gap-[0.5%] py-4'>
        {Page.map((Page, index) => (
          <div className='h-8 w-8 sm:h-[2rem] sm:w-[2rem] rounded-[50%] flex items-center justify-center bg-[rgba(6,14,32,0.8)] cursor-pointer mb-2' key={index} onClick={() => handleclick(Page, index)}>{Page}</div>
        ))}
      </div>

      <div className='h-2 w-full bg-black'></div>
    </div>
  )
}

export default Pokecard
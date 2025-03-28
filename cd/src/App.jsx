
import { useState, useEffect } from 'react';
import './App.css'



function App() {
  const [edata, setedata] = useState([])
  const [pokedata, setpokedata] = useState([])





    
 

      
  
  
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`).then((res)=>res.json()).then((res)=>(setedata(res)))

  }, [])


  return (

    <>
      <div className='bg-linear-to-t from-[rgb(255,131,1)] to-[rgb(255,73,0)] w-full p-[2%] '>
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
      <div className=' px-[6%] bg-linear-to-t from-[rgb(255,73,0)] to-[rgb(255,131,1)]'>
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
      <div className='w-full flex justify-between p-[1%] font-bold text-xl'>
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
      <div className='w-full  bg-rose-100 px-[7%] py-[2%] flex gap-5 flex-wrap justify-center'>
        {
          edata?.results?.map((anime,index)=>(
            <div className='block h-[50%] w-[25%] bg-[url(/half.svg)] bg-[rgba(6,14,32,0.8)] bg-no-repeat bg-contain rounded-4xl'>
            <div className='card-poke w-full'>
              <div className='card-poke-img flex justify-center '>
                <img className='w-[60%]' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" />
              </div>
              <div className='flex justify-center flex-col gap-2 text-white'>
                <div className='flex justify-center text-3xl font-semibold'>
                  <h1>{anime.name}</h1>
                </div>
                <div className='flex justify-center gap-5 text-[0.95rem] font-bold'>
                  <span className='bg-[#66CD32] p-[0.5%] w-[24%] flex justify-center rounded-[5px]'>
                    GRASS
                  </span>
                  <span className='bg-[#AA66CC] p-[0.5%] w-[25%] flex justify-center rounded-[5px]'>
                    POISON
                  </span>
                </div>
                <div className='flex justify-center gap-24'>
                  <span>
                    0.7M
                  </span>
                  <span>
                    6.9KG
                  </span>
                </div>
                <div className='flex justify-center gap-8 mt-[-2%] '>
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
    </>
  )

}

export default App

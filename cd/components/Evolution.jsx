import React, { useEffect, useState } from "react";

const Evolution = ({ speciesUrl }) => {
  const [evolution, setEvolution] = useState();
  const [evolution2, setEvolution2] = useState([]);

  const API = `https://pokeapi.co/api/v2/pokemon/pikachu`
  const FetchPoke = async () => {
    try {
      const res = await fetch(API)
      const data = await res.json()
      console.log(data)

    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    FetchPoke()
  }, [])


  useEffect(() => {
    fetch(speciesUrl?.url)
      .then((res) => res.json())
      .then((data) => fetch(data?.evolution_chain?.url))
      .then((res) => res.json())
      .then((data) => setEvolution(data.chain));
  }, [speciesUrl]);

  useEffect(() => {
    setEvolution2([]);
    setEvolution2((PreviousState) => [
      ...PreviousState,
      evolution?.species?.name ? evolution?.species?.name : "",
      evolution?.evolves_to[0]?.species?.name
        ? evolution?.evolves_to[0]?.species?.name
        : "",
      evolution?.evolves_to[0]?.evolves_to[0]?.species?.name
        ? evolution?.evolves_to[0]?.evolves_to[0]?.species?.name
        : "",
    ]);

    evolution2.forEach((e) => {})




    // setEvolution2((pre)=>[...pre,evolution?.evolves_to[0]?.species?.name])
    // setEvolution2((pre)=>[...pre,evolution?.evolves_to[0]?.evolves_to[0]?.species?.name])

    // setEvolution2((e)=>[...e,evolution?.evolves_to[0]?.species?.name])

    // if(evolution?.species?.name){
    //   setEvolution2((PreviousState)=>[...PreviousState,evolution?.species?.name])
    // }
    // if(evolution?.evolves_to[0]?.species?.name){
    //   setEvolution2((PreviousState)=>[...PreviousState,evolution?.evolves_to[0]?.species?.name])
    // }
    // if(evolution?.evolves_to[0]?.evolves_to[0]?.species?.name){
    //   setEvolution2((PreviousState)=>[...PreviousState,evolution?.evolves_to[0]?.evolves_to[0]?.species?.name])
    // }

    // setEvolution2((PreviousState)=>[...PreviousState,evolution?.evolves_to[0]?.species?.name])
    // setEvolution2((PreviousState)=>[...PreviousState,evolution?.evolves_to[0]?.evolves_to[0].species?.name])
  }, [evolution]);

  return (
    <>
      <div className=" justify-center flex">
        <div className="bg-amber-200 h-[30vh] w-[50%] p-[1%]">
          <h1>Evolution Chain</h1>
          <div className="py-2 ">
            <div className="flex gap-5">{evolution2.map((e) => (
              <>
                <p>{e}</p>

              </>
            ))}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Evolution;

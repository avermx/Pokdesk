import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
const Evolution = ({ speciesUrl }) => {
  const [evolution, setEvolution] = useState();
  const [evolution2, setEvolution2] = useState([]);
  const [images, setImages] = useState([]);

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
  }, [evolution]);

  useEffect(() => {
    const fetchImages = async () => {
      const imgs = await Promise.all(
        evolution2.map(async (e) => {
          if (e !== "") {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`);
            const data = await res.json();
            return data.sprites.other["official-artwork"].front_default;
          } else {
            return null;
          }
        })
      );
      setImages(imgs); // update state
    };

    if (evolution2.length > 0) {
      fetchImages();
    }
  }, [evolution2]);

  return (
    <>
      <div className=" justify-center flex">
        <div className=" h-[30vh] w-[50%] p-[1%]">
          <h1 className="font-bold">Evolution Chain</h1>
          <div className="py-2 w-full  ">
            <div className="flex gap-5 items-center justify-evenly w-full ">
              {evolution2[0] != ""
                ? evolution2.filter(name => name !== '').map(
                    (e, i,arr) =>
                      e != "" && (
                        <>
                          <div key={i} className=" flex flex-col items-center">
                            <img
                              src={images[i]}
                              alt={e}
                              className="h-[80%] w-40 "
                            />

                            <p className="text-center">{e}</p>
                            </div>
                            {i !== arr.length - 1 && <FaArrowRight size={30}/>}
                        </>
                      )
                  )
                : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Evolution;

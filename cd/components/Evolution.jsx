import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Evolution = ({ speciesUrl, pokemonName }) => {
  const [evolution, setEvolution] = useState();
  const [evolution2, setEvolution2] = useState([]);
  const [images, setImages] = useState([]);
  const [evolutionDetails, setEvolutionDetails] = useState([]);

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

    // Store evolution details
    const details = [];
    if (evolution?.evolves_to[0]?.evolution_details[0]) {
      details.push(evolution.evolves_to[0].evolution_details[0]);
    }
    if (evolution?.evolves_to[0]?.evolves_to[0]?.evolution_details[0]) {
      details.push(evolution.evolves_to[0].evolves_to[0].evolution_details[0]);
    }
    setEvolutionDetails(details);
  }, [evolution]);

  useEffect(() => {
    const fetchImages = async () => {
      const imgs = await Promise.all(
        evolution2.map(async (e) => {
          if (e !== "") {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`);
            const data = await res.json();
            return {
              image: data.sprites.other["official-artwork"].front_default,
              types: data.types
            };
          } else {
            return null;
          }
        })
      );
      setImages(imgs);
    };

    if (evolution2.length > 0) {
      fetchImages();
    }
  }, [evolution2]);

  const getEvolutionMethod = (detail, index) => {
    if (!detail) return null;
    
    const methods = [];
    if (detail.min_level) methods.push(`Level ${detail.min_level}`);
    if (detail.item) methods.push(`Use ${detail.item.name.replace('-', ' ')}`);
    if (detail.trigger?.name) methods.push(detail.trigger.name.replace('-', ' '));
    
    return methods.join(' + ');
  };

  return (
    <div className="w-full p-4 md:p-6">
      <h1 className="font-bold text-2xl md:text-3xl text-center mb-6">Evolution Chain</h1>
      <div className="flex flex-col md:flex-row items-center justify-center w-full">
        {evolution2[0] !== "" ? (
          <div className="flex flex-col md:flex-row items-center justify-center w-full">
            {evolution2.filter(name => name !== '').map((e, i, arr) => (
              <>
                <div key={i} className="flex flex-col items-center w-full">
                  <Link 
                    to={`/pokedetails/${e}`}
                    className="group relative flex flex-col items-center"
                  >
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl bg-white/10 backdrop-blur-sm p-2 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20">
                      <img
                        src={images[i]?.image}
                        alt={e}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <h2 className="text-base sm:text-lg md:text-xl font-semibold capitalize">{e}</h2>
                      <div className="flex gap-2 justify-center mt-1 flex-wrap">
                        {images[i]?.types?.map((type, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm mb-1"
                          >
                            {type.type.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
                {i !== arr.length - 1 && (
                  <div className="flex flex-col items-center my-4 md:my-0 md:mx-6">
                    <FaArrowRight className="hidden md:block text-3xl mb-1" />
                    <span className="block md:hidden text-2xl text-white mb-1">↓</span>
                    <span className="text-xs sm:text-sm text-center text-gray-300 max-w-[150px] md:mt-2">
                      {getEvolutionMethod(evolutionDetails[i], i)}
                    </span>
                  </div>
                )}
              </>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No evolution chain available</p>
        )}
      </div>
    </div>
  );
};

export default Evolution;

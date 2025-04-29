import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { PokeMonCard } from "./PokeMonCard";

const Pokemontype = () => {
  const [edata, setedata] = useState();
  const { name } = useParams();

  //For Fetch By Pokemon Type

  const API2 = `https://pokeapi.co/api/v2/type/${name}`;

  const FetchPoke1 = async () => {
    try {
      const res = await fetch(API2);
      const data = await res.json();
      const poketypedetails = data.pokemon.map(async (e) => {
        const res = await fetch(e.pokemon.url);
        const data1 = await res.json();
        return data1;
      });
      const detailsoftypes = await Promise.all(poketypedetails);
      setedata(detailsoftypes);
      console.log(detailsoftypes);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // Use Effect For Fetch By Types
  useEffect(() => {
    setedata([]);
    FetchPoke1();
  }, []);

  function poketype(type) {
    switch (type) {
      case "normal":
        return "bg-[#A8A77A]";

      case "fire":
        return "bg-[#EE8130]";

      case "grass":
        return "bg-[#7AC74C]";

      case "water":
        return "bg-[#6390F0]";

      case "electric":
        return "bg-[#F7D02C]";

      case "ice":
        return "bg-[#96D9D6]";

      case "fighting":
        return "bg-[#C22E28]";

      case "psychic":
        return "bg-[#F95587]";

      case "bug":
        return "bg-[#A6B91A]";

      case "rock":
        return "bg-[#B6A136]";

      case "ghost":
        return "bg-[#735797]";

      case "dragon":
        return "bg-[#6F35FC]";

      case "dark":
        return "bg-[#705746]";

      case "steel":
        return "bg-[#B7B7CE]";

      case "fairy":
        return "bg-[#D685AD]";

      case "flying":
        return "bg-[#A98FF3]";

      case "poison":
        return "bg-[#A33EA1]";

      case "ground":
        return "bg-[#E2BF65]";
    }
  }
  // for dynamic Bg for PokeCard
  function poketypeforbg(type) {
    switch (type) {
      case "normal":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#A8A77A,_rgba(6,14,32,0.8))]";

      case "fire":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#EE8130,_rgba(6,14,32,0.8))]";

      case "grass":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#255F38,_rgba(6,14,32,0.8))]";

      case "water":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#6390F0,_rgba(6,14,32,0.8))]";

      case "electric":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#F7D02C,_rgba(6,14,32,0.8))]";

      case "ice":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#96D9D6,_rgba(6,14,32,0.8))]";

      case "fighting":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#C22E28,_rgba(6,14,32,0.8))]";

      case "psychic":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#F95587,_rgba(6,14,32,0.8))]";

      case "bug":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#A6B91A,_rgba(6,14,32,0.8))]";

      case "rock":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#B6A136,_rgba(6,14,32,0.8))]";

      case "ghost":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#735797,_rgba(6,14,32,0.8))]";

      case "dragon":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#6F35FC,_rgba(6,14,32,0.8))]";

      case "dark":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#705746,_rgba(6,14,32,0.8))]";

      case "steel":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#B7B7CE,_rgba(6,14,32,0.8))]";

      case "fairy":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#D685AD,_rgba(6,14,32,0.8))]";

      case "flying":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#A98FF3,_rgba(6,14,32,0.8))]";

      case "poison":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#A33EA1,_rgba(6,14,32,0.8))]";

      case "ground":
        return "bg-[url(/half.svg),_radial-gradient(80%_80%_at_50%_bottom,_#E2BF65,_rgba(6,14,32,0.8))]";
    }
  }
  function poketypeforbg1(type) {
    switch (type) {
      case "normal":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#A8A77A,_rgba(6,14,32,0.8))]";

      case "fire":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#EE8130,_rgba(6,14,32,0.8))]";

      case "grass":
      // return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#7AC74C,_rgba(6,14,32,0.8))]";

      case "water":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#6390F0,_rgba(6,14,32,0.8))]";

      case "electric":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#F7D02C,_rgba(6,14,32,0.8))]";

      case "ice":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#96D9D6,_rgba(6,14,32,0.8))]";

      case "fighting":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#C22E28,_rgba(6,14,32,0.8))]";

      case "psychic":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#F95587,_rgba(6,14,32,0.8))]";

      case "bug":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#A6B91A,_rgba(6,14,32,0.8))]";

      case "rock":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#B6A136,_rgba(6,14,32,0.8))]";

      case "ghost":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#735797,_rgba(6,14,32,0.8))]";

      case "dragon":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#6F35FC,_rgba(6,14,32,0.8))]";

      case "dark":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#705746,_rgba(6,14,32,0.8))]";

      case "steel":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#B7B7CE,_rgba(6,14,32,0.8))]";

      case "fairy":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#D685AD,_rgba(6,14,32,0.8))]";

      case "flying":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#A98FF3,_rgba(6,14,32,0.8))]";

      case "poison":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#A33EA1,_rgba(6,14,32,0.8))]";

      case "ground":
        return "bg-[radial-gradient(80%_80%_at_50%_bottom,_#E2BF65,_rgba(6,14,32,0.8))]";
    }

  }
  return (
    <>
      <div
        class="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      </div>z
      <div className="w-full ">
        <div className={`h-20 w-full  bg-black justify-center flex items-center content-center text-4xl capitalize`}>
          <h1 >{name}</h1>
        </div>
        <div className="w-full  py-[4%] flex gap-6 flex-wrap justify-center saturate-150">
          {edata?.map((anime, index) => (
            <PokeMonCard
              anime={anime}
              index={index}
              poketypeforbg={poketypeforbg}
              poketype={poketype}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Pokemontype;

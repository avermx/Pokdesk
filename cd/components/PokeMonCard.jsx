import React from "react";
import { Link } from "react-router";

export const PokeMonCard = ({ poketype, anime, index, poketypeforbg }) => {
  return (
    <div
      key={index}
      className={`${poketypeforbg(
        anime?.types[0]?.type?.name
      )} w-[25%]  bg-no-repeat bg-contain rounded-4xl p-[1%] `}
    >
      <Link to={`/pokedetails/${anime.id} ` } className=''>
        <div className="card-poke ">
          <div className="card-poke-img flex justify-center h-[30%]">
            <img
              className="w-[60%]"
              src={anime?.sprites?.other?.["official-artwork"].front_default}
            />
          </div>
          <div className="flex justify-center flex-col gap-2 text-white">
            <div className="flex justify-center text-3xl font-semibold">
              <h1>{anime.name}</h1>
            </div>
            <div
              className={`${
                anime.types.length >= 2
                  ? " flex justify-center"
                  : "flex justify-center"
              }  gap-5 text-[0.95rem] font-bold `}
            >
              {anime.types.map((name) => (
                <p
                  className={`${poketype(
                    name?.type?.name
                  )} p-[0.5%] rounded-xl w-[30%] flex justify-center items-center `}
                >
                  {name?.type.name}
                </p>
              ))}
            </div>
            <div className="flex justify-center gap-10">
              <span className="">{anime.height / 10} M</span>
              <span>{anime.weight / 10} KG</span>
            </div>
            <div className="flex justify-center gap-8 mt-[-1%] ">
              <div className="flex gap-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M229.66,90.34,90.34,229.66a8,8,0,0,1-11.31,0L26.34,177a8,8,0,0,1,0-11.31L165.66,26.34a8,8,0,0,1,11.31,0L229.66,79A8,8,0,0,1,229.66,90.34Z"
                    opacity="0.2"
                  ></path>
                  <path d="M235.32,73.37,182.63,20.69a16,16,0,0,0-22.63,0L20.68,160a16,16,0,0,0,0,22.63l52.69,52.68a16,16,0,0,0,22.63,0L235.32,96A16,16,0,0,0,235.32,73.37ZM84.68,224,32,171.31l32-32,26.34,26.35a8,8,0,0,0,11.32-11.32L75.31,128,96,107.31l26.34,26.35a8,8,0,0,0,11.32-11.32L107.31,96,128,75.31l26.34,26.35a8,8,0,0,0,11.32-11.32L139.31,64l32-32L224,84.69Z"></path>
                </svg>
                <span>Height</span>
              </div>
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M96,64V192a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H88A8,8,0,0,1,96,64Zm96-8H168a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8h24a8,8,0,0,0,8-8V64A8,8,0,0,0,192,56Z"
                    opacity="0.2"
                  ></path>
                  <path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H168a16,16,0,0,0-16,16v56H104V64A16,16,0,0,0,88,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V136h48v56a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM32,168V88H48v80Zm56,24H64V64H88V192Zm104,0H168V64h24V175.83c0,.06,0,.11,0,.17s0,.12,0,.17V192Zm32-24H208V88h16Z"></path>
                </svg>
                <span>Weight</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

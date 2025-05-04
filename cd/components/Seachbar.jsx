import React, { useEffect, useRef, useState } from "react";

export const Seachbar = ({ setpokemonName ,FetchPoke2}) => {
    const searchbar = useRef(null);
    const [isFocused, setisFocused] = useState(false);
    const [pokeMonData, setpokeMonData] = useState([]);
    const [searched, setSearched] = useState([]);
    const [searchresult, setSearchResult] = useState([]);
   

    const API = `https://pokeapi.co/api/v2/pokemon?&limit=100000`;
    const fetchPokeMon = async () => {
        const res = await fetch(API);
        const data = await res.json();
        setpokeMonData(data.results);
    };

    useEffect(() => {
        fetchPokeMon();
    }, []);

    useEffect(() => {
        setSearchResult(
            pokeMonData.filter((Pokemon) => Pokemon.name.includes(searched))
        );
    }, [searched]);

    const handleclickSeacrh = (e)=>{
        console.log(e);
        setSearched(e)
        setpokemonName(e);
        FetchPoke2()
        setisFocused(false)
        
    }
    const handleFocus = () => {
        setisFocused(true)
    };

    const handleFocusout = () => {
       setTimeout(() => {
        setisFocused(false)
       }, 100);
       
       
    };

    return (
        <div className="relative ">
            <input
                type="text"
                className={`h-[3.06rem] px-2 w-full focus:outline-none border-2 border-gray-200 ${isFocused ? 'rounded-t-xl' : 'rounded-xl'} `}
                value={searched}
                onChange={(e) => setSearched(e.target.value)}
                ref={searchbar}
                onFocus={handleFocus}
                onBlur={handleFocusout}
            />
            <div className="absolute w-full flex justify-center ">
                {isFocused && searched.length > 0 &&(
                    <div className='relative w-full  border-2 border-gray-200 rounded-b-xl bg-black/70 backdrop-blur-md py-2'>
                        <ul className="gap-1 w-full text-2xl ">
                            {searchresult.map((e,i) => (
                                <div
                                    key={i}
                                    className=" cursor-pointer px-2 py-1 hover:bg-gray-500 w-full flex justify-center z-50"
                                    onClick={ ()=>handleclickSeacrh(e.name)} >
                                    {e.name}
                                </div>
                            )).slice(0,5)}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

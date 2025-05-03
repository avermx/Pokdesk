import React, { useEffect, useRef, useState } from "react";

export const Seachbar = ({ setpokemonName }) => {
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


    const handleFocus = () => {
        setisFocused(true)
    };

    const handleFocusout = () => {
        setisFocused(false)
        setSearchResult([]);
    };

    return (
        <div className="relative">
            <input
                type="text"
                className={`h-[3.06rem]  w-full focus:outline-none border-2 border-gray-200 rounded-t-xl `}
                value={searched}
                onChange={(e) => setSearched(e.target.value)}
                ref={searchbar}
                onFocus={handleFocus}
                onBlur={handleFocusout}
            />
            <div className="absolute w-full flex justify-center">
                {isFocused && searchresult.length > 0 && (
                    <div className="relative w-full border-t-0 border-2 border-gray-200 rounded-b-xl  bg-black/70  backdrop-blur-md  py-2">
                        <ul className="gap-1 w-full text-2xl ">
                            {searchresult.slice(0, 5).map((e) => (
                                <li
                                    key={e.name}
                                    className=" cursor-pointer px-2 py-1 hover:bg-gray-500 w-full flex justify-center "
                                    onClick={() => handleclickSeacrh(e.name)}
                                >
                                    {e.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

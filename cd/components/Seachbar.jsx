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
        
     }, [searched]);
    const handleFocus = () => {
        setisFocused(true)
        setSearchResult(
            pokeMonData.filter((Pokemon) => Pokemon.name.includes(searched))
        );
    };

    const handleFocusout = () => {
        setisFocused(false)
        setSearchResult([]);
    };


console.log(isFocused)

    return (
        <div>
            <input
                type="text"
                className="h-[3.06rem] border rounded-xl w-full"
                value={searched}
                onChange={(e) => setSearched(e.target.value)}
                ref={searchbar}
                onFocus={handleFocus}
                onBlur={handleFocusout}
            />
            {isFocused ? searchresult
                .map((e) => (
                    <ul>
                        <li
                            className="text-[0.9rem]"
                            onClick={() => handleclickSeacrh(e.name)}
                        >
                            {e.name}
                        </li>
                    </ul>
                ))
                .slice(0, 5)
                : ""}
        </div>
    );
};

import React, { useEffect, useState } from "react";


export const Seachbar = ({
    setpokemonName
}) => {
    const [pokeMonData, setpokeMonData] = useState([])
    const [searched, setSearched] = useState()
    const [searchresult, setSearchResult] = useState([])
    const API = `https://pokeapi.co/api/v2/pokemon?&limit=100000`;
    const fetchPokeMon = async () => {
        const res = await fetch(API);
        const data = await res.json();
        setpokeMonData(data.results)
    };
    useEffect(() => {
        fetchPokeMon();
    }, []);

    setpokemonName(searchresult)
    
    useEffect(() => {
        setSearchResult(
            pokeMonData.filter((Pokemon) => (
                Pokemon.name.includes(searched)
            )))
    }, [searched])


    return (
        <div>
            <input type="text" className="h-[3.06rem] border rounded-xl w-full" value={searched} onChange={((e) => setSearched(e.target.value))} />
        </div>
    );
};

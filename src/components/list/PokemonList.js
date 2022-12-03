import { useEffect, useRef, useState } from "react";
import './_pokemonList.scss';
import PokemonListItem from "./PokemonListItem";
import { useSelector } from "react-redux";

const POKEMONS_PER_PAGES = 20;
const NB_TOTAL_POKEMONS = 1154;

const PokemonList = () => {
    const pokemonList = useSelector(state => state.list)
    const [lastPokemon, setLastPokemon] = useState();
    const [nbPokemons, setNbPokemons] = useState(POKEMONS_PER_PAGES);
    const [search, setSearch] = useState('');
    const [displayPokemons, setDisplayPokemons] = useState(pokemonList.slice((0, nbPokemons)));
    const gridScrollerRef = useRef();

    // TODO: load more mokemon at the same time without causing an infinite load
    // bug prob due to abusing the scroll when pokemon arent loaded yet
    const observerRef = useRef(
        new IntersectionObserver( (entries) => {
            console.log('lastPokemon entered the viewport'); // it never leave because lastPokemon is updated
            if (entries[0].isIntersecting) {
                console.log('intersecting: ', entries[0]);
                setNbPokemons( prevNbPokemons => prevNbPokemons + POKEMONS_PER_PAGES )
            }
        }, {
            // root: null
            // threshold: 0,
        })
    );

    // paging
    useEffect(() => {
        const observer = observerRef.current;

        if (lastPokemon) observer.observe(lastPokemon);
        return () => {
            if (lastPokemon) {
                observer.unobserve(lastPokemon);
            }
        };
    }, [lastPokemon]);

    // search
    useEffect(() => {
        // need delay to prevent unnessessary fetching while typing
        const delaySearch = setTimeout(() => {
            if(!search) return setDisplayPokemons(pokemonList);

            const filteredPokemon = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
            setDisplayPokemons(filteredPokemon)
        }, 250)

    return () => clearTimeout(delaySearch)
  }, [search, pokemonList]);

    return (
        <>
            <div className="container pokemonSearch__container">
                <input
                    className="pokemonSearch"
                    type="text"
                    name="search"
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </div>
            <div className="container pokemonScroller" ref={gridScrollerRef}>
                <div className="pokemonGrid">
                    {displayPokemons.slice(0, nbPokemons)?.map((pokemon, key) => (
                        <PokemonListItem
                            key={key}
                            pokemon={pokemon}
                            innerRef={setLastPokemon}
                            id={pokemon.name}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default PokemonList;
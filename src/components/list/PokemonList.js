import { useEffect, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import './_pokemonList.scss';
import PokemonListItem from "./PokemonListItem";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../store/themeSlice";

const POKEMONS_PER_PAGES = 2;

const PokemonList = () => {
    const pokemonList = useSelector(store=> store.pokemon.list)
    const [lastPokemon, setLastPokemon] = useState();
    const [nbPokemons, setNbPokemons] = useState(POKEMONS_PER_PAGES);
    const [search, setSearch] = useState('');
    const [displayPokemons, setDisplayPokemons] = useState(pokemonList.slice((0, nbPokemons)));
    const gridScrollerRef = useRef();
    const dispatch = useDispatch()

    // reset theming onload
    useEffect(() => {
        dispatch(themeActions.updatePokemonType(null))
    }, []);

    const observerRef = useRef(
        new IntersectionObserver( (entries) => {
            console.log('lastPokemon entered the viewport');
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
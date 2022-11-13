import { useEffect, useRef, useState } from "react";
import './_pokemonList.scss';
import PokemonListItem from "./PokemonListItem";
import { useSelector } from "react-redux";

const POKEMONS_PER_PAGES = 2;
const NB_TOTAL_POKEMONS = 1154;

const PokemonList = () => {
    const pokemonList = useSelector(state => state.list)
    const [lastPokemon, setLastPokemon] = useState();
    const [nbPokemons, setNbPokemons] = useState(POKEMONS_PER_PAGES);
    const gridScrollerRef = useRef();

    // TODO: load more mokemon at the same time without causing an infinite load
    // bug prob due to abusing the scroll when pokemon arent loaded yet
    const observerRef = useRef(
        new IntersectionObserver( (entries) => {
            if (entries[0].isIntersecting) {
                if(nbPokemons <= NB_TOTAL_POKEMONS) {
                    setNbPokemons( prevNbPokemons => prevNbPokemons + POKEMONS_PER_PAGES )
                }
            }
        }, {
            root: gridScrollerRef.current,
            threshold: .9,
        })
    );

    useEffect(() => {
        const observer = observerRef.current;

        if (lastPokemon) observer.observe(lastPokemon);
        return () => {
            if (lastPokemon) {
                observer.unobserve(lastPokemon);
            }
        };
    }, [lastPokemon]);



    return (
        <div className="container pokemonScroller" ref={gridScrollerRef}>
            <div className="pokemonGrid">
                {pokemonList.slice(0, nbPokemons)?.map((pokemon, key) => (
                    <PokemonListItem
                        key={key}
                        pokemon={pokemon}
                        innerRef={setLastPokemon}
                    />
                ))}
            </div>
        </div>
    );
}

export default PokemonList;
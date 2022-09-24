import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs"
import { useEffect } from "react";

const PokemonDetail = () => {

    const { pokemonName } = useParams()

    useEffect(() => {
        /*
        todo:
            - refactor data fetching so that we use context's data
            - fetch remaining data
            - update context via reducer

        goal:
        - fetch data
        - update reducer
        - context provides reducer
        */



    }, [pokemonName]);

    return (
        <div className="bg-grass">
            <Link to='/'><BsArrowLeft /></Link>
            <div className="fs-2 fw-bold"></div>
        </div>
    );
}

export default PokemonDetail;
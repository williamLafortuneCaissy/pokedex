import ProgressBar from "../progressBar/ProgressBar";

const PokemonStats = ({stats}) => {

    // return transformed prop name if necessery
    const handleProp = (prop) => {
        switch (prop) {
            case 'special-attack':
                return 'sp. attack'
                break;
            case 'special-defense':
                return 'sp. attack'
                break;

            default:
                return prop
                break;
        }
    }

    const handleProgress = (value) => {
        const max = 150
        return value / max * 100
    }

    return (
        <div className="stats__table">
            {stats.map((stat, key) => (
                <div key={stat.prop} className={'stats__row'}>
                    <span className={'stats__prop'}>{handleProp(stat.prop)}</span>
                    <span className={'stats__value'}>{stat.value}</span>
                    <span className={'stats__progress'}><ProgressBar color={key % 2 ? 'red' : 'green'} progress={handleProgress(stat.value)} /></span>
                </div>
            ))}
        </div>
    );
}

export default PokemonStats;
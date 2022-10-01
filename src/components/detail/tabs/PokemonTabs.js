import { useState } from "react";
import PokemonAbout from "../about/PokemonAbout";
import PokemonStats from "../stats/PokemonStats";
import './_tabs.scss';

const PokemonTabs = ({stats}) => {
    const tabs = [
        {
            name: 'About',
            component: <PokemonAbout />
        },
        {
            name: 'Stats',
            component: <PokemonStats stats={stats}/>
        },
        {
            name: 'Moves',
            component: <>PokemonMoves</>
        },
        {
            name: 'Evolutions',
            component: <>PokemonEvolutions</>
        }
    ]

    const [activeTab, setActiveTab] = useState(tabs[0].name);

    // useEffect(() => {
    //     const tabListArray = Object.keys(tabs).map((key) => tabs[key]);
    //     if(!activeTab) setActiveTab(tabListArray[0]);
    // }, []);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    }
    return (
        <>
            <nav className="tabs">
                <ul className="tabs__list">
                    {tabs.map(tab => (
                        <li key={tab.name}
                            role="button"
                            className={`tabs__item ${activeTab === tab.name ? 'active' : ''}`}
                            onClick={() => handleTabClick(tab.name)}
                        >
                            {tab.name}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="pannels">
                {tabs.map(tab => (
                    <div key={tab.name} className={`pannels__item ${tab.name === activeTab ? 'active' : ''}`}>{tab.component}</div>
                ))}
            </div>
            {/* <Tabs
                tabList={Object.keys(tabs).map((key) => tabs[key])}
                activeTab={activeTab}
                onTabClick={handleTabs}
            />
            <TabsPannels components={{
                about: <PokemonAbout pokemonName={pokemon.name}/>,
                stats: <PokemonStats stats={pokemon.stats}/>
            }} />
            <TabsPannel active={activeTab === tabs.about}>
                <PokemonAbout pokemonName={pokemon.name}/>
            </TabsPannel>
            <TabsPannel active={activeTab === tabs.baseStats}>

            </TabsPannel> */}
        </>
    );
}

export default PokemonTabs;
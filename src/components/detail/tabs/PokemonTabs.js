import { useState } from "react";
import PokemonAbout from "../about/PokemonAbout";
import PokemonEvolutions from "../evolutions/PokemonEvolutions";
import PokemonStats from "../stats/PokemonStats";
import './_tabs.scss';

const tabs = [
    {
        name: 'About',
        component: <PokemonAbout />
    },
    {
        name: 'Stats',
        component: <PokemonStats />
    },
    {
        name: 'Moves',
        component: <>PokemonMoves</>
    },
    {
        name: 'Evolutions',
        component: <PokemonEvolutions />
    }
]

const PokemonTabs = () => {
    const [activeTab, setActiveTab] = useState(tabs[3].name);
    const tabPannel = tabs.find(tab => tab.name === activeTab).component;

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    }

    return (
        <div className="tabs">
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
            <div className="tabs__pannel">{tabPannel}</div>
        </div>
    );
}

export default PokemonTabs;
import { useState } from "react";
import { useSelector } from "react-redux";

const PlatformsMenu = ({ onChange }) => {

    const platformsMenu = useSelector((state) => state.getPlatforms);
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedPlatformsList, setSelectedPlatformsList] = useState([]);

    const handleSelectChange = (platformName) => {
        if(!selectedPlatformsList.includes(platformName)){
            setSelectedPlatformsList([...selectedPlatformsList, platformName]);
            onChange({ target: { name: 'platforms', value: [...selectedPlatformsList, platformName] } })
        }
    };

    const handleDelete = (platform) => {
        const updatedList = selectedPlatformsList.filter((platformName) => platformName !== platform);
        setSelectedPlatformsList(updatedList);
        onChange({ target: { name: 'platforms', value: updatedList} });
    };

    const sortedPlatforms = platformsMenu.slice().sort((a,b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    return (
        <div className='list-container'>
            <select name='platform' id='platform-select' value={selectedPlatform} onChange={(event) => handleSelectChange(event.target.value)}>
                <option value="">- Select one or more Platforms -</option>
                {sortedPlatforms.map((platforms) => (
                    <option key={platforms} value={platforms}>
                        {platforms}
                    </option>
                ))}
            </select>

            <div className='selected-platforms-list'>
                {selectedPlatformsList.map((platforms) => (
                    <span key={platforms}>
                        {platforms}
                        <button onClick={() => handleDelete(platforms)}>X</button>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default PlatformsMenu;
import './Genres.modules.css';
import { useSelector } from 'react-redux';

import actionIcon from '../../assets/icons/action.png';
import adventureIcon from '../../assets/icons/adventure.png';
import arcadeIcon from '../../assets/icons/arcade.png';
import boardIcon from '../../assets/icons/board.png';
import cardIcon from '../../assets/icons/card.png';
import casualIcon from '../../assets/icons/casual.png';
import educationalIcon from '../../assets/icons/educational.png';
import familyIcon from '../../assets/icons/family.png';
import fightingIcon from '../../assets/icons/fighting.png';
import indieIcon from '../../assets/icons/indie.png';
import multiplayerIcon from '../../assets/icons/multiplayer.png';
import platformIcon from '../../assets/icons/platform.png';
import puzzleIcon from '../../assets/icons/puzzle.png';
import racingIcon from '../../assets/icons/racing.png';
import rpgIcon from '../../assets/icons/rpg.png';
import shooterIcon from '../../assets/icons/shooter.png';
import simulationIcon from '../../assets/icons/simulation.png';
import sportsIcon from '../../assets/icons/sports.png';
import strategyIcon from '../../assets/icons/strategy.png';

const genreIcons = {
    'Action': actionIcon,
    'Adventure': adventureIcon,
    'Arcade': arcadeIcon,
    'Board Games': boardIcon,
    'Card': cardIcon,
    'Casual': casualIcon,
    'Educational': educationalIcon,
    'Family': familyIcon,
    'Fighting': fightingIcon,
    'Indie': indieIcon,
    'Massively Multiplayer': multiplayerIcon,
    'Platformer': platformIcon,
    'Puzzle': puzzleIcon,
    'Racing': racingIcon,
    'RPG': rpgIcon,
    'Shooter': shooterIcon,
    'Simulation': simulationIcon,
    'Sports': sportsIcon,
    'Strategy': strategyIcon
}

const genreNameMapping = {
    'Massively Multiplayer': 'MMO',
    'Board Games': 'Board',
    'Educational': 'Education',
    'Platformer': 'Platform'
};

function Genres ({ genres, isHomeRoute }) {

    const gameDetails = useSelector((state) => state.gameDetails);
    const routeClass = isHomeRoute ? 'route1' : 'route2';
    let genresData = [];
    
    if (Array.isArray(gameDetails.genres)) {
        genresData = gameDetails.genres;
    } else  if (genres || Array.isArray(genres)) {
        genresData = genres;
    }
    
    const getGenreIcons = () => {

        if (!genresData) {
            return null; 
        }

        return genresData.map((genre, index) => {
            const shortGenreName = genreNameMapping[genre] || genre;
            return (
                <div key={index} className={`genre-container ${routeClass}`}>
                    <img className={`genre-icon ${routeClass}`} src={genreIcons[genre]} alt={`${genre}-icon`} />
                    <span className={`genre-name ${routeClass}`}>{shortGenreName}</span>
                </div>
            );
        });
    };

    return (
        <div className={`game-genres ${routeClass}`}>
            {getGenreIcons()}
        </div>
    );
}

export default Genres;
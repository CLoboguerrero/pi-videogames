import './Form.modules.css';

const ConfirmationPopup = ({ onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Your Videogame Has Been Created!</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
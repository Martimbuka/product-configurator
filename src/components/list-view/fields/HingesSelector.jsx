import React from "react";
import "./../../../style/hinges-selector.css";

const HingesSelector = ({ itemData, setItemData }) => {
    const [selectedHinges, setSelectedHinges] = React.useState(itemData.hinges);

    const handleHingesChange = (hinges) => {
        setSelectedHinges(hinges);
        setItemData((prevState) => ({
            ...prevState,
            hinges: hinges,
        }));
    }

    return (
        <div className="hinges-selector">
            <div
                className={`hinges-option ${selectedHinges === 2 ? "selected" : ""}`}
                onClick={() => handleHingesChange(2)}
            >
                2
            </div>
            <div
                className={`hinges-option ${selectedHinges === 3 ? "selected" : ""}`}
                onClick={() => handleHingesChange(3)}
            >
                3
            </div>
            <div
                className={`hinges-option ${selectedHinges === 4 ? "selected" : ""}`}
                onClick={() => handleHingesChange(4)}
            >
                4
            </div>
            <div
                className={`hinges-option ${selectedHinges === 5 ? "selected" : ""}`}
                onClick={() => handleHingesChange(5)}
            >
                5
            </div>
        </div>
    );
};

export default HingesSelector;
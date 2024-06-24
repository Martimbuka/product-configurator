import React, {useState} from "react";
import "./../../../style/wing-selector.css";

const WingSelector = ({ itemData, setItemData }) => {
    const [selectedWing, setSelectedWing] = useState(itemData.wing);

    const handleWingChange = (wing) => {
        setSelectedWing(wing);
        setItemData((prevState) => ({
            ...prevState,
            wing: wing,
        }));
    }

    return (
        <div className="wing-selector">
            <div
                className={`wing-option ${selectedWing === "Да" ? "selected" : ""}`}
                onClick={() => handleWingChange("Да")}
            >
                Да
            </div>
            <div
                className={`wing-option ${selectedWing === "Не" ? "selected" : ""}`}
                onClick={() => handleWingChange("Не")}
            >
                Не
            </div>
        </div>
    );
}

export default WingSelector;
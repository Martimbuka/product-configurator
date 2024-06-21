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
                className={`wing-option ${selectedWing === "yes" ? "selected" : ""}`}
                onClick={() => handleWingChange("yes")}
            >
                Да
            </div>
            <div
                className={`wing-option ${selectedWing === "no" ? "selected" : ""}`}
                onClick={() => handleWingChange("no")}
            >
                Не
            </div>
        </div>
    );
}

export default WingSelector;
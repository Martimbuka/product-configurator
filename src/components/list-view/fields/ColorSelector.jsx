import React, { useState } from "react";
import "./../../../style/color-selector.css";

const ColorSelector = ({ itemData, setItemData }) => {
    const [selectedColor, setSelectedColor] = useState(itemData.sealColor);

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setItemData((prevState) => ({
            ...prevState,
            sealColor: color,
        }));
    };

    return (
        <div className="color-selector">
            <div
                className={`color-option ${selectedColor === "Бялo" ? "selected" : ""}`}
                onClick={() => handleColorChange("Бялo")}
            >
                Бялo
            </div>
            <div
                className={`color-option ${selectedColor === "Сивo" ? "selected" : ""}`}
                onClick={() => handleColorChange("Сивo")}
            >
                Сивo
            </div>
            <div
                className={`color-option ${selectedColor === "Черно" ? "selected" : ""}`}
                onClick={() => handleColorChange("Черно")}
            >
                Черно
            </div>
        </div>
    );
};

export default ColorSelector;
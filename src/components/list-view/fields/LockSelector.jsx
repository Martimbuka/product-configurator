import React, { useState } from "react";
import "./../../../style/lock-selector.css";
import LockImg from "./../LockImg";

const LockSelector = ({ itemData, setItemData }) => {
    const [lock, setLock] = useState(itemData.lock || "");

    const handleChange = (e) => {
        const { value } = e.target;
        setLock(value);
        setItemData(prevState => ({
            ...prevState,
            lock: value
        }));
    };

    return (
        <div className="lock-selector">
            <div 
            className={`lock-option ${lock === "CB" ? "selected" : ""}`} 
            onClick={() => handleChange({ target: { value: "CB" } })}
            >
                <span>CB</span>
                <LockImg lock="CB" />
            </div>
            <div
            className={`lock-option ${lock === "PC" ? "selected" : ""}`}
            onClick={() => handleChange({ target: { value: "PC" } })}
            >
                <span>PC</span>
                <LockImg lock="PC" />
            </div>
            <div
            className={`lock-option ${lock === "WC" ? "selected" : ""}`}
            onClick={() => handleChange({ target: { value: "WC" } })}
            >
                <span>WC</span>
                <LockImg lock="WC" />
            </div>
        </div >
    );
};

export default LockSelector;
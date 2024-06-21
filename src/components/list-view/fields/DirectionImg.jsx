import React from "react";
import { ReactComponent as InsideLeft } from "../../../assets/inside-left.svg";
import { ReactComponent as InsideRight } from "../../../assets/inside-right.svg";
import { ReactComponent as OutsideLeft } from "../../../assets/outside-left.svg";
import { ReactComponent as OutsideRight } from "../../../assets/outside-right.svg";

const DirectionImg = ({ direction }) => {
    return (
        <div className="direction-img">
            {direction === "inside-left" && <InsideLeft />}
            {direction === "inside-right" && <InsideRight />}
            {direction === "outside-left" && <OutsideLeft />}
            {direction === "outside-right" && <OutsideRight />}
        </div>
    );
};

export default DirectionImg;
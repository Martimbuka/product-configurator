import React from "react";
import { ReactComponent as InsideLeft } from "../../../assets/inside-left.svg";
import { ReactComponent as InsideRight } from "../../../assets/inside-right.svg";
import { ReactComponent as OutsideLeft } from "../../../assets/outside-left.svg";
import { ReactComponent as OutsideRight } from "../../../assets/outside-right.svg";

const DirectionImg = ({ direction, forEmail }) => {
    return (
        <div className="direction-img">
            {!forEmail ?
                <>
                    {direction === "Навътре, ляво" && <InsideLeft />}
                    {direction === "Навътре, дясно" && <InsideRight />}
                    {direction === "Навън, ляво" && <OutsideLeft />}
                    {direction === "Навън, дясно" && <OutsideRight />}
                </>
                :
                <>
                    {/* take the svg code in string */}
                    
                </>
            }
        </div>
    );
};

export default DirectionImg;
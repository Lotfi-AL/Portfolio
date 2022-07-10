import { statusType } from "../Store/StatusContext";
import React from "react";

export const Rain = (status: statusType) => {
    const rainDrops: JSX.Element[] = [];
    // legger til dråpe-elementer til en liste som blir rend
    // adds rain drops to a list. the list gets rendered in the return-statement, just like skybox
    if (status.rain === true && status.wind === false) {
        for (let i = 0; i < 200; i++) {
            rainDrops.push(<div className="drop" key={i}></div>);
        } //these loops and if-statements checks whether the wind function is on and gives classname according, since the styling and animation differs
        return <div className="rain">{rainDrops}</div>;
    } else if (status.rain === true && status.wind === true) {
        for (let i = 0; i < 200; i++) {
            rainDrops.push(<div className="drop wind" key={i}></div>);
        }
        return <div className="rain">{rainDrops}</div>;
    } else return null;
};

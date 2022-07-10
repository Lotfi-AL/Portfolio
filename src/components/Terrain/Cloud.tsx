import React from "react";
import "./Terrain.css";
import { useStatus } from "../Store/StatusProvider";

const Cloud = (props: JSX.IntrinsicAttributes) => {
    // returns an SVG element of cloud. this was the easiest way to import SVG element to components and still be able to manipulate the element.
    const { status, scene, currScene } = useStatus();
    let fill = "";
    if (scene[currScene].rain == true && scene[currScene].night == false) {
        fill = "grey";
    } else if (scene[currScene].rain == true && scene[currScene].night == true) {
        fill = "blue";
    } else {
        fill = "white";
    }
    return (
        <svg className="cloud" viewBox="5 60 100 100">
            <path
                d="
            M 82,100 20, 100 20, 98 18, 98 18, 96 16, 96 16, 90 18, 90 18, 88 20, 88 20, 84 22, 84 22, 82 24, 82 24, 80
            30, 80 30, 78 32, 78 32, 76 34, 76 34, 74 38, 74 38, 72
            40, 72 40, 70 42, 70 42, 68 48, 68 48, 70 50, 70 50, 72 52, 72 52, 74 56, 74 56, 72 58, 72 58, 70 60, 70 60, 68 62, 68 62, 66 64, 66 64, 64 70, 64 70, 66 72, 66 72, 68 74, 68 74, 70 76, 70 76, 72 78, 72 78, 76 84, 76 84, 78 86, 78 86, 80 88, 80 88, 84 90, 84 90, 86 92, 86 92, 90 90, 90 90, 92 88, 92 88, 94 86, 94 86, 96 84, 96 84, 98 82, 98 82,100 Z    "
                fill={fill}
            />
        </svg>
    );
};
export default Cloud;

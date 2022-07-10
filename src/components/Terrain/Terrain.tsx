import React, { useEffect, useRef, useState } from "react";
import "./Terrain.css";
import { useStatus } from "../Store/StatusProvider";
import Skybox from "./Skybox";
import { Rain } from "./Rain";
import Mountain from "./Mountain";

const Terrain = () => {
    //Main component for terrain. gets the other components, displays and sends states
    const { scene, currScene } = useStatus();
    const [status, setStatus] = useState(scene[currScene]);

    useEffect(() => {
        setStatus(scene[currScene]);
    });

    return (
        <>
            <Mountain></Mountain>
            <Rain {...status}></Rain>
            <Skybox {...status}></Skybox>
        </>
    );
};

export default Terrain;

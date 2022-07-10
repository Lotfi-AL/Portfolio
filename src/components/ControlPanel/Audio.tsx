import React, { useEffect, useRef, useState } from "react";
import rainSrc from "../../assets/soundeffects/rain.mp3";
import windSrc from "../../assets/soundeffects/wind.mp3";
import { useStatus } from "../Store/StatusProvider";
import muteIcon from "../../assets/icons/volume-up.svg";
import unmuteIcon from "../../assets/icons/volume-mute.svg";

type mutedType = {};
export default function Audio() {
    const audioRef = useRef(null);

    const [muted, setMuted] = useState(false);
    const { scene, currScene } = useStatus();

    useEffect(() => {
        const rainRef = audioRef.current.children[0];
        const windRef = audioRef.current.children[1];
        rainRef.volume = 0.2;
        windRef.volume = 0.2;
        scene[currScene].rain ? rainRef.play() : rainRef.pause();
        scene[currScene].wind ? windRef.play() : windRef.pause();
    });

    return (
        <React.Fragment>
            <div className="audio" ref={audioRef}>
                <audio src={rainSrc} muted={muted} autoPlay loop></audio>;
                <audio src={windSrc} muted={muted} autoPlay loop></audio>
            </div>
            <button className="muteBtn" onClick={() => setMuted(!muted)}>
                <img src={muted ? unmuteIcon : muteIcon} className="playPauseBtn controlPanelBtn  link" />
            </button>
        </React.Fragment>
    );
}

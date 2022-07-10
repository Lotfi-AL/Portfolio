import React from "react";
import { loadStorage, saveStorage } from "../../utils/LoadSave";
import { useStatus } from "../Store/StatusProvider";
import { ToggleProps } from "./Landingpage";

type Props = {
    children: React.ReactNode;
};

export const LoadBtn = (props: ToggleProps) => {
    const { setScene, currScene } = useStatus();
    return (
        <div
            className="box link startLink"
            onClick={() => {
                props.ClickHandler();
                setScene(loadStorage().scene);
            }}>
            Load Previous Save
        </div>
    );
};

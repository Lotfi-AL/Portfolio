import React from 'react';
export type statusType = {
    rain: boolean;
    wind: boolean;
    night: boolean;
};

export type EnumStatus = statusType[];

export type sceneType = {};
export type StatusContextType = {
    scene: statusType[];
    // setScene: (value: statusType[]) => void;
    status: statusType;
    // currrentScene: number;
    currScene: number;
    setCurrScene: (value: number) => void;
    setScene: (value: statusType[]) => void;
    setStatus: (value: statusType) => void;
};

export let defStatus = {
    rain: false,
    wind: false,
    night: false,
};

export const StatusContext = React.createContext<StatusContextType | undefined>(
    undefined,
);

import * as React from 'react';
import Landingpage from '../Landingpage/Landingpage';
import Game from '../Game/Game';

import Audio from '../ControlPanel/Audio';
import { loadSession, saveSession } from '../../utils/LoadSave';
import { defStatus, StatusContext, statusType } from './StatusContext';

type Props = {
    children: React.ReactNode;
};

export const StatusProvider = ({ children }: Props) => {
    let defaultStatus: statusType;
    let defaultScene: statusType[] = [
        defStatus,
        defStatus,
        defStatus,
        defStatus,
        defStatus,
    ];
    let defaultCurrScene: number = 2;
    let sess = loadSession();
    if (sess) {
        defaultScene = sess.scene;
        defaultCurrScene = sess.currScene;
    } else {
        defaultStatus = defStatus;
    }
    const [status, setStatus] = React.useState(defaultStatus);
    const [scene, setScene] = React.useState(defaultScene);
    const [currScene, setCurrScene] = React.useState(defaultCurrScene);
    React.useEffect(() => {
        saveSession(scene, currScene);
    }, [currScene, status]);

    return (
        <StatusContext.Provider
            value={{
                status,
                setStatus,
                currScene,
                setCurrScene,
                scene,
                setScene,
            }}
        >
            {children}
        </StatusContext.Provider>
    );
};

export const useStatus = () => React.useContext(StatusContext);

import React from 'react';
import { StatusProvider } from '../components/Store/StatusProvider';
import Landingpage from '../components/Landingpage/Landingpage';
import Terrain from '../components/Terrain/Terrain';
import ControlPanel from '../components/ControlPanel/ControlPanel';
import Poetry from '../components/Poetry/Poetry';
import Game from '../components/Game/Game';

type MyState = {
    landed: boolean;
};

interface ToggleProps {
    ClickHandler: () => void;
}
export type saveState = {
    landed: boolean;
};

class GalleryGame extends React.Component<{}, MyState> {
    state: MyState = {
        landed: window.sessionStorage.getItem('landed') === 'true',
    };

    constructor(props: any) {
        super(props);
        this.toggleClickHandler = this.toggleClickHandler.bind(this);
    }

    toggleClickHandler = () => {
        console.log('click');
        this.setState((prevState) => {
            if (prevState.landed === true) {
                return { landed: false };
            }
            if (prevState.landed === false) {
                return { landed: true };
            }
        });
    };

    render() {
        if (!this.state.landed) {
            return (
                <StatusProvider>
                    <Landingpage
                        ClickHandler={this.toggleClickHandler}
                    ></Landingpage>
                </StatusProvider>
            );
        }
        return (
            <>
                <StatusProvider>
                    <Terrain></Terrain>
                    <ControlPanel></ControlPanel>
                    <Game />

                    <Poetry></Poetry>
                </StatusProvider>
                <div className="rotate">
                    <h2>
                        This website requires the use of a keyboard, please
                        switch device and try again later.
                    </h2>
                </div>
            </>
        );
    }
}

export default GalleryGame;

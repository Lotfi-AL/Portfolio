import React, { Component } from 'react';
import Audio from './Audio';
import './ControlPanel.css';
import backIcon from '../../assets/icons/left-arrow.svg';
import SaveBtn from './SaveBtn';
export class ControlPanel extends Component {
    render() {
        return (
            <div className="controlpanelWrapper">
                <div className="controlpanelContainer">
                    <button
                        onClick={() => {
                            window.location.href = '';
                            window.sessionStorage.setItem('landed', 'false');
                        }}
                    >
                        <img src={backIcon} className="controlPanelBtn link" />
                    </button>

                    <Audio></Audio>
                    <SaveBtn></SaveBtn>
                </div>
            </div>
        );
    }
}

export default ControlPanel;

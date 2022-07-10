import * as React from 'react';
import { Component } from 'react';
import Background from './Background';
import Foreground from './Foreground';
import './Game.css';

export default class Game extends Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        window.sessionStorage.setItem('landed', 'false');
    }
    render() {
        return (
            <>
                <Background className="background" />
                <Foreground className="foreground" />
            </>
        );
    }
}

import React, { useRef, useEffect } from "react";
import charWalkCycle from "../../assets/character/walkCycle.png";
import textSprite from "../../assets/character/buttonText.png";
import paintingsSprite from "../../assets/house/paintings.png";
import doorSprite from "../../assets/house/door.png";
import { useStatus } from "../Store/StatusProvider";
import { statusType } from "../Store/StatusContext";

let characterX = 250;
let row = 1;
let currentFrame = 0;
let walking = false;
let fpsTimer: NodeJS.Timeout;

let activeDoor = [false, false];
let activePainting = [false, false, false];

const Foreground = (
    props: JSX.IntrinsicAttributes &
        import("react").ClassAttributes<HTMLCanvasElement> &
        import("react").CanvasHTMLAttributes<HTMLCanvasElement>,
) => {
    const canvasRef = useRef(null);
    const { status, setStatus, setCurrScene, currScene } = useStatus();
    const { scene, setScene } = useStatus();
    const characterSpeed = 2;

    const sprite = new Image();
    sprite.src = charWalkCycle;

    const spacebar = new Image();
    spacebar.src = textSprite;

    const door = new Image();
    door.src = doorSprite;
    const doorPositions = [10, 438];

    const paintings = new Image();
    paintings.src = paintingsSprite;
    const paintingPositions = [60, 110, 160];

    const isCharacterWithin = (x: number, width: number) => {
        if (characterX > x - 16 && characterX < x + width) {
            return true;
        } else {
            return false;
        }
    };
    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(paintings, 0, 0, 32, 32, paintingPositions[0], 32, 32, 32);
        ctx.drawImage(paintings, 32, 0, 32, 32, paintingPositions[1], 32, 32, 32);
        ctx.drawImage(paintings, 32, 32, 32, 32, paintingPositions[2], 32, 32, 32);
        ctx.drawImage(door, 32, 0, 32, 48, doorPositions[0], 32, 32, 48);
        ctx.drawImage(door, 32, 0, 32, 48, doorPositions[1], 32, 32, 48);

        if (isCharacterWithin(paintingPositions[0], 32)) {
            ctx.drawImage(spacebar, 0, 0, 64, 32, paintingPositions[0] - 16, 16, 64, 32);
            activePainting[0] = true;
        } else {
            activePainting[0] = false;
        }

        if (isCharacterWithin(paintingPositions[1], 32)) {
            ctx.drawImage(spacebar, 0, 0, 64, 32, paintingPositions[1] - 16, 16, 64, 32);
            activePainting[1] = true;
        } else {
            activePainting[1] = false;
        }

        if (isCharacterWithin(paintingPositions[2], 32)) {
            ctx.drawImage(spacebar, 0, 0, 64, 32, paintingPositions[2] - 16, 16, 64, 32);
            activePainting[2] = true;
        } else {
            activePainting[2] = false;
        }

        if (isCharacterWithin(doorPositions[0], 32)) {
            ctx.drawImage(door, 0, 0, 32, 48, doorPositions[0], 32, 32, 48);
            activeDoor[0] = true;
        } else {
            activeDoor[0] = false;
        }

        if (isCharacterWithin(doorPositions[1], 32)) {
            ctx.drawImage(door, 0, 0, 32, 48, doorPositions[1], 32, 32, 48);
            activeDoor[1] = true;
        } else {
            activeDoor[1] = false;
        }

        if (walking) {
            currentFrame++;
            currentFrame > 3 ? (currentFrame = 0) : null;
            ctx.drawImage(sprite, currentFrame * 20, row * 20, 20, 20, characterX, 60, 20, 20);
        } else {
            ctx.drawImage(sprite, 0, row * 20, 20, 20, characterX, 60, 20, 20);
        }
    };

    document.onkeydown = (event) => {
        if (event.keyCode === 39) {
            walking = true;
            characterX < 455 ? (characterX += characterSpeed) : null;
            row = 0;
        } else if (event.keyCode === 37) {
            walking = true;
            characterX > 5 ? (characterX -= characterSpeed) : null;
            row = 1;
        }
    };

    document.onkeyup = (event) => {
        walking = false;
        if (event.keyCode === 39 || event.keyCode === 37) {
            currentFrame = 0;
        }

        if (event.keyCode === 32) {
            const newStatus: statusType = {
                rain: scene[currScene].rain,
                wind: scene[currScene].wind,
                night: scene[currScene].night,
            };

            if (activePainting[0]) {
                clearTimeout(fpsTimer);
                newStatus.night = !newStatus.night;
                setStatus(newStatus);
                scene[currScene] = newStatus;
                setScene(scene);
            } else if (activePainting[1]) {
                clearTimeout(fpsTimer);
                newStatus.wind = !newStatus.wind;
                setStatus(newStatus);
                scene[currScene] = newStatus;
                setScene(scene);
            } else if (activePainting[2]) {
                clearTimeout(fpsTimer);
                newStatus.rain = !newStatus.rain;
                setStatus(newStatus);
                scene[currScene] = newStatus;
                setScene(scene);
            } else if (activeDoor[0]) {
                currScene === 0 ? setCurrScene(4) : setCurrScene(currScene - 1);
            } else if (activeDoor[1]) {
                currScene === 4 ? setCurrScene(0) : setCurrScene(currScene + 1);
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.webkitImageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        const render = () => {
            draw(context);
            clearInterval(fpsTimer);
            fpsTimer = setTimeout(render, 1000 / 12);
        };

        render();
    }, [draw]);

    return <canvas width="480" height="100" ref={canvasRef} {...props} />;
};

export default Foreground;

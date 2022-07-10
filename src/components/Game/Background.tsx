import React, { useRef, useEffect, useState } from 'react';
import interior from '../../assets/house/interior.png';

import tileMap from '../../assets/house/layout.json';

const Background = (props: any) => {
    const [loading, setLoading] = useState(true);
    const canvasRef = useRef(null);

    let houseInterior = new Image();
    houseInterior.src = interior;

    houseInterior.onload = () => {
        setLoading(false);
    };

    const draw = (ctx: CanvasRenderingContext2D) => {
        for (let i = 0; i < ctx.canvas.width / 20; i++) {
            for (let j = 0; j < ctx.canvas.height / 20; j++) {
                ctx.drawImage(
                    houseInterior,
                    16 * 5,
                    16,
                    16,
                    16,
                    20 * i,
                    20 * j,
                    20,
                    20,
                );
            }
        }

        for (let tile of tileMap) {
            if (tile.canvasX === -1) {
                for (let i = 0; i < ctx.canvas.width; i++) {
                    ctx.drawImage(
                        houseInterior,
                        16 * tile.tileX,
                        16 * tile.tileY,
                        16,
                        16,
                        20 * i,
                        20 * tile.canvasY,
                        20,
                        20,
                    );
                }
            } else if (tile.canvasY === -1) {
                for (let i = 0; i < ctx.canvas.height; i++) {
                    ctx.drawImage(
                        houseInterior,
                        16 * tile.tileX,
                        16 * tile.tileY,
                        16,
                        16,
                        20 * tile.canvasX,
                        20 * i,
                        20,
                        20,
                    );
                }
            } else {
                ctx.drawImage(
                    houseInterior,
                    16 * tile.tileX,
                    16 * tile.tileY,
                    16,
                    16,
                    20 * tile.canvasX,
                    20 * tile.canvasY,
                    20,
                    20,
                );
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.webkitImageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        draw(context);
    }, [loading]);

    return <canvas width="480" height="100" ref={canvasRef} {...props} />;
};

export default Background;

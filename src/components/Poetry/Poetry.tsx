import * as React from "react";
import "./Poetry.css";
import "../App.css";
import { useState } from "react";
import { useEffect } from "react";
import { useStatus } from "../Store/StatusProvider";

interface PoemMetaData {
    author: String;
    title: String;
}

let lineTimer: NodeJS.Timeout;

const Poetry = () => {
    const linesRef = React.useRef(null);

    const [author, setAuthor] = useState(null);
    const [title, setTitle] = useState(null);
    const [lines, setLines] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currScene } = useStatus();
    // list of poems that we want to get from the API
    const poemMetaList: PoemMetaData[] = [
        { author: "George Eliot", title: "God Needs Antonio" },
        { author: "Adam Lindsay Gordon", title: "A Song of Autumn" },
        { author: "Ben Jonson", title: "A Hymn to God the Father" },
        { author: "Thomas Campbell", title: "The River of Life" },
        { author: "William Shakespeare", title: "Spring" },
    ];
    // function to fetch the poem from database
    const getPoem = async (a: String, t: String) => {
        let response = await fetch("https://poetrydb.org/author,title/" + a + ";" + t);
        let data = await response.json();
        setAuthor(data[0].author);
        setTitle(data[0].title);
        setLines(data[0].lines);
    };

    let currentLine = 0;
    // function to reset the highlighting when going to another scene
    const removeHightlighting = () => {
        if (!loading) {
            for (let i: number = 0; i < linesRef.current.children.length; i++) {
                linesRef.current.children[i].className = "";
            }
        }
    };
    // function to highlight poem
    const highlightPoem = () => {
        if (!loading) {
            clearInterval(lineTimer);
            lineTimer = setInterval(() => {
                if (currentLine >= linesRef.current.children.length - 1) {
                    clearInterval(lineTimer);
                }
                let p = linesRef.current.children[currentLine];

                p.className = "word";

                currentLine += 1;
            }, 3000);
        }
    };

    useEffect(() => {
        getPoem(poemMetaList[currScene].author, poemMetaList[currScene].title).then(() => {
            setLoading(false);
            removeHightlighting();
            highlightPoem();
        });
    }, [currScene, loading]);

    return (
        <div className="poemWrapper">
            <div className="poemContainer">
                {loading === false ? (
                    <>
                        <h1>{author}</h1>
                        <h2>{title}</h2>
                        <div ref={linesRef} className="poemLines">
                            {lines.map((line: string, index: number) => {
                                return <p key={index}>{line}</p>;
                            })}
                        </div>
                    </>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </div>
    );
};

export default Poetry;

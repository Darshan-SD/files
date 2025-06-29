import { useState } from "react";
import CameraImage from "../static/images/camera.png";
import GuitarImage from "../static/images/guitar.png";
import ArijitSignImage from "../static/images/arijitsingh.jpg";
import NeffexImage from "../static/images/neffex.jpg";
import GreenDayImage from "../static/images/greenday.png";
import DragonBallGIF from "../static/images/dragonball.gif";
import AotGIF from "../static/images/aot.gif";
import DrStoneGIF from "../static/images/drstone.gif";
import VinlandSagaGIF from "../static/images/vinlandsaga.gif";
import ReactJSImage from "../static/images/reactjs.png";

const DrawerCon = () => {
    let files = [
        {
            name: "welcome.html",
            id: "file1",
            status: "close",
            type: "text",
            content: "It's a simple project and I'm not really showing off my front-end skills ;)"
        },
        {
            name: "hobbies.heic",
            id: "file2",
            status: "close",
            type: "images",
            content: [
                {
                    name: "guitar.heic",
                    image: null
                },
                {
                    name: "photography.heic",
                    image: null
                }
            ]
        },
        {
            name: "secret.mov",
            id: "file3",
            status: "close",
            type: "text",
            content: "hidden"
        },
        {
            name: "favourites.mp3",
            id: "file4",
            status: "close",
            type: "music",
            content: [
                {
                    name: "Green Day",
                    image: GreenDayImage,
                    link: null
                },
                {
                    name: "Arijit Singh",
                    image: ArijitSignImage,
                    link: null
                },
                {
                    name: "Neffex",
                    image: NeffexImage,
                    link: null
                }
            ]
        },
        {
            name: "on_repeat.anime",
            id: "file5",
            status: "close",
            type: "gifs",
            content: [
                {
                    name: "Dragon Ball",
                    image: DragonBallGIF,
                    link: null
                },
                {
                    name: "Attack on Titan",
                    image: AotGIF,
                    link: null
                },
                {
                    name: "Vinland Saga",
                    image: VinlandSagaGIF,
                    link: null
                },
                {
                    name: "Dr. Stone",
                    image: DrStoneGIF,
                    link: null
                }
            ]
        },
        {
            name: "developed_with.html",
            id: "file6",
            status: "close",
            type: "images",
            content: [{
                name: "ReactJS",
                image: ReactJSImage,
            }]
        }
    ];

    const [fileStatus, setFileStatus] = useState(files.map(file => file.status));
    const [shakingFiles, setShakingFiles] = useState(new Set());

    function triggerShakeAnimation(fileId) {
        setShakingFiles(prev => new Set([...prev, fileId]));
        setTimeout(() => {
            setShakingFiles(prev => {
                const newSet = new Set(prev);
                newSet.delete(fileId);
                return newSet;
            });
        }, 500);
    }

    function openCloseFile(e) {
        try {
            e.stopPropagation();

            const fileId = parseInt(e.target.dataset.fileid);
            const file = document.getElementById(`file${fileId}`);
            const fileContent = document.getElementById(`${file.id}content`);
            const fileIndex = fileId - 1;
            const currentFileStatus = fileStatus[fileIndex];

            if (!file) {
                return
            }

            if (currentFileStatus === "close") {

                if (files.find((element) => {
                    return element.id === `file${fileId}` && element.content === "hidden"
                })) {
                    triggerShakeAnimation(`file${fileId}`);
                    return;
                }
                const fileContentHeight = fileContent.getBoundingClientRect().height;
                file.style.transform = `translateY(${40 * fileIndex - fileContentHeight + 50}px) translateZ(${40 + 50}px) rotateX(-20deg)`;
                file.style.scale = "0.92";
            }
            else {
                file.style.transform = `translateY(${40 * fileIndex}px) translateZ(${0}px) rotateX(-30deg)`;
                file.style.scale = "1";
            }

            setFileStatus(prevStatus => {
                const newStatus = [...prevStatus];
                newStatus[fileIndex] = newStatus[fileIndex] === "close" ? "open" : "close";
                return newStatus;
            });
        }
        catch (e) {
            console.log(e);
            return;
        }
    }

    return (
        <div className="drawer-con">
            {files.map((file, index) => {
                const isShaking = shakingFiles.has(file.id);

                return (
                    <div className="file-con"
                        style={{ transform: `translateY(${40 * index}px) rotateX(-30deg)` }}
                        id={file.id}
                    >
                        <div
                            key={file.id}
                            className={isShaking ? "file file-shake" : "file"}

                            data-fileid={index + 1}
                            data-status={fileStatus[index]}
                            onClick={openCloseFile}
                        >
                            <div className={`file-label ${(index + 1) % 2 === 0 ? "right-label" : "left-label"}`}
                                data-fileid={index + 1}
                                data-status={fileStatus[index]}>
                                {file.name}
                            </div>
                            <div className="file-content"
                                id={`${file.id}content`}
                                data-fileid={index + 1}
                                data-status={fileStatus[index]}
                            >
                                {file.type === "text" ?
                                    file.content
                                    : ""}

                                {file.type === "images" ?
                                    file.name === "hobbies.heic" ?
                                        <div className="hobbies-con" data-fileid={index + 1} data-status={fileStatus[index]}>
                                            <div>
                                                <img src={CameraImage} alt="" className="hobby-img" data-fileid={index + 1} data-status={fileStatus[index]} />
                                            </div>
                                            <div>
                                                <img src={GuitarImage} alt="" className="hobby-img" data-fileid={index + 1} data-status={fileStatus[index]} />
                                            </div>
                                        </div>
                                        : ""
                                    : ""}

                                {file.type === "music" ?
                                    <div className="fav-music-con" data-fileid={index + 1} data-status={fileStatus[index]}>
                                        {file.content.map((music) => {
                                            return (
                                                <div className="fav-music">
                                                    <div>
                                                        <img className="fav-music-img" src={music.image} alt={music.name} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                    : ""}

                                {file.type === "gifs" ?
                                    file.name === "on_repeat.anime" ?
                                        <div className="anime-con" data-fileid={index + 1} data-status={fileStatus[index]}>
                                            {file.content.map((anime) => {
                                                return (
                                                    <div>
                                                        <img src={anime.image} alt={anime.name} className="anime-img" />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        : ""
                                    : ""}

                                {file.type === "images" && file.name === "developed_with.html" ?
                                    file.content.map((logo) => {
                                        return (
                                            <div className="develop-with-con" data-fileid={index + 1} data-status={fileStatus[index]}>
                                                <img className="develop-with-img" src={logo.image} alt={logo.name} />
                                                <p>No other external JavaScript library is used.</p>
                                            </div>
                                        )
                                    })
                                    : ""}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DrawerCon;
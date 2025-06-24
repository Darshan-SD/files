import { useState } from "react";

const DrawerCon = () => {
    let files = [
        {
            name: "name1", // Fixed typo: was "nane"
            id: "file1",
            status: "close",
            content: "Hey this is the intro"
        },
        {
            name: "name2", // Fixed typo: was "nane"
            id: "file2",
            status: "close",
            content: "Hey this is the intro"
        },
        {
            name: "name3", // Fixed typo: was "nane"
            id: "file3",
            status: "close",
            content: "Hey this is the intro"
        },
        {
            name: "name4", // Fixed typo: was "nane"
            id: "file4",
            status: "close",
            content: "Hey this is the intro"
        },
        {
            name: "name5", // Fixed typo: was "nane"
            id: "file5",
            status: "close",
            content: "Hey this is the intro"
        }
    ];

    // Fixed state initialization - use map to create array of statuses
    const [fileStatus, setFileStatus] = useState(files.map(file => file.status));

    function openCloseFile(e) {
        e.stopPropagation(); // Prevent event bubbling
        
        const fileId = parseInt(e.target.dataset.fileid);
        const file = document.getElementById(`file${fileId}`);
        const fileIndex = fileId - 1;
        // Use the current state instead of DOM attribute
        const currentFileStatus = fileStatus[fileIndex];

        console.log(fileStatus, currentFileStatus);

        if(!file){
            return
        }

        if (currentFileStatus === "close") {
            file.style.transform = `translateY(${40*fileIndex - 75}px) rotateX(0deg)`;
            file.style.height = "200px";
            file.style.scale = "0.93";
        }
        else {
            file.style.transform = `translateY(${40*fileIndex}px) rotateX(-30deg)`;
            // file.style.height = "0px";
            file.style.scale = "1";
        }

        // Update the state instead of just getting DOM element
        setFileStatus(prevStatus => {
            const newStatus = [...prevStatus];
            console.log(newStatus[fileIndex]);
            newStatus[fileIndex] = newStatus[fileIndex] === "close" ? "open" : "close";
            return newStatus;
        });
    }

    return (
        <div className="drawer-con">
            {/* Use map instead of forEach to render elements */}
            {files.map((file, index) => {
                return (
                    <div className="file-con"
                    // data-fileid={index + 1}
                    //     data-status={fileStatus[index]}
                    //     onClick={openCloseFile}
                    style={{transform: `translateY(${40*index}px) rotateX(-30deg)`}}
                    id={file.id}
                        >
                    <div
                        key={file.id}
                        className="file"
                        
                        data-fileid={index + 1}
                        data-status={fileStatus[index]}
                        onClick={openCloseFile}
                        // style={{transform: `translateY(${40*index}px) rotateX(-30deg)`, zIndex: index}}
                    >
                        <div className={`file-label ${(index + 1) % 2 === 0 ? "right-label" : "left-label"}`} 
                        data-fileid={index + 1} 
                        data-status={fileStatus[index]}>
                            {file.name} {/* Use actual file name instead of hard-coded "File 31" */}
                        </div>
                        <div className="file-content"
                        data-fileid={index + 1}
                        data-status={fileStatus[index]}
                        >
                            {file.content}
                        </div>
</div>
                    </div>
                );
            })}
        </div>
    );
};

export default DrawerCon;
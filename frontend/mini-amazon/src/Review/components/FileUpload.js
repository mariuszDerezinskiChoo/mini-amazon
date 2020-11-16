import React from "react";
import { Image } from 'semantic-ui-react';

function FileUpload() {
    const [file, setFile] = React.useState("");

    const ImageThumb = ({ image }) => {
        return <Image src={URL.createObjectURL(image)} alt={image.name} size='medium' />;
    };

    function handleUpload(event) {
        setFile(event.target.files[0]);

        // Add code here to upload file to server
        // ...
    }

    return (
        <div id="upload-box">
            <input type="file" onChange={handleUpload} />
            {file && <ImageThumb image={file} />}
        </div>
    );
}
export default FileUpload;
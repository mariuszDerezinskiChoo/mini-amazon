import React from "react";
import { Image } from 'semantic-ui-react';
import imgur from "imgur-file-upload";

imgur.setClientId('c7cbb16d550b502');

function FileUpload() {
    const [file, setFile] = React.useState("");

    const ImageThumb = ({ image }) => {
        return <Image src={URL.createObjectURL(image)} alt={image.name} size='medium' />;
    };

    async function handleUpload(event) {
        const test = event.target.files[0]
        setFile(event.target.files[0]);
        console.log(test)
        const formData = new FormData()
        formData.append('type', 'file')
        formData.append('image', test)

        imgur.uploadImgur(test).then((result) => {
            console.log(result);
          });

        // const response = await fetch('https://api.imgur.com/3/upload', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         Authorization: 'Client-ID c7cbb16d550b502'
        //     },
        //     body: formData
        // })
        // console.log(response)
    }

    return (
        <div id="upload-box">
            <input type="file" accept="image/*" onChange={handleUpload} />
            {file && <ImageThumb image={file} />}
        </div>
    );
}
export default FileUpload;
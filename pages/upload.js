import { useState } from 'react';
import { useS3Upload, getImageData } from 'next-s3-upload';
import Image from 'next/image';

export default function UploadTest() {
  let [imageUrl, setImageUrl] = useState();
  let [height, setHeight] = useState();
  let [width, setWidth] = useState();
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  let handleFileChange = async file => {
    let { url } = await uploadToS3(file);
    let { height, width } = await getImageData(file);
    setWidth(width);
    setHeight(height);
    setImageUrl(url);
  };

  return (
    <div>
      <FileInput onChange={handleFileChange} />

      <button onClick={openFileDialog}>Upload file</button>

      {imageUrl && (
        <div>
          <Image src={imageUrl} width={width} height={height} />
          <div>{imageUrl}</div>
          <div>
            {height}x{width}
          </div>
        </div>
      )}
    </div>
  );
}
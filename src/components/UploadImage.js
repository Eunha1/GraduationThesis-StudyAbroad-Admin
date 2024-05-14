import { useEffect, useState } from 'react';
import { DeleteIcon, UpLoadIcon } from '../asset/images/icons';

function UploadImage() {
  const [imageList, setImageList] = useState([]);
  const loadfile = (event) => {
    const fileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      console.log(event.target.files[i]);
      const url = URL.createObjectURL(event.target.files[i]);
      setImageList([...imageList, { id: i, url: url }]);
      URL.revokeObjectURL(event.target.files[i]);
    }
    event.preventDefault();
  };
  const dropHandler = (event) => {
    const fileList = event.dataTransfer.files;
    for (let i = 0; i < fileList.length; i++) {
      const url = URL.createObjectURL(event.dataTransfer.files[i]);
      console.log(event.dataTransfer.files[i]);
      setImageList([...imageList, { id: i, url: url }]);
      URL.revokeObjectURL(event.dataTransfer.files[i]);
    }
    event.preventDefault();
  };
  const dragOverHandler = (event) => {
    event.preventDefault();
  };
  const dragEnterHandler = (event) => {
    event.preventDefault();
  };
  const dragLeaveHandler = (event) => {
    event.preventDefault();
  };
  const deleteImageHandler = (index) => {};
  return (
    <div>
      <div
        className="bg-[#F1F2F5] shadow-md rounded-lg border-gray-200 w-[300px] h-auto flex flex-col items-center p-4"
        onDrop={(event) => dropHandler(event)}
        onDragOver={(event) => dragOverHandler(event)}
        onDragEnter={(event) => dragEnterHandler(event)}
        onDragLeave={(event) => dragLeaveHandler(event)}
      >
        <label
          htmlFor="upload-file"
          className="cursor-pointer w-full h-[100px] m-2"
        >
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg w-full h-full flex flex-col items-center justify-center">
            <div className="p-2 mb-2">
              <UpLoadIcon />
            </div>
            <div>Drop file here or click to upload</div>
            <input
              type="file"
              multiple
              id="upload-file"
              className="absolute z-[-1] opacity-0"
              onChange={(event) => loadfile(event)}
            />
          </div>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg w-full min-h- h-auto m-2 grid grid-cols-8 items-center">
          {imageList.map((item, index) => (
            <div
              key={index}
              className="relative h-[50px] w-[50px] m-2 cursor-pointer"
            >
              <img
                src={item.url}
                id="preview-image"
                alt=""
                className="h-full w-full object-cover rounded"
              />
              <div className="absolute top-0 h-full w-full rounded hover:bg-black_01">
                <div
                  className="absolute bottom-0 right-0 hover:bg-black rounded"
                  onClick={() => deleteImageHandler(index)}
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UploadImage;

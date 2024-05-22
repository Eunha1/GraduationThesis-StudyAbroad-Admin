import { useEffect, useState } from 'react';
import { ImageDrop } from '../asset/images/icons';
import { Modal, Fade } from '@mui/material';
import {
  extractExtension,
  extractExtensionFromURL,
  extractOriginalFilename,
} from '../utils/Convert';
function UpdateImage({ title, onImageUpload, labelName, listImages }) {
  const [imageList, setImageList] = useState([...listImages]);
  const [open, setOpen] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const handleImage = (event) => {
    if (event.target.files[0] !== undefined) {
      setImageList([...imageList, { file: event.target.files[0] }]);
      onImageUpload([...imageList, { file: event.target.files[0] }]);
    }
  };
  const handleDropImage = (index) => {
    const newImageList = [...imageList];
    newImageList.splice(index, 1);
    setImageList(newImageList);
  };
  const handleView = (item) => {
    let url;
    if (item.file) {
      url = URL.createObjectURL(item.file);
    } else {
      url = item;
    }
    setImageURL(url);
    setOpen(true);
  };
  useEffect(() => {
    onImageUpload(listImages);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="col-span-1 grid grid-cols-6">
        <label className="mr-5 font-medium mt-5 col-span-2 font-Inter">
          {title}
        </label>
        <div className="flex my-5 col-span-3">
          <div className="w-[80px] h-[30px]">
            <label htmlFor={labelName} className="cursor-pointer">
              <div className="relative ">
                <div className="py-[1px] px-1 border-[1px] border-gray-500 text-center rounded text-white bg-blue-600 hover:bg-blue-700">
                  Chọn tệp
                </div>
                <input
                  type="file"
                  id={labelName}
                  multiple
                  onChange={(event) => handleImage(event)}
                  className="absolute z-[-1] opacity-0"
                />
              </div>
            </label>
          </div>
          <div className="ml-[30px]">
            {[...imageList].length > 0 ? (
              [...imageList].map((item, index) => (
                <div key={index}>
                  {item.file?.name ? (
                    <div className="flex">
                      <div className="h-[30px] min-w-[300px] border-[1px] border-gray-800 rounded  mb-4 mr-4 cursor-pointer bg-[#E9F0FF]">
                        <div
                          className="text-black font-Roboto font-medium text-[14px] flex items-center px-2 h-full uppercase"
                          onClick={() => handleView(item)}
                        >
                          <div className="h-[20px] w-[50px] bg-blue-600 border-[1px] text-white text-sm rounded text-center">
                            {extractExtension(item.file.name)}
                          </div>
                          <p className="ml-[20px]">{item.file.name}</p>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleDropImage(index)}
                      >
                        <ImageDrop />
                      </div>
                    </div>
                  ) : (
                    <div className="flex">
                      <div className="h-[30px] min-w-[300px] border-[1px] border-gray-800 rounded  mb-4 mr-4 cursor-pointer bg-[#E9F0FF]">
                        <div
                          className="text-black font-Roboto font-medium text-[14px] flex items-center px-2 h-full uppercase"
                          onClick={() => handleView(item)}
                        >
                          <div className="h-[20px] w-[50px] bg-blue-600 border-[1px] text-white text-sm rounded text-center">
                            {extractExtensionFromURL(item)}
                          </div>
                          <p className="ml-[20px]">
                            {extractOriginalFilename(item)}
                          </p>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleDropImage(index)}
                      >
                        <ImageDrop />
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-red-500">Please choose your image</div>
            )}
          </div>
        </div>
      </div>
      <div>
        <Modal
          className="flex items-center justify-center"
          open={open}
          onClose={() => setOpen(false)}
        >
          <Fade in={open} timeout={500} className="outline-none">
            {/* eslint-disable-next-line */}
            <img src={imageURL} alt="image" />
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default UpdateImage;

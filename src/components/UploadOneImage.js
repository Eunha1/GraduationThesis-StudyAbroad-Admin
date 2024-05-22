import { useState } from 'react';
import { ImageDrop } from '../asset/images/icons';
import { Modal, Fade } from '@mui/material';
import { extractExtension } from '../utils/Convert';

function UploadOneImage({ title, onImageUpload, labelName }) {
  const [image, setImage] = useState();
  const [open, setOpen] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const handleImage = (event) => {
    if (event.target.files[0] !== undefined) {
      setImage(event.target.files[0]);
      onImageUpload(event.target.files[0]);
    }
  };
  const handleDropImage = () => {
    setImage();
  };
  const handleView = (item) => {
    const url = URL.createObjectURL(item);
    setImageURL(url);
    setOpen(true);
  };
  return (
    <div>
      <div className="col-span-1 grid grid-cols-8">
        <label className="mr-5 mt-5 col-span-1 font-Inter">{title}</label>
        <div className="flex my-3 col-span-7 ">
          <div className="w-[80px] h-[30px]">
            <label htmlFor={labelName} className="cursor-pointer">
              <div className="relative ">
                <div className="py-[1px] px-1 border-[1px] border-gray-500 text-center rounded text-white bg-blue-600 hover:bg-blue-700">
                  Chọn tệp
                </div>
                <input
                  type="file"
                  id={labelName}
                  onChange={(event) => handleImage(event)}
                  className="absolute z-[-1] opacity-0"
                />
              </div>
            </label>
          </div>
          <div className="ml-[30px]">
            {image ? (
              <div>
                {image?.name ? (
                  <div className="flex">
                    <div className="h-[30px] min-w-[300px] border-[1px] border-gray-800 rounded  mb-4 mr-4 cursor-pointer bg-[#E9F0FF]">
                      <div
                        className="text-black font-Roboto font-medium text-[14px] flex items-center px-2 h-full uppercase"
                        onClick={() => handleView(image)}
                      >
                        <div className="h-[20px] w-[50px] bg-blue-600 border-[1px] text-white text-sm rounded text-center">
                          {extractExtension(image.name)}
                        </div>
                        <p className="ml-[20px]">{image.name}</p>
                      </div>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleDropImage()}
                    >
                      <ImageDrop />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
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

export default UploadOneImage;

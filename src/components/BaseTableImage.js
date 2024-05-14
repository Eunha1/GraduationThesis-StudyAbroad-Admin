import { Fade, Modal, Tooltip } from '@mui/material';
import { DownloadImage, ImageView } from '../asset/images/icons';
import {
  extractFilename,
  extractOriginalFilename,
  extractTimestampAndConvertToDate,
} from '../utils/Convert';
import { useState } from 'react';

function BaseTableImage({ headers, imageList }) {
  const [open, setOpen] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const handleDownload = async (imageURL) => {
    const imageName = extractFilename(imageURL);
    const options = {
      suggestedName: imageName,
      types: [
        {
          description: 'Images',
          accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
        },
      ],
    };
    try {
      const fileHandle = await window.showSaveFilePicker(options);
      const writable = await fileHandle.createWritable();
      const response = await fetch(imageURL);
      await response.body.pipeTo(writable);
    } catch (error) {
      return;
    }
  };
  const handleView = (image) => {
    setImageURL(image);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <table className="table-auto w-full overflow-x-scroll divide-y divide-dashed divide-gray-400">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="text-[16px] font-Roboto text-[#616161] p-2 "
            >
              <div className="uppercase">{header.title}</div>
            </th>
          ))}
        </tr>
      </thead>
      {imageList?.length > 0 ? (
        <tbody className="divide-y divide-dashed divide-gray-200">
          {imageList.map((item, index) => (
            <tr key={index}>
              <td className="p-1 text-[14px] text-[#545556] font-Roboto tracking-wide text-left w-[150px]">
                <div className="uppercase ml-[20px]">{item.name}</div>
              </td>
              <td>
                {item?.images.map((image, index) => (
                  <div key={index} className="grid grid-cols-5 px-5 py-2">
                    <div className="p-1 col-span-1 flex justify-center">
                      <div className="h-[50px] w-[50px]  border-gray-800 border-[1px]">
                        {/* eslint-disable-next-line */}
                        <img
                          src={image}
                          alt="image"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="ml-[10px] col-span-3">
                      <div className="font-bold text-[16px] font-Roboto">
                        <span>Image : </span>
                        {extractOriginalFilename(image)}
                      </div>
                      <div className="font-Roboto italic text-[16px]">
                        <span>Time updated : </span>
                        {extractTimestampAndConvertToDate(image)}
                      </div>
                    </div>
                    <div className="col-span-1 mt-3 cursor-pointer flex">
                      <Tooltip title="Download" placement="bottom">
                        <div
                          className="w-[30px] h-[30px]"
                          onClick={() => handleDownload(image)}
                        >
                          <DownloadImage />
                        </div>
                      </Tooltip>
                      <Tooltip title="View" placement="right">
                        <div
                          className="w-[30px] h-[30px] ml-3"
                          onClick={() => handleView(image)}
                        >
                          <ImageView />
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                ))}
                <div>
                  <Modal
                    className="flex items-center justify-center"
                    open={open}
                    onClose={handleClose}
                  >
                    <Fade in={open} timeout={500} className="outline-none">
                      {/* eslint-disable-next-line */}
                      <img src={imageURL} alt="image" />
                    </Fade>
                  </Modal>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td className="text-center p-4 font-Roboto text-[16px] tracking-wide">
              Không có dữ liệu trong bảng !!!
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
}

export default BaseTableImage;

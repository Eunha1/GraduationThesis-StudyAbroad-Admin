import { Box, MenuItem, TextField } from '@mui/material';
import Breadcrumb from '../../../components/Breadcrumb';
import Content from '../../../components/Content';
import { useState } from 'react';
import { ImageDrop } from '../../../asset/images/icons';
import { Fade, Modal } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { postRequest } from '../../../services/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function UploadOfferLetterFile() {
  const [certificate, setCertificate] = useState([]);
  const [transcript, setTranscript] = useState([]);
  const [citizenIdentificationCard, setCitizenIdentificationCard] = useState(
    [],
  );
  const [englishCertificate, setEnglishCertificate] = useState([]);
  const [motivationLetter, setMotivationLetter] = useState([]);
  const [imageURL, setImageURL] = useState('');
  const [open, setOpen] = useState(false);
  const title = 'Thêm hồ sơ thư mời';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/offer-letter-file',
      title: 'Hồ sơ thư mời',
    },
    {
      isCurrentPage: true,
      src: '/offer-letter/upload',
      title: 'Thêm mới hồ sơ',
    },
  ];
  const validationSchema = yup.object({
    phone: yup.string('Enter your phone').required('Phone is required'),
    school: yup.string('Enter school name').required('School is required'),
  });
  const handleCertificate = (event) => {
    setCertificate([...certificate, { file: event.target.files[0] }]);
  };
  const handleTranscript = (event) => {
    setTranscript([...transcript, { file: event.target.files[0] }]);
  };
  const handleCCCD = (event) => {
    setCitizenIdentificationCard([
      ...citizenIdentificationCard,
      { file: event.target.files[0] },
    ]);
  };
  const handleEnglishCertificate = (event) => {
    setEnglishCertificate([
      ...englishCertificate,
      { file: event.target.files[0] },
    ]);
  };
  const handleMotivationLetter = (event) => {
    setMotivationLetter([...motivationLetter, { file: event.target.files[0] }]);
  };
  const handleDropCertficate = (index, [...listImage]) => {
    const newCertificate = [...listImage];
    newCertificate.splice(index, 1);
    setCertificate(newCertificate);
  };
  const handleDropTranscript = (index, [...listImage]) => {
    const newTranscript = [...listImage];
    newTranscript.splice(index, 1);
    setTranscript(newTranscript);
  };
  const handleDropCCCD = (index, [...listImage]) => {
    const newCCCD = [...listImage];
    newCCCD.splice(index, 1);
    setCitizenIdentificationCard(newCCCD);
  };
  const handleDropEnglishCertificate = (index, [...listImage]) => {
    const newEnglishCertificate = [...listImage];
    newEnglishCertificate.splice(index, 1);
    setEnglishCertificate(newEnglishCertificate);
  };
  const handleDropMotivationLetter = (index, [...listImage]) => {
    const newMotivationLetter = [...listImage];
    newMotivationLetter.splice(index, 1);
    setMotivationLetter(newMotivationLetter);
  };
  const handleView = (file) => {
    const url = URL.createObjectURL(file.file);
    setImageURL(url);
    setOpen(true);
  };
  const navigate = useNavigate();
  const listStatus = [
    { id: 0, status: 'Chưa đủ hồ sơ' },
    { id: 1, status: 'Đã đủ hồ sơ' },
    { id: 2, status: 'Đã xin gửi thư mời' },
    { id: 3, status: 'Đã có thư mời' },
  ];
  const formik = useFormik({
    initialValues: {
      phone: '',
      school: '',
      status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values.status);
      const formData = new FormData();
      formData.append('customer_phone', values.phone);
      formData.append('school_name', values.school);
      formData.append('status', values.status);
      certificate.forEach((element) => {
        formData.append(`certificate`, element.file);
      });
      transcript.forEach((element) => {
        formData.append(`transcript`, element.file);
      });
      citizenIdentificationCard.forEach((element) => {
        formData.append(`citizen_identification_card`, element.file);
      });
      englishCertificate.forEach((element) => {
        formData.append(`ielts_certificate`, element.file);
      });
      motivationLetter.forEach((element) => {
        formData.append(`motivation_letter`, element.file);
      });

      const data = await postRequest(
        '/api/file/upload/offer-letter-file',
        formData,
      );
      if (data.status === 1) {
        toast.success(data.message);
        navigate('/offer-letter-file');
      } else {
        toast.error(data.message);
      }
    },
  });
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-3">
            <div className="flex items-center my-5 col-span-1">
              <label htmlFor="phone" className="mr-3">
                Số điện thoại
              </label>
              <TextField
                type="text"
                name="phone"
                variant="outlined"
                label="Enter phone"
                placeholder="Enter customer phone"
                size="small"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </div>
            <div className="flex items-center my-5 col-span-1">
              <label htmlFor="school" className="mr-3">
                Trường gửi hồ sơ
              </label>
              <TextField
                type="text"
                name="school"
                variant="outlined"
                label="Enter school"
                placeholder="Enter school name"
                size="small"
                value={formik.values.school}
                onChange={formik.handleChange}
                error={formik.touched.school && Boolean(formik.errors.school)}
                helperText={formik.touched.school && formik.errors.school}
              />
            </div>
            <div className="flex items-center my-5 col-span-1">
              <label htmlFor="status" className="mr-3">
                Status
              </label>
              <TextField
                select
                fullWidth
                placeholder="Choose status"
                size="small"
                value={formik.values.id}
                onChange={(event) =>
                  formik.setFieldValue('status', event.target.value)
                }
              >
                {listStatus.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.status}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="col-span-1 grid grid-cols-6">
              <label className="mr-5 font-bold mt-5 col-span-2">
                Bằng tốt nghiệp
              </label>
              <div className="flex my-5 col-span-3">
                <div className="w-[80px]">
                  <label htmlFor="certificate" className="cursor-pointer">
                    <div className="relative ">
                      <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                        Chọn tệp
                      </div>
                      <input
                        type="file"
                        id="certificate"
                        accept="image/*"
                        multiple
                        onChange={(event) => handleCertificate(event)}
                        className="absolute z-[-1] opacity-0"
                      />
                    </div>
                  </label>
                </div>
                <div className="ml-[30px]">
                  {[...certificate].length > 0 ? (
                    [...certificate].map((item, index) => (
                      <div key={index}>
                        {item.file?.name ? (
                          <div className="flex">
                            <div className="h-[30px] w-[250px] border-[1px] border-gray-800 rounded shadow-xl shadow-gray-200 bg-gray-50 mb-4 mr-4 cursor-pointer">
                              <div
                                className="text-black font-Roboto text-[14px] italic flex items-center px-4 h-full"
                                onClick={() => handleView(item)}
                              >
                                {item.file.name}
                              </div>
                            </div>
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                handleDropCertficate(index, [...certificate])
                              }
                            >
                              <ImageDrop />
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-red-500">Please choose your image</div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-1 grid grid-cols-6">
              <label className="mr-5 font-bold mt-5 col-span-2">
                Bảng điểm
              </label>
              <div className="flex my-5 col-span-3">
                <div className="w-[80px]">
                  <label htmlFor="transcript" className="cursor-pointer">
                    <div className="relative ">
                      <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                        Chọn tệp
                      </div>
                      <input
                        type="file"
                        id="transcript"
                        accept="image/*"
                        multiple
                        onChange={(event) => handleTranscript(event)}
                        className="absolute z-[-1] opacity-0"
                      />
                    </div>
                  </label>
                </div>
                <div className="ml-[30px]">
                  {[...transcript].length > 0 ? (
                    [...transcript].map((item, index) => (
                      <div key={index}>
                        {item.file?.name ? (
                          <div className="flex">
                            <div className="h-[30px] w-[250px] border-[1px] border-gray-800 rounded shadow-xl shadow-gray-200 bg-gray-50 mb-4 mr-4 cursor-pointer">
                              <div
                                className="text-black font-Roboto text-[14px] italic flex items-center px-4 h-full"
                                onClick={() => handleView(item)}
                              >
                                {item.file.name}
                              </div>
                            </div>
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                handleDropTranscript(index, [...transcript])
                              }
                            >
                              <ImageDrop />
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-red-500">Please choose your image</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="col-span-1 grid grid-cols-6 ">
              <label className="mr-5 font-bold mt-5 col-span-2">
                Căn cước công dân
              </label>
              <div className="flex my-5 col-span-3">
                <div className="w-[80px]">
                  <label htmlFor="cccd" className="cursor-pointer">
                    <div className="relative ">
                      <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                        Chọn tệp
                      </div>
                      <input
                        type="file"
                        id="cccd"
                        accept="image/*"
                        multiple
                        onChange={(event) => handleCCCD(event)}
                        className="absolute z-[-1] opacity-0"
                      />
                    </div>
                  </label>
                </div>
                <div className="ml-[30px]">
                  {[...citizenIdentificationCard].length > 0 ? (
                    [...citizenIdentificationCard].map((item, index) => (
                      <div key={index}>
                        {item.file?.name ? (
                          <div className="flex">
                            <div className="h-[30px] w-[250px] border-[1px] border-gray-800 rounded shadow-xl shadow-gray-200 bg-gray-50 mb-4 mr-4 cursor-pointer">
                              <div
                                className="text-black font-Roboto text-[14px] italic flex items-center px-4 h-full"
                                onClick={() => handleView(item)}
                              >
                                {item.file.name}
                              </div>
                            </div>
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                handleDropCCCD(index, [
                                  ...citizenIdentificationCard,
                                ])
                              }
                            >
                              <ImageDrop />
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-red-500">Please choose your image</div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-1 grid grid-cols-6">
              <label className="mr-5 font-bold mt-5 col-span-2">
                Chứng chỉ tiếng anh
              </label>
              <div className="flex my-5 col-span-3">
                <div className="w-[80px]">
                  <label
                    htmlFor="english-certificate"
                    className="cursor-pointer"
                  >
                    <div className="relative ">
                      <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                        Chọn tệp
                      </div>
                      <input
                        type="file"
                        id="english-certificate"
                        accept="image/*"
                        multiple
                        onChange={(event) => handleEnglishCertificate(event)}
                        className="absolute z-[-1] opacity-0"
                      />
                    </div>
                  </label>
                </div>
                <div className="ml-[30px]">
                  {[...englishCertificate].length > 0 ? (
                    [...englishCertificate].map((item, index) => (
                      <div key={index}>
                        {item.file?.name ? (
                          <div className="flex">
                            <div className="h-[30px] w-[250px] border-[1px] border-gray-800 rounded shadow-xl shadow-gray-200 bg-gray-50 mb-4 mr-4 cursor-pointer">
                              <div
                                className="text-black font-Roboto text-[14px] italic flex items-center px-4 h-full"
                                onClick={() => handleView(item)}
                              >
                                {item.file.name}
                              </div>
                            </div>
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                handleDropEnglishCertificate(index, [
                                  ...englishCertificate,
                                ])
                              }
                            >
                              <ImageDrop />
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-red-500">Please choose your image</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-6">
            <label className="mr-5 font-bold mt-5 col-span-1">
              Thư động lực
            </label>
            <div className="flex my-5 col-span-3">
              <div className="w-[80px]">
                <label htmlFor="motivation-letter" className="cursor-pointer">
                  <div className="relative ">
                    <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                      Chọn tệp
                    </div>
                    <input
                      type="file"
                      id="motivation-letter"
                      accept="image/*"
                      multiple
                      onChange={(event) => handleMotivationLetter(event)}
                      className="absolute z-[-1] opacity-0"
                    />
                  </div>
                </label>
              </div>
              <div className="ml-[30px]">
                {[...motivationLetter].length > 0 ? (
                  [...motivationLetter].map((item, index) => (
                    <div key={index}>
                      {item.file?.name ? (
                        <div className="flex">
                          <div className="h-[30px] w-[250px] border-[1px] border-gray-800 rounded shadow-xl shadow-gray-200 bg-gray-50 mb-4 mr-4 cursor-pointer">
                            <div
                              className="text-black font-Roboto text-[14px] italic flex items-center px-4 h-full"
                              onClick={() => handleView(item)}
                            >
                              {item.file.name}
                            </div>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() =>
                              handleDropMotivationLetter(index, [
                                ...motivationLetter,
                              ])
                            }
                          >
                            <ImageDrop />
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-red-500">Please choose your image</div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-6">
            <label htmlFor="note" className="font-bold col-span-1">
              Ghi chú
            </label>
            <div className="col-span-5">
              <TextField
                type="text"
                multiline
                rows={3}
                variant="outlined"
                size="small"
                fullWidth
                label="Ghi chú"
                placeholder="Enter note"
              />
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
          <div>
            <button
              className="border-[1px] border-gray-800 px-3 rounded-md"
              type="submit"
            >
              Save
            </button>
          </div>
        </Box>
      </Content>
    </div>
  );
}

export default UploadOfferLetterFile;

import Breadcrumb from '../../../components/Breadcrumb';
import Content from '../../../components/Content';
import { useState } from 'react';
import { ImageDrop } from '../../../asset/images/icons';
import { Fade, Modal } from '@mui/material';
import { Box, MenuItem, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { postRequest } from '../../../services/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function UploadVisaFile() {
  const [form, setForm] = useState([]);
  const [CoE, setCoE] = useState([]);
  const [birthCertificate, setBirthCertificate] = useState([]);
  const [passport, setPassport] = useState([]);
  const [citizenIdentificationCard, setCitizenIdentificationCard] = useState(
    [],
  );
  const [englishCertificate, setEnglishCertificate] = useState([]);
  const [offerLetter, setOfferLetter] = useState([]);
  const [permanentResidence, setPermanentResidence] = useState([]);
  const [financialRecords, setFinancialRecords] = useState([]);
  const [imageURL, setImageURL] = useState('');
  const [open, setOpen] = useState(false);
  const title = 'Thêm hồ sơ Visa';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/visa-file',
      title: 'Hồ sơ visa',
    },
    {
      isCurrentPage: true,
      src: '/visa-file/upload',
      title: 'Thêm mới hồ sơ',
    },
  ];
  const listStatus = [
    { id: 0, status: 'Chưa đủ hồ sơ' },
    { id: 1, status: 'Đã đủ hồ sơ' },
    { id: 2, status: 'Đã xin gửi thư mời' },
    { id: 3, status: 'Đã có thư mời' },
  ];
  const validationSchema = yup.object({
    phone: yup.string('Enter your phone').required('Phone is required'),
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      phone: '',
      status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('customer_phone', values.phone);
      formData.append('status', values.status);
      form.forEach((element) => {
        formData.append('form', element.file);
      });
      CoE.forEach((element) => {
        formData.append('CoE', element.file);
      });
      birthCertificate.forEach((element) => {
        formData.append('birth_certificate', element.file);
      });
      passport.forEach((element) => {
        formData.append('passport', element.file);
      });
      citizenIdentificationCard.forEach((element) => {
        formData.append('citizen_identification_card', element.file);
      });
      englishCertificate.forEach((element) => {
        formData.append('ielts_certificate', element.file);
      });
      offerLetter.forEach((element) => {
        formData.append('offer_letter', element.file);
      });
      permanentResidence.forEach((element) => {
        formData.append('permanent_residence', element.file);
      });
      financialRecords.forEach((element) => {
        formData.append('financial_records', element.file);
      });
      const data = await postRequest('/api/file/upload/visa-file', formData);
      if (data.status === 1) {
        toast.success(data.message);
        navigate('/visa-file');
      } else {
        toast.error(data.message);
      }
    },
  });
  const handleView = (file) => {
    const url = URL.createObjectURL(file.file);
    setImageURL(url);
    setOpen(true);
  };
  const handleForm = (event) => {
    setForm([...form, { file: event.target.files[0] }]);
  };
  const handleCoE = (event) => {
    setCoE([...CoE, { file: event.target.files[0] }]);
  };
  const handleBirthCertificate = (event) => {
    setBirthCertificate([...birthCertificate, { file: event.target.files[0] }]);
  };
  const handlePassport = (event) => {
    setPassport([...passport, { file: event.target.files[0] }]);
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
  const handleOfferLetter = (event) => {
    setOfferLetter([...offerLetter, { file: event.target.files[0] }]);
  };
  const handlePermanentResidence = (event) => {
    setPermanentResidence([
      ...permanentResidence,
      { file: event.target.files[0] },
    ]);
  };
  const handleFinancialRecords = (event) => {
    setFinancialRecords([...financialRecords, { file: event.target.files[0] }]);
  };
  const handleDropForm = (index) => {
    const newData = [...form];
    newData.splice(index, 1);
    setForm(newData);
  };
  const handleDropCoE = (index) => {
    const newData = [...CoE];
    newData.splice(index, 1);
    setCoE(newData);
  };
  const handleDropPassport = (index) => {
    const newData = [...passport];
    newData.splice(index, 1);
    setPassport(newData);
  };
  const handleDropBirthCertificate = (index) => {
    const newData = [...birthCertificate];
    newData.splice(index, 1);
    setBirthCertificate(newData);
  };
  const handleDropCCCD = (index) => {
    const newCCCD = [...citizenIdentificationCard];
    newCCCD.splice(index, 1);
    setCitizenIdentificationCard(newCCCD);
  };
  const handleDropEnglishCertificate = (index) => {
    const newData = [...englishCertificate];
    newData.splice(index, 1);
    setEnglishCertificate(newData);
  };
  const handleDropOfferLetter = (index) => {
    const newData = [...offerLetter];
    newData.splice(index, 1);
    setOfferLetter(newData);
  };
  const handleDropPermanentResidence = (index) => {
    const newData = [...permanentResidence];
    newData.splice(index, 1);
    setPermanentResidence(newData);
  };
  const handleDropFinacialRecords = (index) => {
    const newData = [...financialRecords];
    newData.splice(index, 1);
    setFinancialRecords(newData);
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2">
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
                Form khai
              </label>
              <div className="flex my-5 col-span-3">
                <div className="w-[80px]">
                  <label htmlFor="form" className="cursor-pointer">
                    <div className="relative ">
                      <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                        Chọn tệp
                      </div>
                      <input
                        type="file"
                        id="form"
                        accept="image/*"
                        multiple
                        onChange={(event) => handleForm(event)}
                        className="absolute z-[-1] opacity-0"
                      />
                    </div>
                  </label>
                </div>
                <div className="ml-[30px]">
                  {[...form].length > 0 ? (
                    [...form].map((item, index) => (
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
                              onClick={() => handleDropForm(index)}
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
              <label className="mr-5 font-bold mt-5 col-span-2">CoE</label>
              <div className="flex my-5 col-span-3">
                <div className="w-[80px]">
                  <label htmlFor="CoE" className="cursor-pointer">
                    <div className="relative ">
                      <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                        Chọn tệp
                      </div>
                      <input
                        type="file"
                        id="CoE"
                        accept="image/*"
                        multiple
                        onChange={(event) => handleCoE(event)}
                        className="absolute z-[-1] opacity-0"
                      />
                    </div>
                  </label>
                </div>
                <div className="ml-[30px]">
                  {[...CoE].length > 0 ? (
                    [...CoE].map((item, index) => (
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
                              onClick={() => handleDropCoE(index)}
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
                Giấy khai sinh
              </label>
              <div className="flex my-5 col-span-3">
                <div className="w-[80px]">
                  <label htmlFor="birthCertificate" className="cursor-pointer">
                    <div className="relative ">
                      <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                        Chọn tệp
                      </div>
                      <input
                        type="file"
                        id="birthCertificate"
                        accept="image/*"
                        multiple
                        onChange={(event) => handleBirthCertificate(event)}
                        className="absolute z-[-1] opacity-0"
                      />
                    </div>
                  </label>
                </div>
                <div className="ml-[30px]">
                  {[...birthCertificate].length > 0 ? (
                    [...birthCertificate].map((item, index) => (
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
                              onClick={() => handleDropBirthCertificate(index)}
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
              <label className="mr-5 font-bold mt-5 col-span-2">Hộ chiếu</label>
              <div className="flex my-5 col-span-3">
                <div className="w-[80px]">
                  <label htmlFor="passport" className="cursor-pointer">
                    <div className="relative ">
                      <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                        Chọn tệp
                      </div>
                      <input
                        type="file"
                        id="passport"
                        accept="image/*"
                        multiple
                        onChange={(event) => handlePassport(event)}
                        className="absolute z-[-1] opacity-0"
                      />
                    </div>
                  </label>
                </div>
                <div className="ml-[30px]">
                  {[...passport].length > 0 ? (
                    [...passport].map((item, index) => (
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
                              onClick={() => handleDropPassport(index)}
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
                Căn cước công dân
              </label>
              <div className="flex my-5 col-span-3">
                <div className="w-[80px]">
                  <label htmlFor="CCCD" className="cursor-pointer">
                    <div className="relative ">
                      <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                        Chọn tệp
                      </div>
                      <input
                        type="file"
                        id="CCCD"
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
                              onClick={() => handleDropCCCD(index)}
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
                  <label htmlFor="ielts" className="cursor-pointer">
                    <div className="relative ">
                      <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                        Chọn tệp
                      </div>
                      <input
                        type="file"
                        id="ielts"
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
                                handleDropEnglishCertificate(index)
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
              <label className="mr-5 font-bold mt-5 col-span-2">Thư mời</label>
              <div className="flex my-5 col-span-3">
                <div className="w-[80px]">
                  <label htmlFor="offer-letter" className="cursor-pointer">
                    <div className="relative ">
                      <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                        Chọn tệp
                      </div>
                      <input
                        type="file"
                        id="offer-letter"
                        accept="image/*"
                        multiple
                        onChange={(event) => handleOfferLetter(event)}
                        className="absolute z-[-1] opacity-0"
                      />
                    </div>
                  </label>
                </div>
                <div className="ml-[30px]">
                  {[...offerLetter].length > 0 ? (
                    [...offerLetter].map((item, index) => (
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
                              onClick={() => handleDropOfferLetter(index)}
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
                Hộ khẩu thường trú
              </label>
              <div className="flex my-5 col-span-3">
                <div className="w-[80px]">
                  <label
                    htmlFor="permanentResidence"
                    className="cursor-pointer"
                  >
                    <div className="relative ">
                      <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                        Chọn tệp
                      </div>
                      <input
                        type="file"
                        id="permanentResidence"
                        accept="image/*"
                        multiple
                        onChange={(event) => handlePermanentResidence(event)}
                        className="absolute z-[-1] opacity-0"
                      />
                    </div>
                  </label>
                </div>
                <div className="ml-[30px]">
                  {[...permanentResidence].length > 0 ? (
                    [...permanentResidence].map((item, index) => (
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
                                handleDropPermanentResidence(index)
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
                Hồ sơ tài chính
              </label>
              <div className="flex my-5 col-span-3">
                <div className="w-[80px]">
                  <label htmlFor="financialRecords" className="cursor-pointer">
                    <div className="relative ">
                      <div className="py-[1px] px-1 border-[0.5px] border-gray-500 text-center rounded-md">
                        Chọn tệp
                      </div>
                      <input
                        type="file"
                        id="financialRecords"
                        accept="image/*"
                        multiple
                        onChange={(event) => handleFinancialRecords(event)}
                        className="absolute z-[-1] opacity-0"
                      />
                    </div>
                  </label>
                </div>
                <div className="ml-[30px]">
                  {[...financialRecords].length > 0 ? (
                    [...financialRecords].map((item, index) => (
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
                              onClick={() => handleDropFinacialRecords(index)}
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

export default UploadVisaFile;

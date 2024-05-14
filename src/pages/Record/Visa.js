import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { Box, TextField } from '@mui/material';
import { Fade, Modal } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { ImageDrop } from '../../asset/images/icons';
import { postRequest } from '../../services/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function VisaRecord() {
  const [visa, setVisa] = useState([]);
  const [imageURL, setImageURL] = useState('');
  const [open, setOpen] = useState(false);
  const title = 'Thêm Visa';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/record/visa',
      title: 'Visa',
    },
    {
      isCurrentPage: true,
      src: '/record/visa/upload',
      title: 'Thêm visa',
    },
  ];
  const handleView = (file) => {
    const url = URL.createObjectURL(file.file);
    setImageURL(url);
    setOpen(true);
  };
  const navigate = useNavigate();
  const validationSchema = yup.object({
    phone: yup.string('Enter your phone').required('Phone is required'),
    country: yup.string('Enter country').required('Country is required'),
  });
  const formik = useFormik({
    initialValues: {
      phone: '',
      country: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('customer_phone', values.phone);
      formData.append('country', values.country);
      visa.forEach((element) => {
        formData.append(`visa`, element.file);
      });
      const data = await postRequest(`/api/file/upload/visa`, formData);
      if (data.status === 1) {
        toast.success(data.message);
        navigate('/record/visa');
      } else {
        toast.error(data.error);
      }
    },
  });
  const handleVisa = (event) => {
    setVisa([...visa, { file: event.target.files[0] }]);
  };
  const handleDropVisa = (index) => {
    const newData = [...visa];
    newData.splice(index, 1);
    setVisa(newData);
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
              <label htmlFor="phone" className="mr-3">
                Quốc gia
              </label>
              <TextField
                type="text"
                name="country"
                variant="outlined"
                label="Enter country"
                placeholder="Enter customer country"
                size="small"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-6">
            <label className="mr-5 font-bold mt-5 col-span-2">Visa</label>
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
                      onChange={(event) => handleVisa(event)}
                      className="absolute z-[-1] opacity-0"
                    />
                  </div>
                </label>
              </div>
              <div className="ml-[30px]">
                {[...visa].length > 0 ? (
                  [...visa].map((item, index) => (
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
                            onClick={() => handleDropVisa(index)}
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

export default VisaRecord;

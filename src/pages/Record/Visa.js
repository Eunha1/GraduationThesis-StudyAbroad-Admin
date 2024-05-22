import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { Box, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import UploadImage from '../../components/UploadImage';
import { postRequest } from '../../services/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function VisaRecord() {
  const [visa, setVisa] = useState([]);
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
  const handleCancel = () => {
    navigate('/record/visa');
  };
  const handleVisa = (newImageList) => {
    setVisa(newImageList);
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
          <UploadImage title="visa" onImageUpload={handleVisa} />
          <div className="border-t border-gray-700 mt-[50px]">
            <div className="mt-8 flex justify-end items-center">
              <button
                className=" font-medium rounded-lg text-lg px-2 py-1 w-[70px] text-center border-[1px] border-gray-900 mr-5"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className=" text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-lg px-3 py-1 w-[70px] text-center"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </Box>
      </Content>
    </div>
  );
}

export default VisaRecord;

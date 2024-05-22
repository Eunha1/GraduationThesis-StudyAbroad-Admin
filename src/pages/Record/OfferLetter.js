import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { Box, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { postRequest } from '../../services/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UploadImage from '../../components/UploadImage';
function OfferLetterRecord() {
  const [offerLetter, setOfferLetter] = useState([]);
  const title = 'Thêm thư mời';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/record/offer-letter',
      title: 'Thư mời',
    },
    {
      isCurrentPage: true,
      src: '/record/offer-letter/upload',
      title: 'Upload thư mời',
    },
  ];
  const validationSchema = yup.object({
    phone: yup.string('Enter your phone').required('Phone is required'),
    school: yup.string('Enter school name').required('School is required'),
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      phone: '',
      school: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('customer_phone', values.phone);
      formData.append('school_name', values.school);
      offerLetter.forEach((element) => {
        formData.append(`offer_letter`, element.file);
      });
      const data = await postRequest(`/api/file/upload/offer-letter`, formData);
      if (data.status === 1) {
        toast.success(data.message);
        navigate('/record/offer-letter');
      } else {
        toast.error(data.message);
      }
    },
  });
  const handleOfferLetter = (newImageList) => {
    setOfferLetter(newImageList);
  };
  const handleCancel = () => {
    navigate('/record/offer-letter');
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
              <label htmlFor="School" className="mr-3">
                Trường theo học
              </label>
              <TextField
                type="text"
                name="school"
                variant="outlined"
                label="Enter scho0l"
                placeholder="Enter school name"
                size="small"
                value={formik.values.school}
                onChange={formik.handleChange}
                error={formik.touched.school && Boolean(formik.errors.school)}
                helperText={formik.touched.school && formik.errors.school}
              />
            </div>
          </div>
          <UploadImage title="Thư mời" onImageUpload={handleOfferLetter} />
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

export default OfferLetterRecord;

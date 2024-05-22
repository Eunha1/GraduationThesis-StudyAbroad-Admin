import { Box, MenuItem, TextField } from '@mui/material';
import Breadcrumb from '../../../components/Breadcrumb';
import Content from '../../../components/Content';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { postRequest } from '../../../services/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UploadImage from '../../../components/UploadImage';
function UploadOfferLetterFile() {
  const [certificate, setCertificate] = useState([]);
  const [transcript, setTranscript] = useState([]);
  const [citizenIdentificationCard, setCitizenIdentificationCard] = useState(
    [],
  );
  const [englishCertificate, setEnglishCertificate] = useState([]);
  const [motivationLetter, setMotivationLetter] = useState([]);
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
    country: yup.string('Enter country').required('Enter country'),
    status: yup.string('Choose status').required('Status is required'),
  });
  const handleCertificate = (newImageList) => {
    setCertificate(newImageList);
  };
  const handleTranscript = (newImageList) => {
    setTranscript(newImageList);
  };
  const handleCCCD = (newImageList) => {
    setCitizenIdentificationCard(newImageList);
  };
  const handleEnglishCertificate = (newImageList) => {
    setEnglishCertificate(newImageList);
  };
  const handleMotivationLetter = (newImageList) => {
    setMotivationLetter(newImageList);
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
      country: '',
      status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('customer_phone', values.phone);
      formData.append('school_name', values.school);
      formData.append('status', values.status);
      formData.append('country', values.country);
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
  const handleCancel = () => {
    navigate('/offer-letter-file');
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-4 gap-[30px]">
            <div className="flex flex-col my-5 col-span-1">
              <label htmlFor="phone" className="mb-2">
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
            <div className="flex flex-col my-5 col-span-1">
              <label htmlFor="school" className="mb-2">
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
            <div className="flex flex-col my-5 col-span-1">
              <label htmlFor="country" className="mb-2">
                Quốc gia
              </label>
              <TextField
                type="text"
                name="country"
                variant="outlined"
                label="Enter country"
                placeholder="Enter country"
                size="small"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </div>
            <div className="flex flex-col my-5 col-span-1">
              <label htmlFor="status" className="mb-2">
                Status
              </label>
              <TextField
                select
                fullWidth
                placeholder="Choose status"
                size="small"
                value={formik.values.status}
                onChange={(event) =>
                  formik.setFieldValue('status', event.target.value)
                }
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              >
                {listStatus.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.status}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <UploadImage
            title="Bằng tốt nghiệp"
            onImageUpload={handleCertificate}
            labelName="certificate"
          />
          <UploadImage
            title="Bảng điểm"
            onImageUpload={handleTranscript}
            labelName="transcript"
          />
          <UploadImage
            title="Căn cước công dân"
            onImageUpload={handleCCCD}
            labelName="CCCD"
          />
          <UploadImage
            title="Chứng chỉ tiếng anh"
            onImageUpload={handleEnglishCertificate}
            labelName="EnglisdCertificate"
          />
          <UploadImage
            title="Thư động lực"
            onImageUpload={handleMotivationLetter}
            labelName="motivationLetter"
          />
          <div className="mt-5 grid grid-cols-6">
            <label htmlFor="note" className="font-medium font-Inter col-span-1">
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

export default UploadOfferLetterFile;

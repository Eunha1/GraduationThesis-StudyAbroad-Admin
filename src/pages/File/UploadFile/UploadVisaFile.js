import Breadcrumb from '../../../components/Breadcrumb';
import Content from '../../../components/Content';
import { useState } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { postRequest } from '../../../services/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UploadImage from '../../../components/UploadImage';
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
    { id: 2, status: 'Đã xin visa' },
    { id: 3, status: 'Đã có visa' },
    { id: 4, status: 'Trượt visa'}
  ];
  const validationSchema = yup.object({
    phone: yup.string('Enter your phone').required('Phone is required'),
    status: yup.string('Choose status').required('Status is required'),
    country: yup.string('Enter country').required('Country is required'),
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      phone: '',
      status: '',
      country: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('customer_phone', values.phone);
      formData.append('status', values.status);
      formData.append('country', values.country);
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
  const handleForm = (newImageList) => {
    setForm(newImageList);
  };
  const handleCoE = (newImageList) => {
    setCoE(newImageList);
  };
  const handleBirthCertificate = (newImageList) => {
    setBirthCertificate(newImageList);
  };
  const handlePassport = (newImageList) => {
    setPassport(newImageList);
  };
  const handleCCCD = (newImageList) => {
    setCitizenIdentificationCard(newImageList);
  };
  const handleEnglishCertificate = (newImageList) => {
    setEnglishCertificate(newImageList);
  };
  const handleOfferLetter = (newImageList) => {
    setOfferLetter(newImageList);
  };
  const handlePermanentResidence = (newImageList) => {
    setPermanentResidence(newImageList);
  };
  const handleFinancialRecords = (newImageList) => {
    setFinancialRecords(newImageList);
  };
  const handleCancel = () => {
    navigate('/visa-file');
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-3 gap-[50px]">
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
            title="Form khai"
            onImageUpload={handleForm}
            labelName="form"
          />
          <UploadImage title="CoE" onImageUpload={handleCoE} labelName="CoE" />
          <UploadImage
            title="Giấy khai sinh"
            onImageUpload={handleBirthCertificate}
            labelName="birthCertificate"
          />
          <UploadImage
            title="Hộ chiếu"
            onImageUpload={handlePassport}
            labelName="passport"
          />
          <UploadImage
            title="Căn cước công dân"
            onImageUpload={handleCCCD}
            labelName="CCCD"
          />
          <UploadImage
            title="Chứng chỉ tiếng anh"
            onImageUpload={handleEnglishCertificate}
            labelName="EnglishCertificate"
          />
          <UploadImage
            title="Thư mời"
            onImageUpload={handleOfferLetter}
            labelName="offerLetter"
          />
          <UploadImage
            title="Hộ khẩu thường trú"
            onImageUpload={handlePermanentResidence}
            labelName="PermanentResidence"
          />
          <UploadImage
            title="Hồ sơ tài chính"
            onImageUpload={handleFinancialRecords}
            labelName="FinancialRecords"
          />
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

export default UploadVisaFile;

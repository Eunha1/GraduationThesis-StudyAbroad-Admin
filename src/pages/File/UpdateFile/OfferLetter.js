import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';
import Content from '../../../components/Content';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../../services/Api';
import UpdateImage from '../../../components/UpdateImage';
import { Box, TextField, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { extractPathNameFromURL } from '../../../utils/Convert';
import { toast } from 'react-toastify';
function UpdateOfferLetterFile() {
  const { file_id } = useParams();
  const [data, setData] = useState();
  const [certificate, setCertificate] = useState([]);
  const [transcript, setTranscript] = useState([]);
  const [citizenIdentificationCard, setCitizenIdentificationCard] = useState(
    [],
  );
  const [englishCertificate, setEnglishCertificate] = useState([]);
  const [motivationLetter, setMotivationLetter] = useState([]);
  const title = 'Chỉnh sửa hồ sơ';
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
      src: `/offer-letter/update-file/${file_id}`,
      title: 'Chỉnh sửa hồ sơ',
    },
  ];
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
  const validationSchema = yup.object({
    school: yup.string('Enter school name').required('School is required'),
    country: yup.string('Enter country name').required('Country is required'),
    status: yup.string('Choose status').required('Status is required'),
  });
  const formik = useFormik({
    initialValues: {
      school: '',
      country: '',
      status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('school', values.school);
      formData.append('country', values.country);
      formData.append('status', values.status);
      certificate.forEach((element) => {
        if (element.file) {
          formData.append('certificate', element.file);
        } else {
          formData.append('certificate', extractPathNameFromURL(element));
        }
      });
      transcript.forEach((element) => {
        if (element.file) {
          formData.append('transcript', element.file);
        } else {
          formData.append('transcript', extractPathNameFromURL(element));
        }
      });
      citizenIdentificationCard.forEach((element) => {
        if (element.file) {
          formData.append(`citizen_identification_card`, element.file);
        } else {
          formData.append(
            'citizen_identification_card',
            extractPathNameFromURL(element),
          );
        }
      });
      englishCertificate.forEach((element) => {
        if (element.file) {
          formData.append('ielts_certificate', element.file);
        } else {
          formData.append('ielts_certificate', extractPathNameFromURL(element));
        }
      });
      motivationLetter.forEach((element) => {
        if (element.file) {
          formData.append('motivation_letter', element.file);
        } else {
          formData.append('motivation_letter', extractPathNameFromURL(element));
        }
      });
      const data = await postRequest(
        `/api/file/update/offer-letter/${file_id}`,
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
  const listStatus = [
    { id: 0, status: 'Chưa đủ hồ sơ' },
    { id: 1, status: 'Đã đủ hồ sơ' },
    { id: 2, status: 'Đã xin gửi thư mời' },
    { id: 3, status: 'Đã có thư mời' },
  ];
  useEffect(() => {
    getOfferLetterByID();
    // eslint-disable-next-line
  }, []);
  const getOfferLetterByID = async () => {
    const data = await getRequest(`/api/file/offer-letter/${file_id}`);
    formik.setFieldValue('school', data.data.school_name);
    formik.setFieldValue('country', data.data.country);
    formik.setFieldValue('status', data.data.status);
    setData(data.data);
  };
  const handleCancel = () => {
    navigate('/offer-letter-file');
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box component="form" onSubmit={formik.handleSubmit}>
          {data ? (
            <div>
              <div className="grid grid-cols-2 gap-[50px] mb-[30px]">
                <div className="flex items-center col-span-1">
                  <label className="mr-4">Tên khách hàng</label>
                  <TextField
                    variant="standard"
                    type="text"
                    name="customer_name"
                    value={data.customer_name}
                    size="small"
                  />
                </div>
                <div className="flex items-center col-span-1">
                  <label className="mr-4">Số điện thoại</label>
                  <TextField
                    variant="standard"
                    type="text"
                    name="customer_phone"
                    value={data.customer_phone}
                    size="small"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-[40px] mb-[30px]">
                <div className="flex items-center col-span-1">
                  <label className="mr-4" htmlFor="school">
                    Trường gửi hồ sơ
                  </label>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="school"
                    label="Enter school name"
                    placeholder="Enter school name"
                    value={formik.values.school}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.school && Boolean(formik.errors.school)
                    }
                    helperText={formik.touched.school && formik.errors.school}
                    size="small"
                  />
                </div>
                <div className="flex items-center col-span-1">
                  <label className="mr-4" htmlFor="country">
                    Quốc gia
                  </label>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="country"
                    label="Enter country"
                    placeholder="Enter country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.country && Boolean(formik.errors.country)
                    }
                    helperText={formik.touched.country && formik.errors.country}
                    size="small"
                  />
                </div>
                <div className="flex items-center col-span-1">
                  <label className="mr-4">Trạng thái hồ sơ</label>
                  <TextField
                    variant="outlined"
                    select
                    size="small"
                    value={formik.values.status}
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
              <div className="mt-[50px]">
                <UpdateImage
                  title="Bằng tốt nghiệp"
                  onImageUpload={handleCertificate}
                  labelName="certificate"
                  listImages={data.imagesList[0].images}
                />
                <UpdateImage
                  title="Bảng điểm"
                  onImageUpload={handleTranscript}
                  labelName="transcript"
                  listImages={data.imagesList[1].images}
                />
                <UpdateImage
                  title="Căn cước công dân"
                  onImageUpload={handleCCCD}
                  labelName="CCCD"
                  listImages={data.imagesList[2].images}
                />
                <UpdateImage
                  title="Chứng chỉ tiếng anh"
                  onImageUpload={handleEnglishCertificate}
                  labelName="EnglisdCertificate"
                  listImages={data.imagesList[3].images}
                />
                <UpdateImage
                  title="Thư động lực"
                  onImageUpload={handleMotivationLetter}
                  labelName="motivationLetter"
                  listImages={data.imagesList[4].images}
                />
              </div>
            </div>
          ) : (
            <div>Loading</div>
          )}
          <div className="border-t border-gray-700">
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

export default UpdateOfferLetterFile;

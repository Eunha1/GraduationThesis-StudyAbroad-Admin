import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';
import Content from '../../../components/Content';
import { useEffect, useState } from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { getRequest, postRequest } from '../../../services/Api';
import * as yup from 'yup';
import { useFormik } from 'formik';
import UpdateImage from '../../../components/UpdateImage';
import { extractPathNameFromURL } from '../../../utils/Convert';
import { toast } from 'react-toastify';
function UpdateVisaFile() {
  const { file_id } = useParams();
  const [data, setData] = useState();
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
  const title = 'Chỉnh sửa hồ sơ';
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
      src: `/visa/update-file/${file_id}`,
      title: 'Chỉnh sửa hồ sơ',
    },
  ];
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
  const navigate = useNavigate();
  const validationSchema = yup.object({
    status: yup.string('Choose status').required('Status is required'),
  });
  const formik = useFormik({
    initialValues: {
      status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('status', values.status);
      form.forEach((element) => {
        if (element.file) {
          formData.append('form', element.file);
        } else {
          formData.append('form', extractPathNameFromURL(element));
        }
      });
      CoE.forEach((element) => {
        if (element.file) {
          formData.append('CoE', element.file);
        } else {
          formData.append('CoE', extractPathNameFromURL(element));
        }
      });
      birthCertificate.forEach((element) => {
        if (element.file) {
          formData.append('birth_certificate', element.file);
        } else {
          formData.append('birth_certificate', extractPathNameFromURL(element));
        }
      });
      passport.forEach((element) => {
        if (element.file) {
          formData.append('passport', element.file);
        } else {
          formData.append('passport', extractPathNameFromURL(element));
        }
      });
      citizenIdentificationCard.forEach((element) => {
        if (element.file) {
          formData.append('citizen_identification_card', element.file);
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
      offerLetter.forEach((element) => {
        if (element.file) {
          formData.append('offer_letter', element.file);
        } else {
          formData.append('offer_letter', extractPathNameFromURL(element));
        }
      });
      permanentResidence.forEach((element) => {
        if (element.file) {
          formData.append('permanent_residence', element.file);
        } else {
          formData.append(
            'permanent_residence',
            extractPathNameFromURL(element),
          );
        }
      });
      financialRecords.forEach((element) => {
        if (element.file) {
          formData.append('financial_records', element.file);
        } else {
          formData.append('financial_records', extractPathNameFromURL(element));
        }
      });
      const data = await postRequest(
        `/api/file/update/visa-file/${file_id}`,
        formData,
      );
      if (data.status === 1) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
  });
  useEffect(() => {
    getVisaFile();
    // eslint-disable-next-line
  }, []);
  const getVisaFile = async () => {
    const data = await getRequest(`/api/file/visa-file/${file_id}`);
    formik.setFieldValue('status', data.data.status);
    setData(data.data);
  };
  const listStatus = [
    { id: 0, status: 'Chưa đủ hồ sơ' },
    { id: 1, status: 'Đã đủ hồ sơ' },
    { id: 2, status: 'Đã xin visa' },
    { id: 3, status: 'Đã có visa' },
  ];
  const handleCancel = () => {
    navigate('/visa-file');
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box component="form" onSubmit={formik.handleSubmit}>
          {data ? (
            <div>
              <div className="grid grid-cols-4 gap-[30px] mb-[30px]">
                <div className="flex flex-col col-span-1">
                  <label className="mb-2">Tên khách hàng</label>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="customer_name"
                    value={data.customer_name}
                    size="small"
                  />
                </div>
                <div className="flex flex-col col-span-1">
                  <label className="mb-2">Số điện thoại</label>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="customer_phone"
                    value={data.customer_phone}
                    size="small"
                  />
                </div>
                <div className="flex flex-col col-span-1">
                  <label className="mb-2">Quốc gia</label>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="country"
                    value={data.country}
                    size="small"
                  />
                </div>
                <div className="flex flex-col col-span-1">
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
                    error={
                      formik.touched.status && Boolean(formik.errors.status)
                    }
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
              <div className="mt-[50px]">
                <UpdateImage
                  title="Form khai"
                  onImageUpload={handleForm}
                  listImages={data.imagesList[0].images}
                />
                <UpdateImage
                  title="CoE"
                  onImageUpload={handleCoE}
                  listImages={data.imagesList[1].images}
                />
                <UpdateImage
                  title="Giấy khai sinh"
                  onImageUpload={handleBirthCertificate}
                  listImages={data.imagesList[2].images}
                />
                <UpdateImage
                  title="Hộ chiếu"
                  onImageUpload={handlePassport}
                  listImages={data.imagesList[3].images}
                />
                <UpdateImage
                  title="Căn cước công dân"
                  onImageUpload={handleCCCD}
                  listImages={data.imagesList[4].images}
                />
                <UpdateImage
                  title="Chứng chỉ tiếng anh"
                  onImageUpload={handleEnglishCertificate}
                  listImages={data.imagesList[5].images}
                />
                <UpdateImage
                  title="Thư mời"
                  onImageUpload={handleOfferLetter}
                  listImages={data.imagesList[6].images}
                />
                <UpdateImage
                  title="Hộ khẩu thường trú"
                  onImageUpload={handlePermanentResidence}
                  listImages={data.imagesList[7].images}
                />
                <UpdateImage
                  title="Hồ sơ tài chính"
                  onImageUpload={handleFinancialRecords}
                  listImages={data.imagesList[8].images}
                />
              </div>
            </div>
          ) : (
            <div>Loading</div>
          )}
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

export default UpdateVisaFile;

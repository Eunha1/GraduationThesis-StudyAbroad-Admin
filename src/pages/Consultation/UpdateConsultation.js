import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { useFormik } from 'formik';
import { Box, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../services/Api';
import { toast } from 'react-toastify';
function UpdateConsultation() {
  const { consultation_id } = useParams();
  const [info, setInfo] = useState();
  const title = 'Cập nhật thông tin tư vấn';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/consultation',
      title: 'Thông tin tư vấn',
    },
    {
      isCurrentPage: true,
      src: `/consultation/update/${consultation_id}`,
      title: 'Cập nhật thông tin',
    },
  ];
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      school_year: '',
      school: '',
      level: '',
      country: '',
      majors: '',
      finance: '',
      schoolarship: '',
      note: '',
      status: '',
    },
    onSubmit: async (values) => {
      const data = await postRequest(
        `/api/consultation/update-consultation/${consultation_id}`,
        values,
      );
      if (data.status === 1) {
        toast.success(data.message);
        navigate('/consultation');
      } else {
        toast.error(data.message);
      }
    },
  });
  const listStatus = [
    { id: 0, status: 'Không tiềm năng' },
    { id: 1, status: 'Tiềm năng' },
  ];
  const handleCancel = () => {
    navigate('/consultation');
  };
  useEffect(() => {
    getConsultationInfo();
    // eslint-disable-next-line
  }, []);
  const getConsultationInfo = async () => {
    const data = await getRequest(
      `/api/consultation/consultation-detail/${consultation_id}`,
    );
    formik.setFieldValue('school_year', data.data.school_year);
    formik.setFieldValue('school', data.data.school_name);
    formik.setFieldValue('level', data.data.level);
    formik.setFieldValue('country', data.data.country);
    formik.setFieldValue('majors', data.data.majors);
    formik.setFieldValue('note', data.data.note);
    formik.setFieldValue('schoolarship', data.data.schoolarship);
    formik.setFieldValue('finance', data.data.finance);
    formik.setFieldValue('status', data.data.status);
    setInfo(data.data);
  };

  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-3 gap-[50px] mb-8">
            <div className="cols-span-1 flex flex-col">
              <label htmlFor="customer_phone" className="mb-2">
                Số điện thoại
              </label>
              <TextField
                type="text"
                name="customer_phone"
                variant="outlined"
                label="Enter phone"
                placeholder="Enter customer phone"
                size="small"
                value={info?.customer_phone ? info?.customer_phone : ''}
              />
            </div>
            <div className="cols-span-1 flex flex-col">
              <label htmlFor="country" className="mb-3">
                Nước dự định học
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
              />
            </div>
            <div className="cols-span-1 flex flex-col">
              <label htmlFor="school" className="mb-3">
                Trường dự định đi học
              </label>
              <TextField
                type="text"
                name="school"
                variant="outlined"
                label="Enter school"
                placeholder="Enter school"
                size="small"
                value={formik.values.school}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[50px] mb-8">
            <div className="cols-span-1 flex flex-col">
              <label htmlFor="level" className="mb-2">
                Trình độ học vấn{' '}
              </label>
              <TextField
                type="text"
                name="level"
                variant="outlined"
                label="Enter level"
                placeholder="Enter level"
                size="small"
                value={formik.values.level}
                onChange={formik.handleChange}
              />
            </div>
            <div className="cols-span-1 flex flex-col">
              <label htmlFor="majors" className="mb-3">
                Ngành dự định theo học
              </label>
              <TextField
                type="text"
                name="majors"
                variant="outlined"
                label="Enter majors"
                placeholder="Enter majors"
                size="small"
                value={formik.values.majors}
                onChange={formik.handleChange}
              />
            </div>
            <div className="cols-span-1 flex flex-col">
              <label htmlFor="school_year" className="mb-3">
                Năm dự định đi học
              </label>
              <TextField
                type="text"
                name="school_year"
                variant="outlined"
                label="Enter school year"
                placeholder="Enter school year"
                size="small"
                value={formik.values.school_year}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[50px] mb-8">
            <div className="cols-span-1 flex flex-col">
              <label htmlFor="finance" className="mb-2">
                Khả năng tài chính{' '}
              </label>
              <TextField
                type="text"
                name="finance"
                variant="outlined"
                label="Enter finance"
                placeholder="Enter finance"
                size="small"
                value={formik.values.finance}
                onChange={formik.handleChange}
              />
            </div>
            <div className="cols-span-1 flex flex-col">
              <label htmlFor="schoolarship" className="mb-3">
                Yêu cầu về học bổng
              </label>
              <TextField
                type="text"
                name="schoolarship"
                variant="outlined"
                label="Enter schoolarship"
                placeholder="Enter schoolarship"
                size="small"
                value={formik.values.schoolarship}
                onChange={formik.handleChange}
              />
            </div>
            <div className="cols-span-1 flex flex-col">
              <label htmlFor="status" className="mb-3">
                Status
              </label>
              <TextField
                select
                fullWidth
                label="Choose status"
                placeholder="Choose status"
                size="small"
                defaultValue=""
                value={formik.values.status}
                onChange={(event) => {
                  if (event.target.value !== undefined) {
                    formik.setFieldValue('status', event.target.value);
                  }
                }}
              >
                {listStatus.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.status}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="note" className="mb-2">
              Ghi chú
            </label>
            <TextField
              type="text"
              name="note"
              multiline
              rows={3}
              label="Enter note"
              placeholder="Enter note"
              value={formik.values.note}
              onChange={formik.handleChange}
              fullWidth
            />
          </div>
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
        </Box>
      </Content>
    </div>
  );
}

export default UpdateConsultation;

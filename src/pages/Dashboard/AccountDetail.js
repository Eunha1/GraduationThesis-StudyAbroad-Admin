import { TextField, Box, MenuItem } from '@mui/material';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { ADMISSION_OFFICER, EDU_COUNSELLOR } from '../../utils/Constant';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../services/Api';
import { toast } from 'react-toastify';
function AccountDetail() {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const title = 'Thêm mới tài khoản';
  const listBreadcrumb = [
    {
      title: 'Trang chủ',
      src: '/',
    },
    {
      title: 'Tài khoản nhân viên',
      src: '/dashboard',
    },
    {
      isCurrentPage: true,
      title: 'Thêm mới tài khoản',
      src: '/new-account',
    },
  ];
  const listRole = [
    { id: 1, role: EDU_COUNSELLOR },
    { id: 2, role: ADMISSION_OFFICER },
  ];
  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = await postRequest('/api/staff/sign-up', values);
      if (data.status === 1) {
        toast.success(data.message);
        navigate('/dashboard');
      } else {
        toast.error(data.message);
      }
    },
  });
  const handleCancel = () => {
    navigate('/dashboard');
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb}></Breadcrumb>
      <Content>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <div className="w-[500px]">
            <div className="mb-7">
              <label className="font-medium text-gray-900 mb-4">Email</label>
              <TextField
                type="email"
                name="email"
                variant="outlined"
                placeholder="Enter your email"
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />
            </div>
            <div className="mb-7">
              <label className="font-medium text-gray-900 mb-4">Password</label>
              <TextField
                type={eye ? 'text' : 'password'}
                name="password"
                variant="outlined"
                placeholder="Enter your password"
                size="small"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setEye(!eye)}>
                        {eye ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <label className="font-medium text-gray-900">Role</label>
              <TextField
                select
                fullWidth
                placeholder="Choose role"
                size="small"
                value={formik.values.role}
                onChange={(event) =>
                  formik.setFieldValue('role', event.target.value)
                }
              >
                {listRole.map((option, index) => (
                  <MenuItem key={index} value={option.role}>
                    {option.role}
                  </MenuItem>
                ))}
              </TextField>
            </div>
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

export default AccountDetail;

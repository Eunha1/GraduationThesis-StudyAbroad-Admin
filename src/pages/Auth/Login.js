import { Link } from 'react-router-dom';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { postRequest } from '../../services/Api';
function Login() {
  const [eye, setEye] = useState(false);
  // validation schema of yup
  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .required('Password is required'),
  });
  // formik form validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = await postRequest('/api/auth/login', values);
      const access_token = data.token.accessToken;
      localStorage.setItem('access_token', access_token);
    },
  });

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <Box component="form" onSubmit={formik.handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <TextField
                    type="email"
                    name="email"
                    variant="outlined"
                    label="Enter email"
                    placeholder="Enter your email"
                    size="small"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block my-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <TextField
                    type={eye ? 'text' : 'password'}
                    name="password"
                    variant="outlined"
                    label="Enter password"
                    placeholder="Enter your password"
                    size="small"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
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
                <div className="flex items-center justify-between my-4">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Forgot password?
                  </Link>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Reset password
                  </Link>
                </div>
                <button
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="submit"
                >
                  Sign in
                </button>
              </Box>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;

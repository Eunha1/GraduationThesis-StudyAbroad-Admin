import {
  Box,
  Select,
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import Breadcrumb from '../../../components/Breadcrumb';
import Content from '../../../components/Content';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../../services/Api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function AddMenu() {
  const [listMenu, setListMenu] = useState();
  const [listCategory, setListCategory] = useState();
  const navigate = useNavigate();
  const title = 'Thêm menu';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/page-manager/menu',
      title: 'Danh sách menu',
    },
    {
      isCurrentPage: true,
      src: '/page-manager/add-menu',
      title: 'Thêm menu',
    },
  ];
  useEffect(() => {
    getListMenu();
    getListCategory();
  }, []);
  const getListMenu = async () => {
    const data = await getRequest('/api/menu/list-menu');
    setListMenu(data.data);
  };
  const getListCategory = async () => {
    const data = await getRequest('/api/list-category');
    setListCategory(data.data);
  };
  const validationSchema = yup.object({
    name: yup.string('Enter menu name').required('Name is required'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      menu_parent: '',
      category: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const body = {
        name: values.name,
        menu_parent: values.menu_parent ? values.menu_parent : null,
        category: values.category,
      };
      const data = await postRequest('/api/menu/create-menu', body);
      if (data.status === 1) {
        toast.success(data.message);
        navigate('/page-manager/menu');
      } else {
        toast.error(data.message);
      }
    },
  });
  const handleCancel = () => {
    navigate('/page-manager/menu');
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-3 my-[20px]">
            <label htmlFor="name" className="col-span-1">
              Tên menu
            </label>
            <TextField
              className="cols-span-1"
              type="text"
              name="name"
              variant="outlined"
              label="Enter menu name"
              placeholder="Enter menu name"
              size="small"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>
          <div className="grid grid-cols-3 my-[20px]">
            <label className="col-span-1">Menu Cha</label>
            <Select
              className="col-span-1"
              variant="outlined"
              placeholder="Choose menu parent"
              size="small"
              value={formik.values.menu_parent}
              onChange={(event) =>
                formik.setFieldValue('menu_parent', event.target.value)
              }
            >
              <MenuItem value="">None</MenuItem>
              {listMenu ? (
                listMenu.map((option, index) => (
                  <MenuItem key={index} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>
                  <CircularProgress />
                </MenuItem>
              )}
            </Select>
          </div>
          <div className="grid grid-cols-3 my-[20px]">
            <label className="col-span-1">Danh mục tương ứng</label>
            <Select
              className="col-span-1"
              variant="outlined"
              placeholder="Choose menu parent"
              size="small"
              value={formik.values.category}
              onChange={(event) =>
                formik.setFieldValue('category', event.target.value)
              }
            >
              {listCategory ? (
                listCategory.map((option, index) => (
                  <MenuItem key={index} value={option._id}>
                    {option.category}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>
                  <CircularProgress />
                </MenuItem>
              )}
            </Select>
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

export default AddMenu;
